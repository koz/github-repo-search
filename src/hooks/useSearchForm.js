import { useDispatch } from 'react-redux';
import { useRef, useCallback, useEffect } from 'react';
import debounce from 'lodash.debounce';
import { useHistory, useLocation } from 'react-router-dom';
import { getRepositories } from '../redux/thunks';
import { usePaginationLinks } from '../redux/selectors';

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const queries = new URLSearchParams(useLocation().search);
  const query = queries.get('q');
  const page = queries.get('page') || '1';
  const pagination = usePaginationLinks();

  useEffect(() => {
    if (query) {
      dispatch(getRepositories(query, page));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [query, page]);

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
    value: query,
    pagination,
    page,
  };
};
