import React from 'react';
import PropTypes from 'prop-types';

const Layout = ({ children }) => (
  <div className="layout-container" data-o-component="o-layout" data-testid="layout-component">
    {children}
  </div>
);
Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])

};
Layout.Main = ({ children }) => (<div className="o-layout__main o-layout-typography">{children}</div>);
Layout.Main.displayName = 'Main';
Layout.Main.propTypes = {
  children: PropTypes.object
};

export default Layout;
