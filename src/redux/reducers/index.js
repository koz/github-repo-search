import { combineReducers } from 'redux';
import repositories from './repositories';
import owners from './owners';
import readmeFiles from './readmeFiles';

export default combineReducers({
  repositories,
  owners,
  readmeFiles,
});
