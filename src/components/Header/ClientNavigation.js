import React from 'react';
import PropTypes from 'prop-types';

export const ClientNavigation = ({ id, menuData, renderProp }) => {
  const menuItems = menuData.map(item => (
    <li key={`${item.label}--${item.url}`}>
      {renderProp(item, id)}
    </li>
  ));

  return (
    <ul data-testid="client-nav"
        className="o-header-services__secondary-nav-list o-header-services__secondary-nav-list--children"
        aria-label="Child sections">
      {menuItems}
    </ul>
  );
};

ClientNavigation.propTypes = {
  id: PropTypes.string,
  menuData: PropTypes.arrayOf(PropTypes.object),
  renderProp: PropTypes.func.isRequired
};
