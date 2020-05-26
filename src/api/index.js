import { requestHandler, fileRequestHandler, getQueryString } from './utils';

const API_URL = 'https://api.github.com';

export const getRepos = (keyword, page) => {
  const queries = {
    q: encodeURIComponent(keyword),
    page,
  };
  const qs = getQueryString(queries);
  const endpoint = `${API_URL}/search/repositories`;
  return fetch([endpoint, qs].filter(Boolean).join('?')).then(requestHandler);
};

export const getRepo = (owner, repo) => fetch(`${API_URL}/repos/${owner}/${repo}`).then(requestHandler);

export const getOwner = (owner) => fetch(`${API_URL}/users/${owner}`).then(requestHandler);

export const getOwnerOrgs = (owner) => fetch(`${API_URL}/users/${owner}/orgs`).then(requestHandler);

export const getRepoContents = (owner, repo) =>
  fetch(`${API_URL}/repos/${owner}/${repo}/contents`).then(requestHandler);

export const getFileTextContent = (url) => fetch(url).then(fileRequestHandler);
