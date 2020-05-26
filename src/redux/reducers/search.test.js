import reducer from './search';
import { FETCH_REPOSITORIES_START, FETCH_REPOSITORIES_ERROR, FETCH_REPOSITORIES_SUCCESS } from '../actions/actions';

describe('reducers/search', () => {
  test('should return updated state in FETCH_REPOSITORIES_START', () => {
    const state = reducer(null, { type: FETCH_REPOSITORIES_START, payload: { query: 'test' } });
    expect(state).toStrictEqual({
      isLoading: true,
      items: new Map(),
      query: 'test',
    });
  });

  test('should return updated state in FETCH_REPOSITORIES_ERROR', () => {
    const state = reducer(null, {
      type: FETCH_REPOSITORIES_ERROR,
      payload: new Error({ code: 404, message: 'Not Found' }),
    });
    expect(state).toStrictEqual({
      isLoading: false,
      error: new Error({ code: 404, message: 'Not Found' }),
    });
  });

  test('should return updated state in FETCH_REPOSITORIES_SUCCESS', () => {
    const state = reducer(undefined, {
      type: FETCH_REPOSITORIES_SUCCESS,
      payload: {
        items: new Map([['test', { name: 'name' }]]),
        totalCount: 100,
        pagination: {
          next: 2,
        },
        responseTime: 100,
        page: 1,
      },
    });
    expect(state).toStrictEqual({
      isLoading: false,
      totalCount: 100,
      pagination: {
        next: 2,
      },
      responseTime: 100,
      items: new Map([[1, new Map([['test', { name: 'name' }]])]]),
    });
  });

  test('should append new items to existing map in FETCH_REPOSITORY_SUCCESS', () => {
    const state = reducer(
      { items: new Map([[1, new Map([['test', { name: 'name' }]])]]) },
      {
        type: FETCH_REPOSITORIES_SUCCESS,
        payload: {
          items: new Map([['test2', { name: 'name2' }]]),
          page: 2,
        },
      }
    );
    expect(state).toMatchObject({
      items: new Map([
        [1, new Map([['test', { name: 'name' }]])],
        [2, new Map([['test2', { name: 'name2' }]])],
      ]),
    });
  });
});
