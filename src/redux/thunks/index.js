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
  fetchReadmeStart,
  fetchReadmeError,
  fetchReadmeSuccess,
} from '../actions/actionCreators';
import {
  getRepos,
  getRepo,
  getOwner as getOwnerAPI,
  getOwnerOrgs,
  getRepoContents,
  getFileTextContent,
} from '../../api';
import { repoDataMapper, errorDataMapper, ownerMapper, readmeContentsFilter } from '../utils';
import { FETCH_README_ERROR } from '../actions/actions';

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

export const getReadme = (owner, repo) => async (dispatch) => {
  await dispatch(fetchReadmeStart(owner, repo));
  const response = await getRepoContents(owner, repo)
    .then((data) => readmeContentsFilter(data)?.download_url)
    .catch((error) => errorDataMapper(error));
  if (!response || response.message) {
    return dispatch(fetchReadmeError(owner, repo, response || { code: 404, message: 'Not found' }));
  }
  return getFileTextContent(response)
    .then((data) => {
      dispatch(fetchReadmeSuccess(owner, repo, data));
    })
    .catch((error) => dispatch(fetchReadmeError(owner, repo, errorDataMapper(error))));
};
