import React from 'react';
import { render } from '@testing-library/react';
import LoadingPageComponent from './index';

describe('<LoadingPageComponent />', () => {
  test('should render', () => {
    const { getByText } = render(<LoadingPageComponent />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  test('should use route prop to build data-testid', () => {
    const { queryByTestId } = render(<LoadingPageComponent route="test" />);
    expect(queryByTestId('test-route')).toBeInTheDocument();
  });
});
