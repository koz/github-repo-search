import {
  useTotalCount,
  useRepositories,
  useRepository,
  useOwner,
  useReadme,
  usePaginationLinks,
  useSearchQuery,
} from '.';
import renderHook from '../../../spec/utils/renderHook';

describe('selectors', () => {
  test('useTotalCount', () => {
    const value = renderHook({ hook: useTotalCount, initialState: { search: { totalCount: 10000 } } });
    expect(value).toBe(10000);
  });

  test('useRepositories', () => {
    const value = renderHook(
      {
        hook: useRepositories,
        initialState: { search: { items: new Map([[1, new Map([['full/name', { id: 1 }]])]]) } },
      },
      1
    );
    expect(value).toStrictEqual(new Map([['full/name', { id: 1 }]]));
  });

  test('useRepository', () => {
    const value = renderHook(
      { hook: useRepository, initialState: { repositories: new Map([['full/name', { id: 1 }]]) } },
      'full',
      'name'
    );
    expect(value).toMatchObject({ id: 1 });
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

  test('usePaginationLinks', () => {
    const mockData = {
      next: '1',
      prev: '2',
    };

    const value = renderHook({
      hook: usePaginationLinks,
      initialState: {
        search: {
          pagination: mockData,
        },
      },
    });

    expect(value).toStrictEqual(mockData);
  });

  test('useSearchQuery', () => {
    const value = renderHook({
      hook: useSearchQuery,
      initialState: {
        search: {
          query: 'query',
        },
      },
    });

    expect(value).toStrictEqual('query');
  });
});
