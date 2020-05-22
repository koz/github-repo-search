import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Header from './index';
import { createMemoryHistory } from 'history/cjs/history.min';
import renderWithContext, { renderWithRouter } from '../../../spec/utils/renderWithContext';

const mockBack = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    goBack: mockBack,
  }),
}));

describe('<Header />', () => {
  test('should render correctly', () => {
    const { container } = renderWithRouter(<Header />);
    expect(container).toBeDefined();
  });

  test('should render link to home', () => {
    const { queryByTestId } = renderWithContext(<Header />);
    expect(queryByTestId('home-link')).toBeInTheDocument();
  });

  test('should render logo', () => {
    const { queryByTestId } = renderWithContext(<Header />);
    expect(queryByTestId('logo')).toBeInTheDocument();
  });

  test('should show back button when prop is set', () => {
    const { queryByTestId } = renderWithContext(<Header showBack />);
    expect(queryByTestId('back-button')).toBeInTheDocument();
  });

  test('should call history back in button click', () => {
    const { queryByTestId } = renderWithContext(<Header showBack />);
    fireEvent.click(queryByTestId('back-button'));
    expect(mockBack).toBeCalledTimes(1);
  });
});
