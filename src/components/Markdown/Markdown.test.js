import React from 'react';
import { render } from '@testing-library/react';
import Markdown from '.';

/* WIP */
describe('<Markdown />', () => {
  test('should render correctly', () => {
    const { container } = render(<Markdown content="# Hello World" />);
    expect(container).toBeInTheDocument();
  });

  test('should render h1 correctly', () => {
    const { container } = render(<Markdown content="# Hello World" />);
    expect(container.getElementsByTagName('h1')).toHaveLength(1);
  });

  test('should render h2 correctly', () => {
    const { container } = render(<Markdown content="## Hello World" />);
    expect(container.getElementsByTagName('h2')).toHaveLength(1);
  });

  test('should render h3 correctly', () => {
    const { container } = render(<Markdown content="### Hello World" />);
    expect(container.getElementsByTagName('h3')).toHaveLength(1);
  });

  test('should render h4 correctly', () => {
    const { container } = render(<Markdown content="#### Hello World" />);
    expect(container.getElementsByTagName('h4')).toHaveLength(1);
  });

  test('should render h5 correctly', () => {
    const { container } = render(<Markdown content="##### Hello World" />);
    expect(container.getElementsByTagName('h5')).toHaveLength(1);
  });

  test('should render h6 correctly', () => {
    const { container } = render(<Markdown content="###### Hello World" />);
    expect(container.getElementsByTagName('h6')).toHaveLength(1);
  });

  test('should render a tag correctly', () => {
    const { container } = render(<Markdown content="[Hello World](http://www.test.com)" />);
    expect(container.getElementsByTagName('a')).toHaveLength(1);
    expect(container.getElementsByTagName('a')[0]).toHaveAttribute('href', 'http://www.test.com');
  });

  test('should render li tag correctly', () => {
    const { container } = render(<Markdown content="- Hello World" />);
    expect(container.getElementsByTagName('li')).toHaveLength(1);
  });

  test('should render img tag correctly', () => {
    const { container } = render(<Markdown content="![Hello World](http://image.com)" />);
    expect(container.getElementsByTagName('img')).toHaveLength(1);
    expect(container.getElementsByTagName('img')[0]).toHaveAttribute('src', 'http://image.com');
  });

  test('should render hr tag correctly', () => {
    const { container } = render(<Markdown content="---" />);
    expect(container.getElementsByTagName('hr')).toHaveLength(1);
  });

  test('should render p tag correctly', () => {
    const { container } = render(
      <Markdown
        content={`
Hello World
Paragraph
    `}
      />
    );
    expect(container.getElementsByTagName('p')).toHaveLength(1);
  });
});
