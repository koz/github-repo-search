import {
  fetchRepositoriesStart,
  fetchRepositoriesSuccess,
  fetchRepositoriesError,
  fetchRepositoryStart,
  fetchRepositoryError,
  fetchRepositorySuccess,
} from '../actions/actionCreators';
import { getRepos, getRepo } from '../../api';
import { repoDataMapper, errorDataMapper } from '../utils';

export const getRepositories = (keyword) => async (dispatch) => {
  await dispatch(fetchRepositoriesStart());
  return getRepos(keyword)
    .then((data) => {
      const repositoriesMap = new Map();
      data.items.forEach((data) => {
        repositoriesMap.set(data.id, repoDataMapper(data));
      });
      const parsedData = {
        totalCount: data.total_count,
        items: repositoriesMap,
      };
      dispatch(fetchRepositoriesSuccess(parsedData));
    })
    .catch((error) => dispatch(fetchRepositoriesError(errorDataMapper(error))));
};

export const getRepository = (owner, repo) => async (dispatch) => {
  await dispatch(fetchRepositoryStart());
  return getRepo(owner, repo)
    .then((data) => {
      dispatch(fetchRepositorySuccess(repoDataMapper(data)));
    })
    .catch((error) => dispatch(fetchRepositoryError(errorDataMapper(error))));
};
