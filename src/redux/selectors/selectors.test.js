import React from 'react';
import {
  useTotalCount,
  useRepositories,
  useRepository,
  useRepositoryLoading,
  useRepositoryError,
  useOwner,
  useReadme,
} from '.';
import renderHook from '../../../spec/utils/renderHook';

describe('selectors', () => {
  test('useTotalCount', () => {
    const value = renderHook({ hook: useTotalCount, initialState: { repositories: { totalCount: 10000 } } });
    expect(value).toBe(10000);
  });

  test('useRepositories', () => {
    const value = renderHook({ hook: useRepositories, initialState: { repositories: { items: [1, 2, 3] } } });
    expect(value).toStrictEqual([1, 2, 3]);
  });

  test('useRepository', () => {
    const value = renderHook(
      { hook: useRepository, initialState: { repositories: { items: new Map([['full/name', { id: 1 }]]) } } },
      'full',
      'name'
    );
    expect(value).toMatchObject({ id: 1 });
  });

  test('useRepositoryLoading', () => {
    const value = renderHook({
      hook: useRepositoryLoading,
      initialState: { repositories: { isLoadingRepository: true } },
    });

    expect(value).toBe(true);
  });

  test('useRepositoryError', () => {
    const value = renderHook({
      hook: useRepositoryError,
      initialState: { repositories: { repositoryError: { message: 'error' } } },
    });

    expect(value).toMatchObject({ message: 'error' });
  });

  test('useOwner', () => {
    const value = renderHook({ hook: useOwner, initialState: { owners: new Map([[1, { id: 1, test: 'a' }]]) } }, 1);

    expect(value).toMatchObject({ id: 1, test: 'a' });
  });

  test('useReadme', () => {
    const value = renderHook(
      { hook: useReadme, initialState: { readmeFiles: new Map([['owner/repo', 'content']]) } },
      'owner',
      'repo'
    );

    expect(value).toEqual('content');
  });
});
