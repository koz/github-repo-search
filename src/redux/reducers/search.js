import { FETCH_REPOSITORIES_START, FETCH_REPOSITORIES_ERROR, FETCH_REPOSITORIES_SUCCESS } from '../actions/actions';

export default (state = { items: new Map() }, { type, payload }) => {
  switch (type) {
    case FETCH_REPOSITORIES_START:
      return {
        ...state,
        items: new Map(),
        isLoading: true,
        query: payload.query,
      };
    case FETCH_REPOSITORIES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case FETCH_REPOSITORIES_SUCCESS: {
      const newItems = new Map(state.items);
      newItems.set(payload.page, payload.items);
      return {
        ...state,
        isLoading: false,
        items: newItems,
        totalCount: payload.totalCount,
        pagination: payload.pagination,
        responseTime: payload.responseTime,
      };
    }
    default:
      return state;
  }
};
