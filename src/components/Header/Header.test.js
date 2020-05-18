import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';

import Header from './index';
import { createMemoryHistory } from 'history/cjs/history.min';

describe('<Header />', () => {
  test('should render correctly', () => {
    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <Header />
      </Router>
    );
    expect(container).toBeDefined();
  });

  test('should render link to home', () => {
    const history = createMemoryHistory();
    const { queryByTestId } = render(
      <Router history={history}>
        <Header />
      </Router>
    );
    expect(queryByTestId('home-link')).toBeDefined();
  });

  test('should render logo', () => {
    const history = createMemoryHistory();
    const { queryByTestId } = render(
      <Router history={history}>
        <Header />
      </Router>
    );
    expect(queryByTestId('logo')).toBeDefined();
  });
});
