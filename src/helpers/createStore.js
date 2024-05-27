/* @ Redux on SSR / Isomorphic App
 * Redux needs to be different configuration on Browser vs Server!
 * I architect application in a way to implement two different stores: one store
 * for the browser bundle and one store for the server bundle.
 */

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import reducers from '../client/reducers';

export default (req) => {
  const axiosInstance = axios.create({
    baseURL: 'http://react-ssr-api.herokuapp.com',
    headers: { cookie: req.get('cookie') || '' },
  });

  const store = createStore(
    reducers,
    {},
    applyMiddleware(thunk.withExtraArgument(axiosInstance)),
  );

  return store;
};
