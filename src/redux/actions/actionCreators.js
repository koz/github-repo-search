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
  FETCH_README_START,
  FETCH_README_ERROR,
  FETCH_README_SUCCESS,
} from './actions';

/* Repositories */
export const fetchRepositoriesStart = (keyword) => ({
  type: FETCH_REPOSITORIES_START,
  payload: { query: keyword },
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

/* README.md */
export const fetchReadmeStart = (owner, repo) => ({
  type: FETCH_README_START,
  payload: { owner, repo },
});

export const fetchReadmeError = (owner, repo, error) => ({
  type: FETCH_README_ERROR,
  payload: { owner, repo, error },
});

export const fetchReadmeSuccess = (owner, repo, data) => ({
  type: FETCH_README_SUCCESS,
  payload: { owner, repo, data },
});
