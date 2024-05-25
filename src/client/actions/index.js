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

// So now as long as we make all of our request from our action creator file
// i.e actions/index.js, as long as we make all of our requests that are
// expected to go to our API with this `api` argument right here, no matter
// whether we are on the client or the server, it will always somehow end up
// making the request to the actual API hosted at Heroku app.
//
// NOTE: If we ever end up wanting to make a request to some target that is not
// our API, we do have to import axios and use essentially a non configured
// version of Axios.
// i.e import axios from 'axios';
// So we would not want to try to use this `api` object here we're receiving.
// If we wanted to make a request to like some like Instagram API or something
// like that or Snapchat API.
// So this copy of Axios right here, this `api` instance is only for use with
// our API. If we want to access anything else, we use the original axios library!
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
