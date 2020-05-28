import * as React from 'react';
import { renderWithRouter } from '../../../spec/utils/renderWithContext';
import ResultsList from '.';

const mockData = {
  id: 1,
  name: 'mock name',
  description: 'mock description',
  language: 'mock language',
  updatedAt: '2020-05-20T10:00:00.000Z',
  license: {
    name: 'mock license',
  },
  fullName: 'full/name',
  stars: 999,
};

const mockMap = new Map([[1, mockData]]);

describe('<ResultsList />', () => {
  test('should accept external className', () => {
    const { container } = renderWithRouter(<ResultsList className="test" />);
    expect(container.firstChild).toHaveClass('test');
  });

  test('should accept external test id', () => {
    const { queryByTestId } = renderWithRouter(<ResultsList data-testid="test" />);
    expect(queryByTestId('test')).toBeInTheDocument();
  });

  test("should render list if there's repositories", () => {
    const { queryByTestId } = renderWithRouter(<ResultsList repositories={mockMap} data-testid="repositories-list" />);
    expect(queryByTestId('repositories-list')).toBeInTheDocument();
    expect(queryByTestId('repositories-list-item')).toBeInTheDocument();
  });

  test('should render list item with link to detail page', () => {
    const { queryByTestId } = renderWithRouter(<ResultsList repositories={mockMap} />);
    const listItemElement = queryByTestId('repositories-list-item');
    expect(listItemElement.firstChild).toHaveAttribute('href', `/${mockData.fullName}`);
  });

  test('should render repository information', () => {
    const { queryByText } = renderWithRouter(<ResultsList repositories={mockMap} />);
    expect(queryByText(mockData.name)).toBeInTheDocument();
    expect(queryByText(mockData.description)).toBeInTheDocument();
    expect(queryByText(mockData.language)).toBeInTheDocument();
    expect(queryByText(mockData.license.name)).toBeInTheDocument();
    expect(queryByText(String(mockData.stars))).toBeInTheDocument();
    // mockData.updatedAt
    expect(queryByText('May 20, 2020', { exact: false })).toBeInTheDocument();
  });

  test("should render empty list if there's no repositories", () => {
    const { queryByTestId } = renderWithRouter(<ResultsList data-testid="repositories-list" />);
    const listElement = queryByTestId('repositories-list');
    expect(listElement).toBeInTheDocument();
    expect(listElement.childNodes).toHaveLength(0);
  });
});
