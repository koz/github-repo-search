import React from 'react';
import { render } from '@testing-library/react';
import DetailsProperties from './index';

describe('<DetailsProperties />', () => {
  test('should render the correct values', () => {
    const mockProps = {
      stars: 100,
      forks: 1000,
      issues: 10000,
      watchers: 100000,
    };
    const { queryByTestId } = render(
      <DetailsProperties
        stars={mockProps.stars}
        forks={mockProps.forks}
        issues={mockProps.issues}
        watchers={mockProps.watchers}
      />
    );
    expect(queryByTestId('stars')).toHaveTextContent(mockProps.stars);
    expect(queryByTestId('issues')).toHaveTextContent(mockProps.issues);
    expect(queryByTestId('forks')).toHaveTextContent(mockProps.forks);
    expect(queryByTestId('watchers')).toHaveTextContent(mockProps.watchers);
  });

  test("should render 0 value if there's no data", () => {
    const { queryByTestId } = render(<DetailsProperties />);
    expect(queryByTestId('stars')).toHaveTextContent(0);
    expect(queryByTestId('issues')).toHaveTextContent(0);
    expect(queryByTestId('forks')).toHaveTextContent(0);
    expect(queryByTestId('watchers')).toHaveTextContent(0);
  });
});
