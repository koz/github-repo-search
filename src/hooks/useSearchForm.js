import { useDispatch } from 'react-redux';
import { useRef, useCallback, useEffect } from 'react';
import debounce from 'lodash.debounce';
import { useHistory, useLocation } from 'react-router-dom';
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

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const queries = new URLSearchParams(useLocation().search);
  const query = queries.get('q');
  const page = queries.get('page') || '1';
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

    const isSameQuery = query === searchQuery;
    if (!repositories || !isSameQuery) {
      dispatch(getRepositories(query, page));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [query, page]);

  const debouncedDispatch = useRef(
    debounce((value) => {
      history.push({
        pathname: '/',
        search: value ? new URLSearchParams({ q: value }).toString() : null,
      });
    }, 300)
  ).current;

  return {
    handleChange: useCallback(
      (e) => {
        const { value } = e.target;
        debouncedDispatch(value);
      },
      [dispatch, debouncedDispatch]
    ),
    query,
    pagination,
    page,
    resultsCount,
    repositories: query ? repositories : null,
    responseTime,
    isLoading,
    error,
  };
};
