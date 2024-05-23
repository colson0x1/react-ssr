// This is a file that's going to be shared between both the client and the
// server side codebases.

import React from 'react';
import { Route } from 'react-router-dom';
import Home from './components/Home';

export default () => {
  return (
    <div>
      <Route exact path='/' component={Home} />
      <Route path='/sup' component={() => 'Sup'} />
    </div>
  );
};
