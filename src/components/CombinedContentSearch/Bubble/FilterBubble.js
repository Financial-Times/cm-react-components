import React from 'react';
import PropTypes from 'prop-types';

import Bubble from './Bubble';
import SelectBox from '../../Forms/SelectBox';
import TextInput from '../../Forms/TextInput';
import CustomAutocomplete from '../../CustomAutocomplete/CustomAutocomplete';
import { FILTER_EXPRESSION_TYPES, KEY_CODE_SPACE } from '../../../utils/constants';
import { useInput } from '../../../utils/hooks/useInput';

const FilterBubble = ({
  value,
  onChange,
  initialInputValue,
  dropdownOptions,
  autocompleteId,
  autocompleteOptions,
  autocompleteFinish,
  autocompleteChange,
  children,
  textInputProps,
  customAutocompleteInputProps
}) => {

  const handleInputBlur = event => {
    autocompleteFinish(event.target.value);
  };

  /**
   * Doesn't allow to have spaces in the input value
   * @param {Object} event
   * @returns {boolean}
   */
  const handleKeyDown = event => event.which !== KEY_CODE_SPACE;

  /**
   * Prevents having spaces in the input value when the text is copy-pasted
   * @param {Object} event
   */
  const handleInputChange = event => {
    event.target.value = event.target.value.replace(/\s/g, '');
    inputChange(event);
  };

  const {
    value: inputValue,
    onChange: inputChange
  } = useInput(initialInputValue);

  const inputTemplate = value === FILTER_EXPRESSION_TYPES.keyword
    ? (
      <TextInput
        className="input-container"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        customInputProps={textInputProps}
      />
    )
    : (
      <CustomAutocomplete
        id={autocompleteId}
        options={autocompleteOptions}
        onComplete={autocompleteFinish}
        onChange={autocompleteChange}
        inputProps={customAutocompleteInputProps}
      />
    );

  return (
    <Bubble
      primary
      filter
    >
      <div className="container filter-bubble" data-testid="filterBubble">
        {children}
        <SelectBox
          placeholderOptions={{
            name: 'Choose type',
            value: 'type'
          }}
          primary
          selectedValue={value || 'type'}
          options={dropdownOptions}
          onChange={onChange}
        />
        {inputTemplate}
      </div>
    </Bubble>
  );
};

FilterBubble.propTypes = {
  value: SelectBox.propTypes.selectedValue,
  onChange: SelectBox.propTypes.onChange,
  initialInputValue: PropTypes.string,
  dropdownOptions: SelectBox.propTypes.options,
  autocompleteId: CustomAutocomplete.propTypes.id,
  autocompleteOptions: CustomAutocomplete.propTypes.options,
  autocompleteFinish: CustomAutocomplete.propTypes.onComplete,
  autocompleteChange: CustomAutocomplete.propTypes.onChange,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  textInputProps: PropTypes.any,
  customAutocompleteInputProps: CustomAutocomplete.propTypes.inputProps
};

export default FilterBubble;
