import React from 'react';
import { render } from '@testing-library/react';
import Readme from '.';

describe('<Readme />', () => {
  test('should accept external className', () => {
    const { container } = render(<Readme className="test" />);
    expect(container.firstChild).toHaveClass('test');
  });

  test('should accept external data-testid', () => {
    const { queryByTestId } = render(<Readme data-testid="test" />);
    expect(queryByTestId('test')).toBeInTheDocument();
  });

  test('should render error message in error 404', () => {
    const { queryByText } = render(<Readme error={{ code: 404, message: 'Test Error' }} />);
    expect(queryByText('Test Error')).toBeInTheDocument();
  });

  test('should render generic error message in other errors', () => {
    const { queryByText } = render(<Readme error={{ code: 100, message: 'Test Error' }} />);
    expect(queryByText('An error occurred.')).toBeInTheDocument();
  });

  test("should not render content if there's an error", () => {
    const { queryByText } = render(<Readme error={{ code: 100, message: 'Test Error' }} content="Testing content" />);
    expect(queryByText('An error occurred.')).toBeInTheDocument();
    expect(queryByText('Testing content')).not.toBeInTheDocument();
  });

  test('should render content', () => {
    const { queryByText } = render(<Readme content="Testing content" />);
    expect(queryByText('Testing content')).toBeInTheDocument();
  });
});
