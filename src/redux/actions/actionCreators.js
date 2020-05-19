import {
  FETCH_REPOSITORIES_START,
  FETCH_REPOSITORIES_SUCCESS,
  FETCH_REPOSITORIES_ERROR,
  FETCH_REPOSITORY_START,
  FETCH_REPOSITORY_SUCCESS,
  FETCH_REPOSITORY_ERROR,
} from './actions';

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

export const fetchRepositoryStart = () => ({
  type: FETCH_REPOSITORY_START,
});

export const fetchRepositorySuccess = (data) => ({
  type: FETCH_REPOSITORY_SUCCESS,
  payload: data,
});

export const fetchRepositoryError = (error) => ({
  type: FETCH_REPOSITORY_ERROR,
  payload: error,
});
