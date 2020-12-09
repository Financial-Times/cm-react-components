import React from 'react';
import PropTypes from 'prop-types';

export const MainNavigation = ({
  menuData,
  renderProp
}) => {
  const menuItems = menuData.map(item => (
      <li key={item.label}>
        {renderProp(item)}
      </li>
    )
  );

  return (
    <nav className="o-header-services__primary-nav" aria-label="primary">
      <ul className="o-header-services__primary-nav-list">
        {menuItems}
      </ul>
    </nav>
  )
};

MainNavigation.propTypes = {
  menuData: PropTypes.arrayOf(PropTypes.object),
  renderProp: PropTypes.func
};
