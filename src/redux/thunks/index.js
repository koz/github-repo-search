import {
  fetchRepositoriesStart,
  fetchRepositoriesSuccess,
  fetchRepositoriesError,
  fetchRepositoryStart,
  fetchRepositoryError,
  fetchRepositorySuccess,
  fetchOwnerStart,
  fetchOwnerSuccess,
  fetchOwnerError,
} from '../actions/actionCreators';
import { getRepos, getRepo, getOwner as getOwnerAPI, getOwnerOrgs } from '../../api';
import { repoDataMapper, errorDataMapper, ownerMapper } from '../utils';

export const getRepositories = (keyword) => async (dispatch) => {
  await dispatch(fetchRepositoriesStart());
  return getRepos(keyword)
    .then((data) => {
      const repositoriesMap = new Map();
      data.items.forEach((data) => {
        repositoriesMap.set(data.full_name, repoDataMapper(data));
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

export const getOwner = (owner) => async (dispatch) => {
  await dispatch(fetchOwnerStart(owner));
  return Promise.all([
    getOwnerAPI(owner),
    getOwnerOrgs(owner).catch(() => {
      /*
      Preventing getOwner to reject if the orgs fetch fail.
      */
      return [];
    }),
  ])
    .then(([ownerData, orgsData]) => {
      dispatch(fetchOwnerSuccess(ownerMapper(ownerData, orgsData)));
    })
    .catch((error) => dispatch(fetchOwnerError(owner, errorDataMapper(error))));
};
