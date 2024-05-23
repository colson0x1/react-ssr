// This file is going to house a function that will simply render our React
// app and return it as a string

import React from 'react';
import { renderToString } from 'react-dom/server';
// No need to import Home component because Home Component is rendered by the
// Routes Component
import { StaticRouter } from 'react-router-dom';
import Routes from '../client/Routes';

export default (req) => {
  const content = renderToString(
    <StaticRouter location={req.path} context={{}}>
      <Routes />
    </StaticRouter>,
  );

  return `
    <html>
      <head></head>
      <body>
        <div id='root'>${content}</div>
        <script src='bundle.js'></script>
      </body>
    </html>
  `;
};
