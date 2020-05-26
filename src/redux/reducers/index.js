import { combineReducers } from 'redux';
import repositories from './repositories';
import owners from './owners';
import readmeFiles from './readmeFiles';
import search from './search';

export default combineReducers({
  repositories,
  owners,
  readmeFiles,
  search,
});
