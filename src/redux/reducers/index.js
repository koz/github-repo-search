import { combineReducers } from 'redux';
import repositories from './repositories';
import owners from './owners';

export default combineReducers({
  repositories,
  owners,
});
