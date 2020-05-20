import reducer from './repositories';
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
    expect(reducer(state, { type: '' })).toStrictEqual(state);
  });

  test('should return load state true in FETCH_REPOSITORIES_START action type', () => {
    expect(reducer({}, { type: FETCH_REPOSITORIES_START })).toStrictEqual({ isLoading: true });
  });

  test('should return load state false and payload as repositories in FETCH_REPOSITORIES_SUCCESS action type', () => {
    const payload = { totalCount: 3, items: [1, 2, 3] };
    expect(reducer({}, { type: FETCH_REPOSITORIES_SUCCESS, payload })).toStrictEqual({
      isLoading: false,
      items: payload.items,
      totalCount: payload.totalCount,
    });
  });

  test('should return load state false and payload as error in FETCH_REPOSITORIES_ERROR action type', () => {
    const payload = { code: 1, message: 'test' };
    expect(reducer({}, { type: FETCH_REPOSITORIES_ERROR, payload })).toStrictEqual({
      isLoading: false,
      error: payload,
    });
  });

  test('should return load state true in FETCH_REPOSITORY_START action type', () => {
    expect(reducer({}, { type: FETCH_REPOSITORY_START })).toStrictEqual({ isLoadingRepository: true });
  });

  test('should return load state false and payload as a repositories item in FETCH_REPOSITORY_SUCCESS action type', () => {
    const payload = { fullName: 'payload' };
    const initialData = { fullName: 'full/name' };
    expect(
      reducer({ items: new Map([[initialData.fullName, initialData]]) }, { type: FETCH_REPOSITORY_SUCCESS, payload })
    ).toStrictEqual({
      isLoadingRepository: false,
      items: new Map([
        [initialData.fullName, initialData],
        [payload.fullName, payload],
      ]),
    });

    expect(reducer({}, { type: FETCH_REPOSITORY_SUCCESS, payload })).toStrictEqual({
      isLoadingRepository: false,
      items: new Map([[payload.fullName, payload]]),
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
