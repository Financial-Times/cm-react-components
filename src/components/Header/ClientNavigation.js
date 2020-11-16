import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Link } from 'gatsby';

export const ClientNavigation = ({ clientId, menuData, isGatsby }) => {
  const menuItems = menuData.map(item => (
    <li key={`${item.label}--${item.url}`}>
      {
        isGatsby
          ? <Link to={`${item.url}/${clientId}`}>{item.label}</Link>
          : <NavLink to={`${item.url}/${clientId}`}>{item.label}</NavLink>
      }
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
  clientId: PropTypes.string,
  menuData: PropTypes.arrayOf(PropTypes.object),
  isGatsby: PropTypes.bool
};
