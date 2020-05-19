import reducer from './index';
import {
  FETCH_REPOSITORIES_START,
  FETCH_REPOSITORIES_SUCCESS,
  FETCH_REPOSITORIES_ERROR,
  FETCH_REPOSITORY_START,
  FETCH_REPOSITORY_SUCCESS,
  FETCH_REPOSITORY_ERROR,
} from '../actions/actions';

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

  test('should return load state true in FETCH_REPOSITORY_START action type', () => {
    expect(reducer({}, { type: FETCH_REPOSITORY_START })).toMatchObject({ isLoadingRepository: true });
  });

  test('should return load state false and payload as a repositories item in FETCH_REPOSITORY_SUCCESS action type', () => {
    const payload = { id: 1 };
    expect(
      reducer({ repositories: { items: new Map([[2, { id: 2 }]]) } }, { type: FETCH_REPOSITORY_SUCCESS, payload })
    ).toMatchObject({
      isLoadingRepository: false,
      repositories: new Map([
        [2, { id: 2 }],
        [1, payload],
      ]),
    });

    expect(reducer({}, { type: FETCH_REPOSITORY_SUCCESS, payload })).toMatchObject({
      isLoadingRepository: false,
      repositories: new Map([
        [2, { id: 2 }],
        [1, payload],
      ]),
    });
  });

  test('should return load state false and payload as error in FETCH_REPOSITORY_ERROR action type', () => {
    const payload = { code: 1, message: 'test' };
    expect(reducer({}, { type: FETCH_REPOSITORY_ERROR, payload })).toMatchObject({
      isLoadingRepository: false,
      repositoryError: payload,
    });
  });
});
