import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import authReducer from './authReducer';
import adminsReducer from './adminsReducer';

export default combineReducers({
  users: usersReducer,
  auth: authReducer,
  // We'll sign up that reducer (i.e adminsReducer) to the `admins` piece of state
  admins: adminsReducer,
});
