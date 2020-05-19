import { useSelector } from 'react-redux';

export const useTotalCount = () => useSelector((state) => state?.repositories?.totalCount);
export const useRepositories = () => useSelector((state) => state?.repositories?.items);
export const useRepository = (owner, repo) =>
  useSelector((state) => state?.repositories?.items?.get(`${owner}/${repo}`) || null);
