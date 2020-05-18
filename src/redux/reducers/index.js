import { FETCH_REPOSITORIES_START, FETCH_REPOSITORIES_ERROR, FETCH_REPOSITORIES_SUCCESS } from '../actions/actions';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_REPOSITORIES_START:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_REPOSITORIES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case FETCH_REPOSITORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        repositories: action.payload,
      };
    default:
      return state;
  }
};
