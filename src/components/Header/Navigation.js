import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Link } from 'gatsby';

import { ClientNavigation } from './ClientNavigation';

export const Navigation = ({
  clientName,
  clientId,
  primaryMenuData,
  clientMenuData,
  isGatsby
}) => {
  let menuItems = primaryMenuData.map(item => (
      <li key={item.label}>
        {
          isGatsby
            ? (
              <Link
                to={item.url}
              >
                {item.label}
              </Link>
            )
            : (
              <NavLink
                to={item.url}
              >
                {item.label}
              </NavLink>
            )
        }
      </li>
    )
  );

  if (clientId && clientName) {
    menuItems.push(
      <li key={`${clientName}--${clientId}`}>
        <p
          className="like-nav-item"
        >
          {clientName}
        </p>
      </li>
    );
  }

  return (
    <nav className="o-header-services__secondary-nav" data-testid="secondary-nav-container" aria-label="secondary">
      <div className="o-header-services__secondary-nav-content">
        <ol className="o-header-services__secondary-nav-list o-header-services__secondary-nav-list--ancestors"
            aria-label="Ancestor sections" data-testid="secondary-nav">
          {menuItems}
        </ol>
        {clientName && clientId && (
          <ClientNavigation clientId={clientId} menuData={clientMenuData} isGatsby={isGatsby} />
        )}
      </div>
    </nav>
  );
};
Navigation.propTypes = {
  clientName: PropTypes.string,
  primaryMenuData: PropTypes.arrayOf(PropTypes.object),
  isGatsby: PropTypes.bool,
  clientId: ClientNavigation.propTypes.clientId,
  clientMenuData: ClientNavigation.propTypes.menuData
};
