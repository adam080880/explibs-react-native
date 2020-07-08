import {combineReducers} from 'redux';
import auth from './auth';
import book from './book';
import transaction from './transaction';

export default combineReducers({
  auth,
  book,
  transaction,
});
