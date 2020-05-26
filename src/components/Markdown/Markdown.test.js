import React from 'react';
import { render } from '@testing-library/react';
import Markdown from '.';

/* WIP */
describe('<Markdown />', () => {
  test('should render correctly', () => {
    const { container } = render(<Markdown content="# Hello World" />);
    expect(container).toBeInTheDocument();
  });
});
