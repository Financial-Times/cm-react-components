import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import useAutocomplete from '@material-ui/lab/useAutocomplete';
import { ListBox } from './ListBox';

const CustomAutocomplete = ({
  id,
  options,
  onChange,
  onComplete,
  inputProps
}) => {
  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value
  } = useAutocomplete({
    id,
    options,
    getOptionLabel: option => option.prefLabel
  });

  useEffect(() => {
    typeof onComplete === 'function' && onComplete(value);
  }, [JSON.stringify(value)]);

  let debounceTimeout = null;

  /**
   * Handles type changes in input, sends the event to the original handler
   * and if `onChange` callback is passed calls it (with debounce) with value = `event.target.value`.
   * This is for the cases where ListBox options should be filled on the fly
   */
  const onChangeInput = useCallback(event => {
    event.persist();
    getInputProps().onChange(event);

    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      typeof onChange === 'function' && onChange(event.target.value);
    }, 300);
  }, [onChange]);

  return options && Array.isArray(options) && options.every(option => option.prefLabel)
    ? (
      <div className="autocomplete-container" data-testid={id}>
        <div {...getRootProps()}>
          <input {...inputProps} {...getInputProps()} onChange={onChangeInput} />
        </div>
        <ListBox
          listOptions={groupedOptions}
          listProps={getListboxProps()}
          getOptionProps={getOptionProps}
        />
      </div>
    )
    : null;
};

CustomAutocomplete.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onComplete: PropTypes.func,
  onChange: PropTypes.func,
  inputProps: PropTypes.any,
  options: (props, propName) => {
    if (!props[propName] || !Array.isArray(props[propName])) {
      throw new Error(`${propName} should be an array but got ${typeof props[propName]}`);
    }
    if (props[propName].some(option => !option.prefLabel)) {
      throw new Error(`'prefLabel' is required in every item inside '${propName}' object`);
    }
  }
};

export default CustomAutocomplete;
