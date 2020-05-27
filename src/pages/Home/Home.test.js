import * as React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithContext from '../../../spec/utils/renderWithContext';
import * as hook from '../../hooks/useSearchForm';
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
    expect(getByTestId('search-form')).toBeInTheDocument();
  });

  test("should render results if there's data", () => {
    jest.spyOn(hook, 'default').mockReturnValue({ repositories: mockMap, resultsCount: 10000, query: 'test' });
    const { queryByText } = renderWithContext(<Home />);
    expect(queryByText('10,000', { exact: false })).toBeInTheDocument();
  });

  test("should not render results if there's no data", () => {
    jest.spyOn(hook, 'default').mockReturnValue({});
    const { queryByText } = renderWithContext(<Home />);
    expect(queryByText('10,000', { exact: false })).not.toBeInTheDocument();
  });

  test("should render results label in singular if there's only 1 result", () => {
    jest.spyOn(hook, 'default').mockReturnValue({ repositories: mockMap, resultsCount: 1, query: 'test' });
    const { queryByText } = renderWithContext(<Home />);
    expect(queryByText('repository', { exact: false })).toBeInTheDocument();
  });

  test("should render results label in plural if there's more than 1 result", () => {
    jest.spyOn(hook, 'default').mockReturnValue({ repositories: mockMap, resultsCount: 2, query: 'test' });
    const { queryByText } = renderWithContext(<Home />);
    expect(queryByText('repositories', { exact: false })).toBeInTheDocument();
  });

  test("should render list if there's repositories", () => {
    jest.spyOn(hook, 'default').mockReturnValue({ repositories: mockMap, resultsCount: 1, query: 'test' });
    const { queryByTestId } = renderWithContext(<Home />);
    expect(queryByTestId('repositories-list')).toBeInTheDocument();
    expect(queryByTestId('repositories-list-item')).toBeInTheDocument();
  });

  test("should not render list if there's no query data", () => {
    jest.spyOn(hook, 'default').mockReturnValue({ repositories: mockMap, resultsCount: 1 });
    const { queryByTestId } = renderWithContext(<Home />);
    expect(queryByTestId('repositories-list')).not.toBeInTheDocument();
  });

  test("should not render list if there's error data", () => {
    jest.spyOn(hook, 'default').mockReturnValue({ repositories: mockMap, resultsCount: 1, query: 'test', error: {} });
    const { queryByTestId } = renderWithContext(<Home />);
    expect(queryByTestId('repositories-list')).not.toBeInTheDocument();
  });

  test('should render list item with link to detail page', () => {
    jest.spyOn(hook, 'default').mockReturnValue({ repositories: mockMap, resultsCount: 1, query: 'test' });
    const { queryByTestId } = renderWithContext(<Home />);
    const listItemElement = queryByTestId('repositories-list-item');
    expect(listItemElement.firstChild).toHaveAttribute('href', `/${mockData.fullName}`);
  });

  test('should render error message', () => {
    jest.spyOn(hook, 'default').mockReturnValue({ repositories: mockMap, resultsCount: 1, query: 'test', error: {} });
    const { queryByTestId } = renderWithContext(<Home />);
    expect(queryByTestId('error-message')).toBeInTheDocument();
  });

  test('should render no results message if results count is 0', () => {
    jest.spyOn(hook, 'default').mockReturnValue({ resultsCount: 0, query: 'test' });
    const { queryByTestId } = renderWithContext(<Home />);
    expect(queryByTestId('no-results-message')).toBeInTheDocument();
  });

  test("should render loading message if there's loading true", () => {
    jest.spyOn(hook, 'default').mockReturnValue({ resultsCount: 1, isLoading: true });
    const { queryByTestId } = renderWithContext(<Home />);
    expect(queryByTestId('loading-message')).toBeInTheDocument();
  });

  test('should update input value and call handle change callback on input change', () => {
    const mockChange = jest.fn();
    const mockSetState = jest.fn();
    jest.spyOn(hook, 'default').mockReturnValue({ handleChange: mockChange });
    jest.spyOn(React, 'useState').mockReturnValue(['', mockSetState]);
    const { getByTestId } = renderWithContext(<Home />);
    const inputValue = getByTestId('search-form').getElementsByTagName('input')[0];
    fireEvent.change(inputValue, { target: { value: 'test' } });
    expect(mockChange).toBeCalledTimes(1);
    expect(mockSetState).toBeCalledWith('test');
  });

  test('should render pagination', () => {
    jest
      .spyOn(hook, 'default')
      .mockReturnValue({ repositories: mockMap, resultsCount: 1, query: 'test', pagination: {} });
    const { queryByTestId } = renderWithContext(<Home />);
    expect(queryByTestId('pagination')).toBeInTheDocument();
  });
});
