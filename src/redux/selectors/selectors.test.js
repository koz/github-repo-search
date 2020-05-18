import React from 'react';
import { renderWithProvider } from '../../../spec/utils/renderWithContext';
import { useTotalCount } from '.';

const setup = (selector, state) => {
  let val = {};
  const TestComponent = () => {
    val = selector();
    return null;
  };
  renderWithProvider(<TestComponent />, { state });
  return val;
};

describe('selectors', () => {
  test('useTotalCount', () => {
    const value = setup(useTotalCount, { repositories: { totalCount: 10000 } });
    expect(value).toBe(10000);
  });
});
