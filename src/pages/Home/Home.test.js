import React from 'react';
import renderWithContext from '../../../spec/utils/renderWithContext';
import redux from 'react-redux';
import * as selectors from '../../redux/selectors';
import Home from '.';

describe('<Home />', () => {
  test('should render correctly', () => {
    const { container } = renderWithContext(<Home />);
    expect(container).toBeDefined();
  });

  test('should render SearchForm', () => {
    const { getByTestId } = renderWithContext(<Home />);
    expect(getByTestId('search-form')).toBeDefined();
  });

  test("should render results if there's data", () => {
    jest.spyOn(selectors, 'useTotalCount').mockReturnValue(10000);
    const { queryByText, debug } = renderWithContext(<Home />);
    expect(queryByText('10,000', { exact: false })).toBeDefined();
  });

  test("should not render results if there's no data", () => {
    jest.spyOn(selectors, 'useTotalCount').mockReturnValue(null);
    const { queryByText, debug } = renderWithContext(<Home />);
    expect(queryByText('10,000', { exact: false })).toBe(null);
  });
});
