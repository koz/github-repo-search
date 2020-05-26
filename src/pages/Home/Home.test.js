import React from 'react';
import renderWithContext from '../../../spec/utils/renderWithContext';
import * as selectors from '../../redux/selectors';
import Home from '.';

const mockData = {
  id: 1,
  name: '',
  description: '',
  language: '',
  updatedAt: '',
  license: '',
  fullName: 'full/name',
  stars: 0,
};

const mockMap = new Map([[1, mockData]]);

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
    const { queryByText } = renderWithContext(<Home />);
    expect(queryByText('10,000', { exact: false })).toBeDefined();
  });

  test("should not render results if there's no data", () => {
    jest.spyOn(selectors, 'useTotalCount').mockReturnValue(null);
    const { queryByText } = renderWithContext(<Home />);
    expect(queryByText('10,000', { exact: false })).toBe(null);
  });

  test("should render results label in singular if there's only 1 result", () => {
    jest.spyOn(selectors, 'useTotalCount').mockReturnValue(1);
    const { queryByText } = renderWithContext(<Home />);
    expect(queryByText('result')).toBeDefined();
  });

  test("should render results label in plural if there's more than 1 result", () => {
    jest.spyOn(selectors, 'useTotalCount').mockReturnValue(2);
    const { queryByText } = renderWithContext(<Home />);
    expect(queryByText('results')).toBeDefined();
  });

  test("should render list if there's repositories", () => {
    jest.spyOn(selectors, 'useRepositories').mockReturnValue(mockMap);
    const { queryByTestId } = renderWithContext(<Home />);
    expect(queryByTestId('repositories-list')).toBeDefined();
    expect(queryByTestId('repositories-list-item')).toBeDefined();
  });

  test('should render list item with link to detail page', () => {
    jest.spyOn(selectors, 'useRepositories').mockReturnValue(mockMap);
    const { queryByTestId } = renderWithContext(<Home />);
    const listItemElement = queryByTestId('repositories-list-item');
    expect(listItemElement.firstChild).toHaveAttribute('href', `/${mockData.fullName}`);
  });

  test('should render Header', () => {
    const { queryByTestId } = renderWithContext(<Home />);
    expect(queryByTestId('header')).toBeDefined();
  });
});
