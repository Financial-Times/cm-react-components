import React from 'react';
import PropTypes from 'prop-types';

import { ClientNavigation } from './ClientNavigation';

export const SecondaryNavigation = ({
  name,
  id,
  menuData,
  clientMenuData,
  renderProp
}) => {
  let menuItems = menuData.map(item => (
      <li key={item.label}>
        {renderProp(item)}
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
          <ClientNavigation id={id} menuData={clientMenuData} renderProp={renderProp} />
        )}
      </div>
    </nav>
  );
};
SecondaryNavigation.propTypes = {
  name: PropTypes.string,
  menuData: PropTypes.arrayOf(PropTypes.object),
  renderProp: PropTypes.func.isRequired,
  id: ClientNavigation.propTypes.id,
  clientMenuData: ClientNavigation.propTypes.menuData
};
