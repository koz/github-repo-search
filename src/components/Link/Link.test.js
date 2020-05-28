import React from 'react';
import { render } from '@testing-library/react';
import Link from './index';

describe('<Link />', () => {
  test('should accept external className', () => {
    const { container } = render(<Link className="test" href="http://test" />);
    expect(container.firstChild).toHaveClass('test');
  });

  test('should render a tag', () => {
    const { container } = render(<Link href="http://test" />);
    expect(container.firstChild.tagName).toEqual('A');
  });

  test('should pass href to a tag', () => {
    const { container } = render(<Link href="http://test/href" />);
    expect(container.firstChild).toHaveProperty('href', 'http://test/href');
  });

  test('should render children', () => {
    const { container } = render(<Link href="http://test">Test content</Link>);
    expect(container).toHaveTextContent('Test content');
  });

  test('should pass data-testid', () => {
    const { queryByTestId } = render(<Link data-testid="test" href="http://test" />);
    expect(queryByTestId('test')).toBeInTheDocument();
  });

  test('should accept external target prop', () => {
    const { container } = render(<Link target="_blank" href="http://test/href" />);
    expect(container.firstChild).toHaveProperty('target', '_blank');
  });
});
