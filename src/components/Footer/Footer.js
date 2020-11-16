import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({ links }) => {
  const renderLinks = () => links.map((link, idx) => (
      <a
        key={idx}
        target="_blank"
        rel="noreferrer noopener"
        href={link.link}
      >
        {link.text}
      </a>
    )
  );

  return (

    <footer className="o-footer-services">
      <div className="o-footer-services__container">
        <div className="o-footer-services__wrapper o-footer-services__wrapper--legal">
          <div className="o-footer-services__links">
            {
              links && links.length > 0 && renderLinks()
            }
          </div>
          <p>
            <span>
              &#xA9; THE FINANCIAL TIMES LTD {new Date().getFullYear()}.
            </span>
            FT and &apos;Financial Times&apos; are trademarks of The Financial Times Ltd.
          </p>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  legalPrivacyLinks: PropTypes.array
};

export default Footer;
