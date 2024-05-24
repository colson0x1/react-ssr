import axios from 'axios';

// Fetch list of users
export const FETCH_USERS = 'fetch_users';

export const fetchUsers = () => async (dispatch) => {
  // const res = await axios.get('http://react-ssr-api.herokuapp.com/users/xss');
  const res = await axios.get('http://react-ssr-api.herokuapp.com/users');

  dispatch({
    type: FETCH_USERS,
    payload: res,
  });
};
