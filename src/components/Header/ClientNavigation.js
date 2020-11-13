import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export const ClientNavigation = ({ clientId, menuData }) => {
  const menuItems = menuData.map(item => (
    <li key={`${item.label}--${item.url}`}>
      <NavLink aria-current="true" to={`${item.url}/${clientId}`}>{item.label}</NavLink>
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
  clientId: PropTypes.string.isRequired,
  menuData: PropTypes.arrayOf(PropTypes.object)
};
