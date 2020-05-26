import {
  FETCH_REPOSITORIES_START,
  FETCH_REPOSITORIES_ERROR,
  FETCH_REPOSITORIES_SUCCESS,
  FETCH_REPOSITORY_START,
  FETCH_REPOSITORY_ERROR,
  FETCH_REPOSITORY_SUCCESS,
} from '../actions/actions';

export default (state = { items: new Map() }, { type, payload }) => {
  switch (type) {
    case FETCH_REPOSITORIES_START:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_REPOSITORIES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case FETCH_REPOSITORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: payload.items,
        totalCount: payload.totalCount,
        pagination: payload.pagination,
        responseTime: payload.responseTime,
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
        repositoryError: payload,
      };
    case FETCH_REPOSITORY_SUCCESS: {
      const items = new Map(state.items);
      items.set(payload.fullName, payload);
      return {
        ...state,
        isLoadingRepository: false,
        items,
      };
    }
    default:
      return state;
  }
};
