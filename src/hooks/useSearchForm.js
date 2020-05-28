import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getRepositories } from '../redux/thunks';
import {
  usePaginationLinks,
  useTotalCount,
  useRepositories,
  useSearchResponseTime,
  useSearchLoading,
  useSearchError,
  useSearchQuery,
} from '../redux/selectors';

export default ({ page, query }) => {
  const dispatch = useDispatch();
  const pagination = usePaginationLinks();
  const resultsCount = useTotalCount();
  const repositories = useRepositories(page);
  const responseTime = useSearchResponseTime();
  const isLoading = useSearchLoading();
  const error = useSearchError();
  const searchQuery = useSearchQuery();

  useEffect(() => {
    if (!query) {
      return;
    }

    if (!repositories || query !== searchQuery) {
      dispatch(getRepositories(query, page));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [query, page]);

  return {
    pagination,
    resultsCount,
    repositories: query ? repositories : null,
    responseTime,
    isLoading,
    error,
  };
};
