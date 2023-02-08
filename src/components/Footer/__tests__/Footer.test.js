import React from 'react';
import { cleanup, render } from '@testing-library/react';

import Footer from '../Footer';
import { LEGAL_PRIVACY_LINKS } from '../../../utils/constants';

describe('Footer component', () => {
  afterEach(cleanup);

  it('should render without params', () => {
    const { container } = render(<Footer/>);
    expect(container.firstChild).toHaveClass('o-footer-services');
  });
  it('should render and create links', () => {
    const { getByText } = render(<Footer legalPrivacyLinks={ LEGAL_PRIVACY_LINKS } />);
    expect(getByText(LEGAL_PRIVACY_LINKS[0].text).href).toBe(LEGAL_PRIVACY_LINKS[0].link);
    expect(getByText(LEGAL_PRIVACY_LINKS[1].text).href).toBe(LEGAL_PRIVACY_LINKS[1].link);
    expect(getByText(LEGAL_PRIVACY_LINKS[2].text).href).toBe(LEGAL_PRIVACY_LINKS[2].link);
    expect(getByText(LEGAL_PRIVACY_LINKS[3].text).href).toBe(LEGAL_PRIVACY_LINKS[3].link);
  });
  it('should render with corect year', () => {
    const { container } = render(<Footer legalPrivacyLinks={ LEGAL_PRIVACY_LINKS } />);
    const currentYear = new Date().getFullYear().toString();
    expect(container.firstChild).toHaveTextContent(currentYear);
  });
});
