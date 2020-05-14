import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducers';
import thunkMiddleware from 'redux-thunk';

export default () => {
  const middlewares = applyMiddleware(thunkMiddleware);

  return createStore(reducer, null, composeWithDevTools(middlewares));
};
