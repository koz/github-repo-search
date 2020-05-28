import { useRef, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { pushSearch } from './utils';

export default () => {
  const history = useHistory();
  const queries = new URLSearchParams(useLocation().search);
  const query = queries.get('q');
  const page = queries.get('page') || '1';

  const handleChange = useRef(debounce(pushSearch(history), 300)).current;

  return {
    handleChange: useCallback(
      /* Not passing handleChange directly because of React syntethic event not preserving value for asynchronous callbacks (such as debounce) */
      ({ target: { value } }) => {
        handleChange(value);
      },
      [handleChange]
    ),
    query,
    page: Number(page),
  };
};
