import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducers';
import thunkMiddleware from 'redux-thunk';

export default (initialState) => {
  const middlewares = applyMiddleware(thunkMiddleware);

  return createStore(reducer, initialState, composeWithDevTools(middlewares));
};
