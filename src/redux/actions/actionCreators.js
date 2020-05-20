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

/* Repositories */
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

/* Repository */
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

/* Owner */
export const fetchOwnerStart = (owner) => ({
  type: FETCH_OWNER_START,
  payload: owner,
});

export const fetchOwnerSuccess = (data) => ({
  type: FETCH_OWNER_SUCCESS,
  payload: data,
});

export const fetchOwnerError = (owner, error) => ({
  type: FETCH_OWNER_ERROR,
  payload: { owner, error },
});
