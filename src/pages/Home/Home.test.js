import * as React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithContext from '../../../spec/utils/renderWithContext';
import * as hook from '../../hooks/useSearchForm';
import Home from './Home';

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
    jest.spyOn(hook, 'default').mockReturnValue({});
    const { container } = renderWithContext(<Home />);
    expect(container).toBeDefined();
  });

  test('should render SearchForm', () => {
    jest.spyOn(hook, 'default').mockReturnValue({});
    const { getByTestId } = renderWithContext(<Home />);
    expect(getByTestId('search-form')).toBeInTheDocument();
  });

  test("should render results if there's data", () => {
    jest.spyOn(hook, 'default').mockReturnValue({ repositories: mockMap, resultsCount: 10000, query: 'test' });
    const { queryByTestId } = renderWithContext(<Home />);
    expect(queryByTestId('results-count')).toBeInTheDocument();
  });

  test("should not render results if there's no data", () => {
    jest.spyOn(hook, 'default').mockReturnValue({ resultsCount: 0 });
    const { queryByTestId } = renderWithContext(<Home />);
    expect(queryByTestId('results-count')).not.toBeInTheDocument();
  });

  test("should render list if there's repositories", () => {
    jest.spyOn(hook, 'default').mockReturnValue({ repositories: mockMap, resultsCount: 1, query: 'test' });
    const { queryByTestId } = renderWithContext(<Home />);
    expect(queryByTestId('repositories-list')).toBeInTheDocument();
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

  test('should render error message', () => {
    jest.spyOn(hook, 'default').mockReturnValue({ repositories: mockMap, resultsCount: 1, query: 'test', error: {} });
    const { queryByTestId } = renderWithContext(<Home />);
    expect(queryByTestId('error-message')).toBeInTheDocument();
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
