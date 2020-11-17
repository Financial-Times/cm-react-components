import React from 'react';
import PropTypes from 'prop-types';

import { ClientNavigation } from './ClientNavigation';

export const Navigation = ({
  name,
  id,
  primaryMenuData,
  secondaryMenuData,
  renderProp
}) => {
  let menuItems = primaryMenuData.map(item => (
      <li key={item.label}>
        {renderProp(item.url, item.label)}
      </li>
    )
  );

  if (id && name) {
    menuItems.push(
      <li key={`${name}--${id}`}>
        <p
          className="like-nav-item"
        >
          {name}
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
        {name && id && (
          <ClientNavigation id={id} menuData={secondaryMenuData} renderProp={renderProp} />
        )}
      </div>
    </nav>
  );
};
Navigation.propTypes = {
  name: PropTypes.string,
  primaryMenuData: PropTypes.arrayOf(PropTypes.object),
  renderProp: PropTypes.func.isRequired,
  id: ClientNavigation.propTypes.id,
  secondaryMenuData: ClientNavigation.propTypes.menuData
};
