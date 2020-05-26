import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Header from './index';
import { createMemoryHistory } from 'history/cjs/history.min';
import renderWithContext, { renderWithRouter } from '../../../spec/utils/renderWithContext';
import * as hook from '../../hooks/useBackButton';

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

  test('should show back button when useBackButton state is true', () => {
    jest.spyOn(hook, 'default').mockReturnValue({ state: true });
    const { queryByTestId } = renderWithContext(<Header />);
    expect(queryByTestId('back-button')).toBeInTheDocument();
  });

  test('should call useBackButton callback in button click', () => {
    const callback = jest.fn();
    jest.spyOn(hook, 'default').mockReturnValue({ state: true, handleClick: callback });
    const { queryByTestId } = renderWithContext(<Header />);
    fireEvent.click(queryByTestId('back-button'));
    expect(callback).toBeCalledTimes(1);
  });
});
