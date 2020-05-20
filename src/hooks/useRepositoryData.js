import { useDispatch } from 'react-redux';
import { useRepository } from '../redux/selectors';
import { getRepository } from '../redux/thunks';
import { useEffect } from 'react';

export default (owner, repo) => {
  const data = useRepository(owner, repo);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!data) {
      dispatch(getRepository(owner, repo));
    }
  }, []);

  return data;
};
