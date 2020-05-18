import { useDispatch } from 'react-redux';
import { useRef, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { getRepositories } from '../redux/thunks';

export default () => {
  const dispatch = useDispatch();
  const debouncedDispatch = useRef(
    debounce((value) => {
      if (value) {
        dispatch(getRepositories(value));
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
  };
};
