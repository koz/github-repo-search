import reducer from './owners';
import { FETCH_OWNER_START, FETCH_OWNER_ERROR, FETCH_OWNER_SUCCESS } from '../actions/actions';

describe('reducers/owners', () => {
  test('should return loading state on FETCH_OWNER_START', () => {
    expect(reducer(new Map(), { type: FETCH_OWNER_START, payload: 1 })).toMatchObject(
      new Map([[1, { isLoading: true }]])
    );

    expect(reducer(new Map([[1, { test: 1 }]]), { type: FETCH_OWNER_START, payload: 1 })).toMatchObject(
      new Map([[1, { isLoading: true, test: 1 }]])
    );
  });

  test('should return error and loading state on FETCH_OWNER_ERROR', () => {
    const error = { code: 111 };
    expect(reducer(new Map(), { type: FETCH_OWNER_ERROR, payload: { id: 1, error } })).toMatchObject(
      new Map([[1, { isLoading: false, error }]])
    );
    expect(reducer(new Map([[1, { test: 1 }]]), { type: FETCH_OWNER_ERROR, payload: { id: 1, error } })).toMatchObject(
      new Map([[1, { isLoading: false, error, test: 1 }]])
    );
  });

  test('should return state update with payload data on FETCH_OWNER_SUCCESS', () => {
    const payload = { id: 111, test: 'a' };
    expect(reducer(new Map(), { type: FETCH_OWNER_SUCCESS, payload })).toMatchObject(
      new Map([[payload.id, { isLoading: false, hasLoaded: true, ...payload }]])
    );
    expect(reducer(new Map([[payload.id, { existing: 'a' }]]), { type: FETCH_OWNER_SUCCESS, payload })).toMatchObject(
      new Map([[payload.id, { isLoading: false, hasLoaded: true, existing: 'a', ...payload }]])
    );
  });

  test('should return state on generic action', () => {
    expect(reducer(new Map([[1, { test: 'a' }]]), { type: 'action' })).toMatchObject(new Map([[1, { test: 'a' }]]));
  });
});
