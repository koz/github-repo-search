import * as React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithContext from '../../../spec/utils/renderWithContext';
import * as mockUseSearchResults from '../../hooks/useSearchResults';
import * as mockUseSearchQueryString from '../../hooks/useSearchQueryString';
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
    jest.spyOn(mockUseSearchResults, 'default').mockReturnValue({});
    const { container } = renderWithContext(<Home />);
    expect(container).toBeInTheDocument();
  });

  test('should render SearchForm', () => {
    jest.spyOn(mockUseSearchResults, 'default').mockReturnValue({});
    const { getByTestId } = renderWithContext(<Home />);
    expect(getByTestId('search-form')).toBeInTheDocument();
  });

  test("should render results if there's data", () => {
    jest.spyOn(mockUseSearchQueryString, 'default').mockReturnValue({ query: 'test' });
    jest.spyOn(mockUseSearchResults, 'default').mockReturnValue({ repositories: mockMap });
    const { queryByTestId } = renderWithContext(<Home />);
    expect(queryByTestId('results-count')).toBeInTheDocument();
  });

  test("should not render results if there's no data", () => {
    const { queryByTestId } = renderWithContext(<Home />);
    expect(queryByTestId('results-count')).not.toBeInTheDocument();
  });

  test("should render list if there's repositories", () => {
    jest.spyOn(mockUseSearchQueryString, 'default').mockReturnValue({ query: 'test' });
    jest.spyOn(mockUseSearchResults, 'default').mockReturnValue({ repositories: mockMap });
    const { queryByTestId } = renderWithContext(<Home />);
    expect(queryByTestId('repositories-list')).toBeInTheDocument();
  });

  test("should not render list if there's no query data", () => {
    jest.spyOn(mockUseSearchResults, 'default').mockReturnValue({ repositories: mockMap, resultsCount: 1 });
    const { queryByTestId } = renderWithContext(<Home />);
    expect(queryByTestId('repositories-list')).not.toBeInTheDocument();
  });

  test("should not render list if there's error data", () => {
    jest
      .spyOn(mockUseSearchResults, 'default')
      .mockReturnValue({ repositories: mockMap, resultsCount: 1, query: 'test', error: {} });
    const { queryByTestId } = renderWithContext(<Home />);
    expect(queryByTestId('repositories-list')).not.toBeInTheDocument();
  });

  test('should render error message', () => {
    jest
      .spyOn(mockUseSearchResults, 'default')
      .mockReturnValue({ repositories: mockMap, resultsCount: 1, query: 'test', error: {} });
    const { queryByTestId } = renderWithContext(<Home />);
    expect(queryByTestId('error-message')).toBeInTheDocument();
  });

  test("should render loading message if there's loading true", () => {
    jest.spyOn(mockUseSearchResults, 'default').mockReturnValue({ resultsCount: 1, isLoading: true });
    const { queryByTestId } = renderWithContext(<Home />);
    expect(queryByTestId('loading-message')).toBeInTheDocument();
  });

  test('should update call handle change callback on input change', () => {
    const mockChange = jest.fn();
    const mockSetState = jest.fn();
    jest.spyOn(mockUseSearchQueryString, 'default').mockReturnValue({ handleChange: mockChange });
    jest.spyOn(React, 'useState').mockReturnValue(['', mockSetState]);
    const { getByTestId } = renderWithContext(<Home />);
    const inputValue = getByTestId('search-form').getElementsByTagName('input')[0];
    fireEvent.change(inputValue, { target: { value: 'test' } });
    expect(mockChange).toBeCalledTimes(1);
    expect(mockSetState).toBeCalledWith('test');
  });

  test('should update state on input change', () => {
    const mockSetState = jest.fn();
    jest.spyOn(React, 'useState').mockReturnValue(['', mockSetState]);
    const { getByTestId } = renderWithContext(<Home />);
    const inputValue = getByTestId('search-form').getElementsByTagName('input')[0];
    fireEvent.change(inputValue, { target: { value: 'test' } });
    expect(mockSetState).toBeCalledWith('test');
  });

  test('should render pagination', () => {
    jest.spyOn(mockUseSearchQueryString, 'default').mockReturnValue({ query: 'test' });
    jest.spyOn(mockUseSearchResults, 'default').mockReturnValue({ repositories: mockMap, pagination: {} });
    const { queryByTestId } = renderWithContext(<Home />);
    expect(queryByTestId('pagination')).toBeInTheDocument();
  });
});
