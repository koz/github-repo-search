import { fetchRepositoriesStart, fetchRepositoriesSuccess, fetchRepositoriesError } from './actionCreators';
import { FETCH_REPOSITORIES_START, FETCH_REPOSITORIES_SUCCESS, FETCH_REPOSITORIES_ERROR } from './actions';

describe('actionCreators', () => {
  describe('fetchRepositories', () => {
    test('should return the correct type', () => {
      expect(fetchRepositoriesStart()).toMatchObject({ type: FETCH_REPOSITORIES_START });
    });
  });

  describe('fetchRepositoriesSuccess', () => {
    test('should return the correct type', () => {
      expect(fetchRepositoriesSuccess()).toMatchObject({ type: FETCH_REPOSITORIES_SUCCESS });
    });

    test('should return the param as payload', () => {
      const data = { a: 1 };
      expect(fetchRepositoriesSuccess(data)).toMatchObject({ type: FETCH_REPOSITORIES_SUCCESS, payload: data });
    });
  });

  describe('fetchRepositoriesError', () => {
    test('should return the correct type', () => {
      expect(fetchRepositoriesError()).toMatchObject({ type: FETCH_REPOSITORIES_ERROR });
    });

    test('should return the param as payload', () => {
      const error = { code: 111 };
      expect(fetchRepositoriesError(error)).toMatchObject({ type: FETCH_REPOSITORIES_ERROR, payload: error });
    });
  });
});
