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
      const { id, error } = payload;
      newState.set(id, {
        ...(state.get(id) || {}),
        isLoading: false,
        error: error,
      });
      return newState;
    case FETCH_OWNER_SUCCESS:
      newState.set(payload.id, {
        ...(state.get(payload.id) || {}),
        ...payload,
        isLoading: false,
        hasLoaded: true,
      });
      return newState;
    default:
      return state;
  }
};
