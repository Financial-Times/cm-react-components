import { useState } from 'react';
import { deepCopy } from '../helpers';
import {
  API_ENDPOINTS,
  FILTER_EXPRESSION_TYPES,
  FILTERS_ONCHANGE_REQUEST,
  TYPES_FOR_SIMILAR_CONCEPTS
} from '../constants';
import request from '../request';

const getConcepts = async (type, search) => {
  let conceptTypeURL = API_ENDPOINTS.concepts.types[type] || API_ENDPOINTS.concepts.types.rest;
  if (search) {
    conceptTypeURL += search;
  }

  return await request(`${API_ENDPOINTS.concepts.main}${conceptTypeURL}`);
};

const getNarrowerConcepts = async conceptId => {
  const url = `${API_ENDPOINTS.concepts.main}/${conceptId}?${API_ENDPOINTS.concepts.narrower}&${API_ENDPOINTS.concepts.related}`;

  return await request(url);
};

export const useExpression = (initialExpression, onChangeCallback, currentId, increaseId) => {
  const [expression, setExpression] = useState(initialExpression);

  /**
   * Change the `logic` prop of an expression - `and` / `or`
   * and calls parent's callback to update the expression tree
   * @param {Object} event
   */
  const changeType = event => {
    const newExpression = deepCopy(expression);
    newExpression.logic = event.target.value;
    setExpression(newExpression);
    onChangeCallback(newExpression);
  };

  /**
   * Change the filters inside an expression
   * and calls parent's callback to update the expression tree
   * @param {Object} newFilter
   */
  const changeFilters = newFilter => {
    const newExpression = deepCopy(expression);

    const filterIndex = newExpression.operands.findIndex(operand => operand.id === newFilter.id);

    // If `newFilter.actionType` equals `insert` then we create new expression and insert newFilter in it
    // newFilter place is taken by the new expression
    if (newFilter.actionType === 'insert') {
      delete newFilter.actionType;
      newFilter.id = currentId;
      increaseId();

      newExpression.operands[filterIndex] = {
        logic: 'and',
        type: 'expression',
        operands: [newFilter]
      };
    } else if (filterIndex > -1) {
      // If `newFilter` has a type, we replace the filter with the new one
      // otherwise this is `delete` operation and splice the array of operands
      if (newFilter.type) {
        newExpression.operands[filterIndex] = newFilter;
      } else {
        newExpression.operands.splice(filterIndex, 1);
      }
    } else {
      // Adding a new filter line inside an expression
      // and calling method for increasing `currentId`
      newFilter.id = currentId;
      newExpression.operands.push(newFilter);
      increaseId();
    }

    onChangeCallback(newExpression);
    setExpression(newExpression);
  };

  /**
   * Inserts an expression inside another expression or actually
   * calls the parent's callback with the expression itself and with `actionType: insert` (which is later deleted)
   * so it could be inserted
   */
  const insertExpression = () => {
    onChangeCallback({
      ...expression,
      actionType: 'insert'
    });
  };

  /**
   * Deletes the expression or actually
   * calls the parent's callback with the `id` of the expression so it could be deleted
   * @param {Number || String} id
   */
  const deleteExpression = id => {
    onChangeCallback({ id });
  };

  /**
   * Toggles `editMode` of a filters or actually
   * calls the parent's callback with the `newFilter` which has `editMode: true` prop
   * @param {Object} newFilter
   */
  const toggleFilterEditMode = newFilter => {
    if (FILTERS_ONCHANGE_REQUEST.indexOf(newFilter.relationship) > -1) {
      newFilter.options = [];
    }

    onChangeCallback(newFilter);
  };

  /**
   * Changes conceptType (value in dropdown) by given event of the `input[type=select]`,
   * based on the type of the filter the value is set to different props (type/relationship) of the expression
   * @param event
   */
  const changeConceptType = async event => {
    const newExpression = deepCopy(expression);
    const newValue = event.target.value;

    if (newValue === FILTER_EXPRESSION_TYPES.keyword) {
      newExpression.type = newValue;
      newExpression.relationship && delete newExpression.relationship;
    } else {
      newExpression.type = FILTER_EXPRESSION_TYPES.relatedEntity;
      newExpression.relationship = newValue;

      let concepts = [];
      if (FILTERS_ONCHANGE_REQUEST.indexOf(newValue) < 0) {
        try {
          const response = await getConcepts(newValue);
          concepts = response.concepts;
        } catch (error) {
          console.error(error);
        }
      }

      newExpression.options = concepts;
    }
    newExpression.value = '';
    newExpression.editMode = true;

    setExpression(newExpression);
    onChangeCallback(newExpression);
  };

  const requestConcepts = async newValue => {
    const newExpression = deepCopy(expression);
    let concepts = [];
    if (newValue !== '') {
      try {
        const response = await getConcepts(newExpression.relationship, newValue);
        concepts = newExpression.relationship === FILTER_EXPRESSION_TYPES.author
          ? response.concepts.filter(person => person.isFTAuthor)
          : response.concepts;
      } catch (error) {
        console.error(error);
      }
    }
    newExpression.options = concepts;
    newExpression.editMode = true;

    setExpression(newExpression);
    onChangeCallback(newExpression);
  };

  /**
   * Changes the concept value (value in autocomplete) by given new value
   * changes the editMode to `false`
   * and calls the parent's callback to update the expression tree
   * @param {String || Object} newValue
   */
  const changeConcept = async newValue => {
    if (expression.type === '') {
      return;
    }

    const newExpression = deepCopy(expression);
    let realValue = '';
    let editMode = false;

    if (expression.type === FILTER_EXPRESSION_TYPES.relatedEntity) {
      let prefLabel = '';
      let id = '';
      if (newValue) {
        prefLabel = newValue.prefLabel;
        id = newValue.id;

        const splittedId = id.split('/');
        realValue = splittedId[splittedId.length - 1];
        newExpression.prefLabel = prefLabel;

        let shouldGetSimilarConcepts = false;

        const splittedType = newValue.type.split('/');
        const type = splittedType[splittedType.length - 1];

        if (TYPES_FOR_SIMILAR_CONCEPTS.indexOf(type) > -1) {
          shouldGetSimilarConcepts = true;
        }

        let narrowerConcepts = [];
        let relatedConcepts = [];
        if (shouldGetSimilarConcepts) {
          try {
            const response = await getNarrowerConcepts(realValue);
            if (response.narrowerConcepts) {
              narrowerConcepts = response.narrowerConcepts;
            }
            if (response.relatedConcepts) {
              relatedConcepts = response.relatedConcepts;
            }

          } catch (error) {
            console.error(error);
          }
        }

        newExpression.narrowerConcepts = narrowerConcepts;
        newExpression.relatedConcepts = relatedConcepts;
      } else {
        editMode = true;
      }
    } else {
      if (!newValue) {
        editMode = true;
      }
      realValue = newValue;
    }

    newExpression.value = realValue;
    newExpression.editMode = editMode;
    setExpression(newExpression);
    onChangeCallback(newExpression);
  };

  return {
    expression,
    changeExpression: setExpression,
    changeType,
    changeFilters,
    insertExpression,
    deleteExpression,
    toggleFilterEditMode,
    changeConceptType,
    changeConcept,
    requestConcepts
  };
};
