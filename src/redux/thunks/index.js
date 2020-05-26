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
import { repoDataMapper, errorDataMapper, ownerMapper, readmeContentsFilter, linkHeaderParser } from '../utils';

export const getRepositories = (keyword, page) => async (dispatch) => {
  const requestInitTime = new Date().getTime();
  await dispatch(fetchRepositoriesStart(keyword));
  return getRepos(keyword, page)
    .then(({ data, headers }) => {
      const responseDate = new Date().getTime();
      const linkHeader = headers.get('link');
      const repositoriesMap = new Map();
      data.items.forEach((item) => {
        repositoriesMap.set(item.full_name, repoDataMapper(item));
      });
      const parsedData = {
        totalCount: data.total_count,
        items: repositoriesMap,
        pagination: linkHeader ? linkHeaderParser(linkHeader) : null,
        responseTime: responseDate - requestInitTime,
        page,
      };
      dispatch(fetchRepositoriesSuccess(parsedData));
    })
    .catch((error) => dispatch(fetchRepositoriesError(errorDataMapper(error))));
};

export const getRepository = (owner, repo) => async (dispatch) => {
  await dispatch(fetchRepositoryStart(owner, repo));
  return getRepo(owner, repo)
    .then(({ data }) => {
      dispatch(fetchRepositorySuccess(repoDataMapper(data)));
    })
    .catch((error) => dispatch(fetchRepositoryError(owner, repo, errorDataMapper(error))));
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
    .then(([{ data: ownerData }, { data: orgsData }]) => {
      dispatch(fetchOwnerSuccess(ownerMapper(ownerData, orgsData)));
    })
    .catch((error) => dispatch(fetchOwnerError(owner, errorDataMapper(error))));
};

export const getReadme = (owner, repo) => async (dispatch) => {
  await dispatch(fetchReadmeStart(owner, repo));
  const response = await getRepoContents(owner, repo)
    /* Disable eslint rule for API property */
    /* eslint-disable-next-line camelcase */
    .then(({ data }) => readmeContentsFilter(data)?.download_url)
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
