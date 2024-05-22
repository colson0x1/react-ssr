// This is going to end up as being the route or the entry point of our client
// side code base.

// @ Startup point for the client side application

import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Home';

// Really important distinction here is that, When this code right here is
// executed on the browser side, there is already content inside of that div
// with id of `root`, all the content that we had already rendered into it
// from the server.
// So when we call ReactDOM.render(), we are not replacing all the HTML inside
// there. We are telling React to go back through and set up all those event
// handlers or all the necessary code that needs to be executed to kind of
// sort of bind to that existing structure that's on the page!

// This entire process of kind of putting functionality back into the DOM that
// was already rendered or all the HTML is already rendered, is reffered to as
// Hydration and if we look at that warning on the console, it actually makes
// mention of hydate. So the process of kind of rerendering over the once
// rendered HTML is reffered to as Hydration.
/* ReactDOM.render(<Home />, document.querySelector('#root')); */
// Resolve that warning with ReactDOM.hydate to rehydrate our application on the
// browser.
ReactDOM.hydrate(<Home />, document.querySelector('#root'));
