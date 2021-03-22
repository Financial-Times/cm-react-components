import {
  API_ENDPOINTS,
  DEFAULT_OFFSET_TIME_FILTER,
  FILTER_EXPRESSION_TYPES,
  KEYS_FOR_SANITIZING,
  SELECT_OPTIONS_ALL,
  SELECT_OPTIONS_KEYWORD,
  SELECT_OPTIONS_RELATED_ENTITY,
  TOO_MANY_ARTICLES_NUMBER
} from './constants';
import request from './request';

// Objects helpers
/**
 * Creates deep copy of an object
 * @param {Object} inputObject
 * @returns {Object} deep copy of inputObject
 */
export const deepCopy = inputObject => {
  if (typeof inputObject !== 'object' || inputObject === null) {
    // Return the value if inputObject is not an object
    return inputObject;
  }

  const outputObject = Array.isArray(inputObject) ? [] : {};
  let value;

  Object.keys(inputObject).forEach(key => {
    value = inputObject[key];

    // Recursively (deep) copy for nested objects, including arrays
    outputObject[key] = (typeof value === 'object' && value !== null) ? deepCopy(value) : value;
  });

  return outputObject;
};

export const getNestedValueFromObject = (object, key) => key.split('.').reduce((result, key) => result[key], object);

/**
 * Receives an array and a prop and returns the array sorted by this prop
 * @param {Array} array
 * @param {String} prop
 * @returns {Array}
 */
export const sortArrayOfObjects = (array, prop) => {
  const compare = (first, second) => {
    let cmp = 0;

    if (first[prop] < second[prop]) {
      cmp = 1;
    }
    if (first[prop] > second[prop]) {
      cmp = -1;
    }

    return cmp;
  };

  return array.sort(compare);
};

// Date helpers
const monthsNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

/**
 * Adds leading zero if given number is 1-digit
 * @param number
 * @returns {string}
 */
const pad = number => (number < 10 ? `0${number}` : number);

/**
 * Converts date from format `2013-07-21T18:04:41.000Z` or timestamp
 * to `July 21 2013` or based on param `withHour` - `July 21 2013, 18:04:41`
 * @param {String} dateToFormat
 * @param {Boolean} withHour
 * @returns {string}
 */
