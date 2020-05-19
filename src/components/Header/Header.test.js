import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';

import Header from './index';
import { createMemoryHistory } from 'history/cjs/history.min';
import renderWithContext, { renderWithRouter } from '../../../spec/utils/renderWithContext';

describe('<Header />', () => {
  test('should render correctly', () => {
    const { container } = renderWithRouter(<Header />);
    expect(container).toBeDefined();
  });

  test('should render link to home', () => {
    const { queryByTestId } = renderWithContext(<Header />);
    expect(queryByTestId('home-link')).toBeDefined();
  });

  test('should render logo', () => {
    const { queryByTestId } = renderWithContext(<Header />);
    expect(queryByTestId('logo')).toBeDefined();
  });
});
