import { useDispatch } from 'react-redux';
import { useRef, useCallback, useEffect } from 'react';
import debounce from 'lodash.debounce';
import { getRepositories } from '../redux/thunks';
import { useHistory, useLocation } from 'react-router-dom';
import { usePaginationLinks } from '../redux/selectors';

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const queries = new URLSearchParams(useLocation().search);
  const query = queries.get('q');
  const page = queries.get('page');
  const pagination = usePaginationLinks();

  useEffect(() => {
    if (query) {
      dispatch(getRepositories(query, page));
    }
  }, [query]);

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
        const value = e.target.value;
        debouncedDispatch(value);
      },
      [dispatch, debouncedDispatch]
    ),
    value: query,
    pagination,
  };
};
