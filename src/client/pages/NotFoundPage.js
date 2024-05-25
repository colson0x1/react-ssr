import React from 'react';

const NotFoundPage = () => {
  return <h1 style={{ color: 'orangered' }}>Oops, route not found.</h1>;
};

// Now this is a Page type component, so we're going to use that alternate
// export syntax where we export default an object that has a key of component
// and then a value od the component we just created!
export default {
  component: NotFoundPage,
};
