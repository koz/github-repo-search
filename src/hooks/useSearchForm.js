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

  useEffect(() => {
    if (query && !repositories) {
      dispatch(getRepositories(query, page));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [query, page, repositories]);

  const debouncedDispatch = useRef(
    debounce((value) => {
      if (value) {
        history.push({
          pathname: '/',
          search: new URLSearchParams({ q: value }).toString(),
        });
      }
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
    repositories,
    responseTime,
    isLoading,
    error,
  };
};
