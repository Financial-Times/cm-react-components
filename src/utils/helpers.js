import {
  FILTER_EXPRESSION_TYPES,
  SELECT_OPTIONS_ALL,
  SELECT_OPTIONS_KEYWORD,
  SELECT_OPTIONS_RELATED_ENTITY
} from './constants';

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

