import React from 'react';
import { render } from '@testing-library/react';
import Link from './index';

/* Disabling a11y eslint rule for tests */
/* eslint-disable jsx-a11y/anchor-is-valid */
describe('<Link />', () => {
  test('should accept external className', () => {
    const { container } = render(<Link className="test" />);
    expect(container.firstChild).toHaveClass('test');
  });

  test('should render a tag', () => {
    const { container } = render(<Link />);
    expect(container.firstChild.tagName).toEqual('A');
  });

  test('should pass href to a tag', () => {
    const { container } = render(<Link href="http://test/href" />);
    expect(container.firstChild).toHaveProperty('href', 'http://test/href');
  });

  test('should render children', () => {
    const { container } = render(<Link>Test content</Link>);
    expect(container).toHaveTextContent('Test content');
  });

  test('should pass data-testid', () => {
    const { queryByTestId } = render(<Link data-testid="test" />);
    expect(queryByTestId('test')).toBeInTheDocument();
  });
});
