import React from 'react';
import { render } from '@testing-library/react';
import ResultsCount from '.';

describe('<ResultsCount />', () => {
  test('should accept external className', () => {
    const { container } = render(<ResultsCount className="test" />);
    expect(container.firstChild).toHaveClass('test');
  });

  test('should accept external test-id', () => {
    const { queryByTestId } = render(<ResultsCount data-testid="test" />);
    expect(queryByTestId('test')).toBeInTheDocument();
  });

  test('should render formatted respositories length value', () => {
    const { queryByText } = render(<ResultsCount totalResults={10000} />);
    expect(queryByText('10,000', { exact: false })).toBeInTheDocument();
  });

  test('should render repository label in singular for 1 totalResult', () => {
    const { queryByText } = render(<ResultsCount totalResults={1} />);
    expect(queryByText('repository', { exact: false })).toBeInTheDocument();
  });

  test('should render repository label in plural for more than 1 totalResult', () => {
    const { queryByText } = render(<ResultsCount totalResults={2} />);
    expect(queryByText('repositories', { exact: false })).toBeInTheDocument();
  });

  test('should render first and last repository page item index', () => {
    const { queryByText } = render(<ResultsCount repositoriesLength={30} currentPage={1} />);
    expect(queryByText('1', { exact: false })).toBeInTheDocument();
    expect(queryByText('30', { exact: false })).toBeInTheDocument();
  });

  test('should render response time in seconds', () => {
    const { queryByText } = render(<ResultsCount responseTime={10000} />);
    expect(queryByText('10s', { exact: false })).toBeInTheDocument();
  });
});
