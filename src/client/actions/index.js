import axios from 'axios';

// Action creator to fetch list of users.
export const FETCH_USERS = 'fetch_users';
export const fetchUsers = () => async (dispatch, getState, api) => {
  // const res = await axios.get('http://react-ssr-api.herokuapp.com/users/xss');
  // const res = await axios.get('http://react-ssr-api.herokuapp.com/users');

  const res = await api.get('/users');

  dispatch({
    type: FETCH_USERS,
    payload: res,
  });
};

// Action creator to fetch the current authentication status.
export const FETCH_CURRENT_USER = 'fetch_current_user';
export const fetchCurrentUser = () => async (dispatch, getState, api) => {
  const res = await api.get('/current_user');

  dispatch({
    type: FETCH_CURRENT_USER,
    payload: res,
  });
};

export const FETCH_ADMINS = 'fetch_admins';
export const fetchAdmins = () => async (dispatch, getState, api) => {
  const res = await api.get('/admins');

  dispatch({
    type: FETCH_ADMINS,
    payload: res,
  });
};
