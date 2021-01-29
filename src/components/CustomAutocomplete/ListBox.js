import React from 'react';
import PropTypes from 'prop-types';

import { ListBoxItem } from './ListBoxItem';

export const ListBox = ({
  listOptions,
  listProps,
  getOptionProps
}) => {
  const listBoxClasses = 'list-box o-layout__unstyled-element';

  return (
    <>
      {listOptions.length > 0 && (
        <ul className={listBoxClasses} {...listProps} data-testid="listBox">
          {
            listOptions.map((option, index) => (
                <ListBoxItem
                  key={`${option.prefLabel}-${index}`}
                  option={option}
                  optionProps={getOptionProps({
                    option,
                    index
                  })}
                />
              ))
          }
        </ul>
      )}
    </>
  );
};

ListBox.propTypes = {
  listOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  listProps: PropTypes.objectOf(PropTypes.any).isRequired,
  getOptionProps: PropTypes.func.isRequired
};
