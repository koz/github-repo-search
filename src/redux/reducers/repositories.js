import { FETCH_REPOSITORY_START, FETCH_REPOSITORY_ERROR, FETCH_REPOSITORY_SUCCESS } from '../actions/actions';

export default (state = new Map(), { type, payload }) => {
  const newState = new Map([...state]);
  switch (type) {
    case FETCH_REPOSITORY_START:
      newState.set(payload.fullName, {
        isLoading: true,
      });
      return newState;
    case FETCH_REPOSITORY_ERROR:
      newState.set(payload.fullName, {
        isLoading: false,
        error: payload.error,
      });
      return newState;
    case FETCH_REPOSITORY_SUCCESS:
      newState.set(payload.fullName, {
        ...payload,
        isLoading: false,
      });
      return newState;
    default:
      return state;
  }
};
