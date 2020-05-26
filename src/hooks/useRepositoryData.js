import { useDispatch } from 'react-redux';
import { useRepository, useOwner, useReadme } from '../redux/selectors';
import { getRepository, getOwner, getReadme } from '../redux/thunks';
import { useEffect } from 'react';

export default (owner, repo) => {
  const data = useRepository(owner, repo);
  const ownerData = useOwner(owner);
  const readme = useReadme(owner, repo);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!data) {
      dispatch(getRepository(owner, repo));
    }
    if (!readme) {
      dispatch(getReadme(owner, repo));
    }
  }, []);

  useEffect(() => {
    if (!ownerData) {
      dispatch(getOwner(owner));
    }
  }, [owner]);

  return { repository: data, owner: ownerData, readme };
};
