import { FETCH_OWNER_START, FETCH_OWNER_ERROR, FETCH_OWNER_SUCCESS } from '../actions/actions';

export default (state = new Map(), { payload, type }) => {
  const newState = new Map(state);
  switch (type) {
    case FETCH_OWNER_START:
      newState.set(payload, {
        ...(state.get(payload) || {}),
        isLoading: true,
      });
      return newState;
    case FETCH_OWNER_ERROR:
      const { owner, error } = payload;
      newState.set(owner, {
        ...(state.get(owner) || {}),
        isLoading: false,
        error: error,
      });
      return newState;
    case FETCH_OWNER_SUCCESS:
      newState.set(payload.login, {
        ...(state.get(payload.login) || {}),
        ...payload,
        isLoading: false,
        hasLoaded: true,
      });
      return newState;
    default:
      return state;
  }
};
