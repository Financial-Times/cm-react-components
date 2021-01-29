import React from 'react';
import PropTypes from 'prop-types';

const predefinedTypes = {
  'Person': 'P',
  'Topic': 'T',
  'Brand': 'B',
  'Genre': 'G',
  'Location': 'L',
  'Organisation': 'O'
};
export const ListBoxItem = ({
  option,
  optionProps
}) => {
  const { type, prefLabel } = option;

  let newType = '';
  if (option.type) {
    const splittedGenre = type.split('/');
    newType = splittedGenre[splittedGenre.length - 1];
  }

  const listBoxItemClasses = 'list-box-item';

  const typeLabel = option.type
    ? (
      <div className="type-label">{predefinedTypes[newType] || ''}</div>
    )
    : null;

  return (
    <li
      data-testid="listBoxItem"
      className={listBoxItemClasses}
      {...optionProps}
    >
      {typeLabel}
      <div>
        {prefLabel}
        {type && (
          <span className="type">&nbsp;/ {newType}</span>
        )}
      </div>
    </li>
  );
};

ListBoxItem.propTypes = {
  option: PropTypes.objectOf(PropTypes.any).isRequired,
  optionProps: PropTypes.objectOf(PropTypes.any).isRequired
};
