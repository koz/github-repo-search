import React from 'react';
import { render } from '@testing-library/react';
import Pagination from '.';
import { renderWithRouter } from '../../../spec/utils/renderWithContext';

describe('<Pagination />', () => {
  test('should render', () => {
    const { container } = render(<Pagination />);
    expect(container).toBeInTheDocument();
  });

  test('should accept external className', () => {
    const { container } = render(<Pagination className="test" />);
    expect(container.firstChild).toHaveClass('test');
  });

  test("should render left arrow link if there's previous pagination", () => {
    const { queryByTestId, queryByAltText } = renderWithRouter(
      <Pagination className="test" pagination={{ prev: '1' }} />
    );
    const prevLink = queryByTestId('prev-link');
    expect(prevLink).toBeInTheDocument();
    expect(prevLink.tagName).toEqual('A');
    expect(prevLink).toHaveAttribute('href', '/?page=1');
    expect(queryByAltText('Go to previous page')).toBeInTheDocument();
  });

  test("should render right arrow link if there's next pagination", () => {
    const { queryByTestId, queryByAltText } = renderWithRouter(
      <Pagination className="test" pagination={{ next: '2' }} />
    );
    const nextLink = queryByTestId('next-link');
    expect(nextLink).toBeInTheDocument();
    expect(nextLink.tagName).toEqual('A');
    expect(nextLink).toHaveAttribute('href', '/?page=2');
    expect(queryByAltText('Go to next page')).toBeInTheDocument();
  });

  test("should not render left arrow link if there's no previous pagination", () => {
    const { queryByTestId, queryByAltText } = renderWithRouter(<Pagination className="test" pagination={{}} />);
    const prevLink = queryByTestId('prev-link');
    expect(prevLink).toBeInTheDocument();
    expect(prevLink.tagName).toEqual('SPAN');
    expect(prevLink).not.toHaveAttribute('href');
    expect(queryByAltText('Go to previous page')).toBeInTheDocument();
  });

  test("should not render right arrow link if there's no next pagination", () => {
    const { queryByTestId, queryByAltText } = renderWithRouter(<Pagination className="test" pagination={{}} />);
    const nextLink = queryByTestId('next-link');
    expect(nextLink).toBeInTheDocument();
    expect(nextLink.tagName).toEqual('SPAN');
    expect(nextLink).not.toHaveAttribute('href');
    expect(queryByAltText('Go to next page')).toBeInTheDocument();
  });

  test('should render current page', () => {
    const { queryByTestId } = render(<Pagination currentPage={2} />);
    expect(queryByTestId('current-page')).toHaveTextContent('2');
  });
});
