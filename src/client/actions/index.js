import axios from 'axios';

// Fetch list of users
export const FETCH_USERS = 'fetch_users';

// This fn gets automatically invoked by Redux Thunk. When Redux Thunk calls this
// function, it's now going to pass in three separate arguments. The first argument
// will be the dispatch function, the second argument will be the getState fn and
// the third is going to be this new little Axios instance that we passed in as
// third extra argument in client.js
// Now rathre than refer to it as `axiosInstance` here, which isn't like super
// clear what that really means, we're renaming this argument to simply be just
// `api` so that it'll be really clear that we can use this argument right here
// to get access to our API!
// So now whenever we make a request inside of our action creator, rather than
// using the base Axios library, we're going to use this customized Axios instance
// called api.
export const fetchUsers = () => async (dispatch, getState, api) => {
  // const res = await axios.get('http://react-ssr-api.herokuapp.com/users/xss');
  // const res = await axios.get('http://react-ssr-api.herokuapp.com/users');

  const res = await api.get('/user');

  dispatch({
    type: FETCH_USERS,
    payload: res,
  });
};
