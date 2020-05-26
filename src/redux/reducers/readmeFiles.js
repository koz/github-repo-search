import { FETCH_README_START, FETCH_README_SUCCESS, FETCH_README_ERROR } from '../actions/actions';

export default (state = new Map(), { payload = {}, type }) => {
  const newState = new Map(state);
  const key = `${payload.owner}/${payload.repo}`;
  switch (type) {
    case FETCH_README_START:
      newState.set(key, { isLoading: true });
      return newState;
    case FETCH_README_SUCCESS:
      newState.set(key, { isLoading: false, content: payload.data });
      return newState;
    case FETCH_README_ERROR:
      newState.set(key, { isLoading: false, error: payload.error });
      return newState;
    default:
      return newState;
  }
};
