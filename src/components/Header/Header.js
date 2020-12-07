import React from 'react';
import PropTypes from 'prop-types';

import { SecondaryNavigation } from './SecondaryNavigation';
import MainNavigation from './MainNavigation';

const Header = ({
  title,
  name,
  id,
  mainMenuData,
  secondaryMenuData,
  clientMenuData,
  renderProp
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
      <MainNavigation
        menuData={mainMenuData}
        renderProp={renderProp}
      />
      {secondaryMenuData && secondaryMenuData.length > 0 && (
        <SecondaryNavigation
          name={name}
          id={id}
          menuData={secondaryMenuData}
          clientMenuData={clientMenuData}
          renderProp={renderProp}
        />
      )}
    </header>
  </div>
);

Header.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  mainMenuData: MainNavigation.propTypes.menuData,
  secondaryMenuData: SecondaryNavigation.propTypes.menuData,
  clientMenuData: SecondaryNavigation.propTypes.clientMenuData,
  renderProp: SecondaryNavigation.propTypes.renderProp
};

export default Header;
