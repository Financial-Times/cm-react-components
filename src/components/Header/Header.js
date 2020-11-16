import React from 'react';
import PropTypes from 'prop-types';

import { Navigation } from './Navigation';

const Header = ({
  title,
  clientName,
  clientId,
  primaryMenuData,
  clientMenuData
}) => (
  <div className="o-layout__header">
    <header className="o-header-services " data-o-component="o-header-services" data-testid="header-component">
      <div className="o-header-services__top">
        <div className="o-header-services__hamburger">
          <a className="o-header-services__hamburger-icon" href="/" role="button">
            <span className="o-header-services__visually-hidden">Open primary navigation</span>
          </a>
        </div>
        <a href="/">
          <div className="o-header-services__logo" />
        </a>
        <div className="o-header-services__title">
          <a className="o-header-services__product-name" href="/">{title}</a>
        </div>
      </div>
      <Navigation
        clientName={clientName}
        clientId={clientId}
        primaryMenuData={primaryMenuData}
        clientMenuData={clientMenuData}
      />
    </header>
  </div>
);

Header.propTypes = {
  title: PropTypes.string,
  clientName: PropTypes.string,
  clientId: PropTypes.string,
  primaryMenuData: Navigation.propTypes.primaryMenuData,
  clientMenuData: Navigation.propTypes.clientMenuData,
};

export default Header;
