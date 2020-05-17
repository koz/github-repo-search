import { FETCH_REPOSITORIES_START, FETCH_REPOSITORIES_SUCCESS, FETCH_REPOSITORIES_ERROR } from './actions';

export const fetchRepositoriesStart = () => ({
  type: FETCH_REPOSITORIES_START,
});

export const fetchRepositoriesSuccess = (data) => ({
  type: FETCH_REPOSITORIES_SUCCESS,
  payload: data,
});

export const fetchRepositoriesError = (error) => ({
  type: FETCH_REPOSITORIES_ERROR,
  payload: error,
});