export const dateToMonthDDYYYY = (dateToFormat, withHour = false) => {
  const date = new Date(dateToFormat);
  const month = monthsNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return withHour
    ? `${month} ${pad(day)} ${year}, ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
    : `${month} ${pad(day)} ${year}`;
};


// Query helpers
/**
 * Gets maxId recursively in query
 * @param {Object} query
 * @param {Number} initialValue
 * @returns {number}
 */
export const getMaxIdInQuery = (query, initialValue) => {
  let max = Math.max(query.id, initialValue);

  query.operands.forEach(operand => {
    if (operand.id > max) {
      max = operand.id;
    }

    if (operand.type === FILTER_EXPRESSION_TYPES.expression) {
      max = getMaxIdInQuery(operand, max);
    }
  });

  return max;
};

/**
 * By given query checks if it is valid (every operand has `type` and `value`)
 * @param {Object} query
 * @param {Boolean} initialIsValid
 * @returns {boolean}
 */
export const isValidQuery = (query, initialIsValid = true) => {
  if (!query || !query.operands || query.operands.length < 1) {
    return false;
  }

  let isValid = initialIsValid;

  query.operands.forEach(operand => {
    if (!(operand.type && operand.value) && operand.type !== FILTER_EXPRESSION_TYPES.expression) {
      isValid = false;
    } else if (operand.type === FILTER_EXPRESSION_TYPES.expression) {
      isValid = isValidQuery(operand, isValid);
    }
  });

  return isValid;
};

/**
 * Prepares the body for the `search` request:
 * 1. Adds `time-delta-filter` and `syndication-filter` to query operands on root level
 * 2. Adds `version` property to the root level of the returned object
 * @param {Object} query
 * @param {Object} version
 * @param {Object} timePeriod
 * @param {Object} syndicationFilter
 * @returns {{query: Object, version: Object}} The valid object for search request
 */
export const prepareQueryForSearch = (query, version, timePeriod, syndicationFilter) => {
  const timeDeltaFilter = timePeriod.offset
    ? {
      type: FILTER_EXPRESSION_TYPES.timeDelta,
      value: timePeriod.value,
      offset: DEFAULT_OFFSET_TIME_FILTER.toString()
    }
    : {
      type: FILTER_EXPRESSION_TYPES.timeDelta,
      value: timePeriod.value
    };

  const timeDeltaFilterIndex = query.operands.findIndex(operand => operand.type === FILTER_EXPRESSION_TYPES.timeDelta);
  const syndicationFilterIndex = query.operands.findIndex(operand => operand.type === FILTER_EXPRESSION_TYPES.syndication);

  timeDeltaFilterIndex === -1 && query.operands.push(timeDeltaFilter);
  syndicationFilterIndex === -1 && query.operands.push(syndicationFilter);

  return {
    ...version,
    query
  };
};

/**
 * Prepares query for edit mode:
 * 1. Removes `time-delta-filter` and `syndication-filter`
 * @param {Object} expression
 * @param {Number} currentId
 * @param {Object} concepts
 * @returns {{maxId: {Number}, expression: {Object}}}
 */
export const prepareQueryForEdit = (expression, currentId, concepts) => {
  let maxId = currentId;
  expression.id = maxId;

  const timeDeltaFilterIndex = expression.operands
    && expression.operands.findIndex(operand => operand.type === FILTER_EXPRESSION_TYPES.timeDelta);

  if (timeDeltaFilterIndex > -1) {
    expression.operands.splice(timeDeltaFilterIndex, 1);
  }

  const syndicationFilterIndex = expression.operands
    && expression.operands.findIndex(operand => operand.type === FILTER_EXPRESSION_TYPES.syndication);

  if (syndicationFilterIndex > -1) {
    expression.operands.splice(syndicationFilterIndex, 1);
  }

  if (expression.type === FILTER_EXPRESSION_TYPES.expression) {
    expression.operands.forEach(operand => {
      maxId += 1;
      const newOperand = prepareQueryForEdit(operand, maxId, concepts).expression;
      if (newOperand.type === FILTER_EXPRESSION_TYPES.relatedEntity) {
        newOperand.prefLabel = concepts[newOperand.value].prefLabel;
      }
      // eslint-disable-next-line no-param-reassign
      operand = newOperand;
    });
  }

  return {
    expression,
    maxId
  };
};

/**
 * By given query collects all values of `related-entity-filters` and pushes them to an array
 * which is later used for getting the `prefLabels` of the filters
 * @param {Object} query
 * @param {Array} currentIds
 * @returns {*[]}
 */
export const getConceptsIds = (query, currentIds) => {
  let arrayOfIds = [].concat(currentIds);

  query.operands.forEach(operand => {
    if (operand.type === FILTER_EXPRESSION_TYPES.relatedEntity) {
      arrayOfIds.push(operand.value);
    } else if (operand.type === FILTER_EXPRESSION_TYPES.expression) {
      arrayOfIds = getConceptsIds(operand, arrayOfIds);
    }
  });

  return arrayOfIds;
};

/**
 * By given array of values, constructs correct URL and sends a request for `prefLabels`
 * @param {Array} conceptsIds
 * @returns {Object}
 */
export const getPrefLabelsByIds = async conceptsIds => {
  let endpoint = API_ENDPOINTS.internalConcordances;
  conceptsIds.forEach(id => {
    endpoint += `ids=${id}&`;
  });

  return await request(endpoint);
};

/**
 * From given `period` calculates the startingDate and endDate timestamps
 * @param {String} period
 * @param {String} offset
 * @returns {{inHours: *, from: *, to: *}}
 */
export const getFeedPeriod = (period, offset) => {
  const offsetInMilliSeconds = +offset * 1000 * 60 * 60;
  const periodInMilliseconds = period * 1000 * 60 * 60;
  const endDateTimestamp = new Date().getTime() - offsetInMilliSeconds;
  const startDateTimestamp = endDateTimestamp - periodInMilliseconds;

  return {
    inHours: period,
    from: startDateTimestamp,
    to: endDateTimestamp
  };
};

/**
 * Sanitizes a query - removes all not needed properties in it
 * @param {Object} query
 * @returns {Object} sanitized query
 */
export const sanitizeQuery = query => {
  Object.keys(query).forEach(key => {
    if (KEYS_FOR_SANITIZING.indexOf(key) > -1) {
      delete query[key];
    }
  });

  if (query.type === FILTER_EXPRESSION_TYPES.expression) {
    query.operands.forEach(operand => {
      const newOperand = sanitizeQuery(operand);
      // eslint-disable-next-line no-param-reassign
      operand = newOperand;
    });
  }

  return query;
};

/**
 * Receives an array of filters and the id of the current filter,
 * returns the available options for the filter based on the other filters:
 * 1. If there is another `keyword` filter - then available option is only `keyword`
 * 2. If there is another `related-entity` filter - then available options are all but `keyword` filter
 * 3. If there are no other filters - all options are available
 * @param filters
 * @param currentId
 * @returns {Array} dropDownOptions
 */
export const getDropdownOptions = (filters, currentId) => {
  let dropDownOptions = [];
  const keywordFilterIndex = filters.findIndex(filter => filter.type === FILTER_EXPRESSION_TYPES.keyword
    && filter.id !== currentId
  );
  const relatedFilterIndex = filters.findIndex(filter => filter.type === FILTER_EXPRESSION_TYPES.relatedEntity
    && filter.id !== currentId
  );

  if (keywordFilterIndex > -1) {
    dropDownOptions.push(SELECT_OPTIONS_KEYWORD);
  } else if (relatedFilterIndex > -1) {
    dropDownOptions = deepCopy(SELECT_OPTIONS_RELATED_ENTITY);
  } else {
    dropDownOptions = deepCopy(SELECT_OPTIONS_ALL);
  }

  return dropDownOptions;
};

// Other
/**
 * Generates subtitle text by case with given articles count and is the building started
 * @param {Number} articlesCount
 * @param {Boolean} isBuildingStarted
 * @returns {string} The subtitle text
 */
export const getSubtitleTextForQB = (articlesCount, isBuildingStarted) => {
  let subTitleText = '';

  if (articlesCount > TOO_MANY_ARTICLES_NUMBER) {
    subTitleText = `More than ${TOO_MANY_ARTICLES_NUMBER} articles match. For better results, please refine your search.`;
  } else if (articlesCount > 0) {
    subTitleText = `${articlesCount} articles match your query. Good job!`;
  } else if (isBuildingStarted) {
    subTitleText = 'No articles match your query. For better results, please refine your search.';
  } else {
    subTitleText = 'Create complex filter expression to build the perfect query';
  }

  return subTitleText;
};
