import { useSelector } from 'react-redux';

export const useTotalCount = () => useSelector((state) => state?.search?.totalCount);
export const useRepositories = (page) => useSelector((state) => state?.search?.items.get(page));
export const useRepository = (owner, repo) => useSelector((state) => state?.repositories?.get(`${owner}/${repo}`));
export const useOwner = (owner) => useSelector((state) => state?.owners?.get(owner));
export const useReadme = (owner, repo) => useSelector((state) => state?.readmeFiles?.get(`${owner}/${repo}`));
export const usePaginationLinks = () => useSelector((state) => state?.search?.pagination);
export const useSearchResponseTime = () => useSelector((state) => state?.search?.responseTime);
export const useSearchLoading = () => useSelector((state) => state?.search?.isLoading);
