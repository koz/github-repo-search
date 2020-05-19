import React from 'react';
import { renderWithProvider } from '../../../spec/utils/renderWithContext';
import { useTotalCount, useRepositories, useRepository } from '.';

const setup = (selector, state, ...args) => {
  let val = {};
  const TestComponent = () => {
    val = selector(...args);
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

  test('useRepositories', () => {
    const value = setup(useRepositories, { repositories: { items: [1, 2, 3] } });
    expect(value).toStrictEqual([1, 2, 3]);
  });

  test('useRepository', () => {
    const value = setup(
      useRepository,
      { repositories: { items: new Map([['full/name', { id: 1 }]]) } },
      'full',
      'name'
    );
    expect(value).toMatchObject({ id: 1 });
  });
});
