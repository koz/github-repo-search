import {
  FETCH_REPOSITORIES_START,
  FETCH_REPOSITORIES_ERROR,
  FETCH_REPOSITORIES_SUCCESS,
  FETCH_REPOSITORY_START,
  FETCH_REPOSITORY_ERROR,
  FETCH_REPOSITORY_SUCCESS,
} from '../actions/actions';

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
    case FETCH_REPOSITORY_START:
      return {
        ...state,
        isLoadingRepository: true,
      };
    case FETCH_REPOSITORY_ERROR:
      return {
        ...state,
        isLoadingRepository: false,
        repositoryError: action.payload,
      };
    case FETCH_REPOSITORY_SUCCESS:
      const repositories = state.repositories || {};
      if (!repositories.items) {
        repositories.items = new Map([[action.payload.fullName, action.payload]]);
      } else {
        repositories.items.set(action.payload.fullName, action.payload);
      }
      return {
        ...state,
        isLoadingRepository: false,
        repositories: repositories,
      };
    default:
      return state;
  }
};
