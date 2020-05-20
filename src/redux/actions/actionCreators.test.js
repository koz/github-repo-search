import {
  fetchRepositoriesStart,
  fetchRepositoriesSuccess,
  fetchRepositoriesError,
  fetchRepositoryStart,
  fetchRepositorySuccess,
  fetchRepositoryError,
  fetchOwnerStart,
  fetchOwnerSuccess,
  fetchOwnerError,
} from './actionCreators';
import {
  FETCH_REPOSITORIES_START,
  FETCH_REPOSITORIES_SUCCESS,
  FETCH_REPOSITORIES_ERROR,
  FETCH_REPOSITORY_START,
  FETCH_REPOSITORY_SUCCESS,
  FETCH_REPOSITORY_ERROR,
  FETCH_OWNER_START,
  FETCH_OWNER_SUCCESS,
  FETCH_OWNER_ERROR,
} from './actions';

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

  describe('fetchRepository', () => {
    test('should return the correct type', () => {
      expect(fetchRepositoryStart()).toMatchObject({ type: FETCH_REPOSITORY_START });
    });
  });

  describe('fetchRepositorySuccess', () => {
    test('should return the correct type', () => {
      expect(fetchRepositorySuccess()).toMatchObject({ type: FETCH_REPOSITORY_SUCCESS });
    });

    test('should return the param as payload', () => {
      const data = { a: 1 };
      expect(fetchRepositorySuccess(data)).toMatchObject({ type: FETCH_REPOSITORY_SUCCESS, payload: data });
    });
  });

  describe('fetchRepositoriesError', () => {
    test('should return the correct type', () => {
      expect(fetchRepositoryError()).toMatchObject({ type: FETCH_REPOSITORY_ERROR });
    });

    test('should return the param as payload', () => {
      const error = { code: 111 };
      expect(fetchRepositoryError(error)).toMatchObject({ type: FETCH_REPOSITORY_ERROR, payload: error });
    });
  });

  describe('fetchOwner', () => {
    test('should return the correct type', () => {
      const testId = 'id';
      expect(fetchOwnerStart(testId)).toMatchObject({ type: FETCH_OWNER_START, payload: testId });
    });
  });

  describe('fetchOwnerSuccess', () => {
    test('should return the correct type', () => {
      expect(fetchOwnerSuccess()).toMatchObject({ type: FETCH_OWNER_SUCCESS });
    });

    test('should return the param as payload', () => {
      const data = { id: 1 };
      expect(fetchOwnerSuccess(data)).toMatchObject({ type: FETCH_OWNER_SUCCESS, payload: data });
    });
  });

  describe('fetchOwnerError', () => {
    test('should return the correct type', () => {
      expect(fetchOwnerError()).toMatchObject({ type: FETCH_OWNER_ERROR });
    });

    test('should return the param as payload', () => {
      const testId = 1;
      const error = { code: 111 };
      expect(fetchOwnerError(testId, error)).toMatchObject({
        type: FETCH_OWNER_ERROR,
        payload: { owner: testId, error },
      });
    });
  });
});
