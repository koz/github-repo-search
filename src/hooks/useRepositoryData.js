import { useDispatch } from 'react-redux';
import { useRepository, useOwner } from '../redux/selectors';
import { getRepository, getOwner } from '../redux/thunks';
import { useEffect } from 'react';

export default (owner, repo) => {
  const data = useRepository(owner, repo);
  const ownerData = useOwner(owner);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!data) {
      dispatch(getRepository(owner, repo));
    }
  }, []);

  useEffect(() => {
    if (!ownerData) {
      dispatch(getOwner(owner));
    }
  }, [owner]);

  return { repository: data, owner: ownerData };
};
