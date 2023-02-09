import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Layout from '../Layout';
import { BrowserRouter } from 'react-router-dom';

const mockLayoutId = 'layout-component';

describe('Layout component tests', () => {
  afterEach(cleanup);
  it('Layout component should render', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Layout>
        </Layout>
      </BrowserRouter>);
    expect(getByTestId(mockLayoutId)).toBeInTheDocument();
  });
  it('Layout component should render child element', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Layout>
          <div>Test child element</div>
        </Layout>
      </BrowserRouter>);
    expect(getByTestId(mockLayoutId).firstChild).toBeInTheDocument();
  });
});
