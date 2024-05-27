// ES2015 Modules syntax or the `import .. export` syntax

import React from 'react';

const Home = () => {
  return (
    <div className='center-align' style={{ marginTop: '200px' }}>
      <h3>Welcome</h3>
      <p>Check out these awesome features</p>
      {/* <button onClick={() => console.log('Hi there!')}>Press me!</button> */}
    </div>
  );
};

export default {
  component: Home,
};

/* @ Normal React Application
 * In a normal traditional React application, we would have a JavaScript file
 * that gets loaded into the browser and that then gets executed. The JS file
 * would render our JavaScript application, stick it into the DOM and then
 * attach any related event handlers that we set up inside of the code base.
 * So with the normal application, we ship down our entire JavaScript bundle
 * file to the browser and that renders the app and sets up event handlers
 * inside the browser.
 *
 * With this current setup, there's no JavaScript code being set down to the
 * users browser right now.
 * We make a request to the root route, the express server sends back the HTML
 * from that Home component and absolutely nothing else. There's no JS code
 * that is being loaded into the browser that sets up that event handler for us.
 * We could check that on the network log in response.
 * So in order to actually make sure that we get some JavaScript or have our
 * application work correctly, we need to make sure that we somehow ship down
 * all the JavaScript code related to our application after we ship down all
 * this HTML that gets some initial content on the screen.
 *
 * So right now in the Server Side world, we are taking care of step number one.
 * Step number one is getting HTML or getting content to show up on the screen.
 * Step number two is, however, is to make sure that we then load up our
 * React application and have the React application set up all the event handlers
 * and action creators and data loading requests and all that kind of stuff that
 * we normally want to have occur inside of our application.
 *
 * Solution to that Pain Point:
 * Create two JavaScript bundles using Webpack. One bundle is going to contain
 * all of our server side and client side code i.e our current setup
 * webpack.server.js AND now we create another bundle for React app which will
 * be shipped down to the users browser.
 * The reason we want to have two bundles is our Server Side bundle and the
 * Server Side code inside of it might contain sensitive information or sensitive
 * code. For example, it might contain some secret API keys or special logic
 * that could somehow be exploited. So there's going to be some amount of code on
 * our server that we never want to ship down to the browser.
 * So to implement this, we are going to set up a second Webpack pipeline that's
 * going to run right along side our current one.
 */

/*
import React from 'react';

const Home = () => {
  return (
    <div style={{ color: 'dodgerblue' }}>
      Home Component!!!
      <button onClick={() => console.log('Hi there!')}>Press me!</button>
    </div>
  );
};

export default Home;
*/
