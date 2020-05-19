import reducer from './index';
import { FETCH_REPOSITORIES_START, FETCH_REPOSITORIES_SUCCESS, FETCH_REPOSITORIES_ERROR } from '../actions/actions';

describe('reducers', () => {
  test('should return de current state in default action types', () => {
    const state = {};
    expect(reducer(state, { type: '' })).toMatchObject(state);
  });

  test('should return load state true in FETCH_REPOSITORIES_START action type', () => {
    expect(reducer({}, { type: FETCH_REPOSITORIES_START })).toMatchObject({ isLoading: true });
  });

  test('should return load state false and payload as repositories in FETCH_REPOSITORIES_SUCCESS action type', () => {
    const payload = [1, 2, 3];
    expect(reducer({}, { type: FETCH_REPOSITORIES_SUCCESS, payload })).toMatchObject({
      isLoading: false,
      repositories: payload,
    });
  });

  test('should return load state false and payload as error in FETCH_REPOSITORIES_ERROR action type', () => {
    const payload = { code: 1, message: 'test' };
    expect(reducer({}, { type: FETCH_REPOSITORIES_ERROR, payload })).toMatchObject({
      isLoading: false,
      error: payload,
    });
  });
});
