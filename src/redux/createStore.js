import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';

export default (initialState) => {
  const middlewares = applyMiddleware(thunkMiddleware);

  return createStore(reducer, initialState, composeWithDevTools(middlewares));
};
