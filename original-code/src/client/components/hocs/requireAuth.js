/* @ Higher Order Component (HOC) */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default (ChildComponent) => {
  class RequireAuth extends Component {
    render() {
      // this.props.auth is the value produced by our authReducer and there's
      // three possible values that it can return. It can return false, null and
      // it can also return an object representing the current user.
      // Now that object representing the current user is kind of hard to write
      // into a case statement. So instead we'll just make it the default case.
      switch (this.props.auth) {
        case false:
          // If the user is definitely not logged in, so if they are definitely
          // not authenticated, well, in this case, we need to make sure that we
          // kind of redirect the user to some other location inside of our
          // application, or at least get them away from the page they're trying
          // to access.
          return <Redirect to='/' />;
        case null:
          // If auth property is null here, that means we have not yet fetched
          // the user's authentication state.
          return <div>Loading...</div>;
        default:
          // Whenever we create a Higher Order Component, we need to make sure
          // that we take any of the props that were passed to the Higher Order
          // Component and pass them through to the Child Component as well.
          // `{...this.props}` will make sure that any props that are passed to
          // the HOC are forwarded on to the Child as well.
          return <ChildComponent {...this.props} />;
      }
    }
  }

  function mapStateToProps({ auth }) {
    return { auth };
  }

  return connect(mapStateToProps)(RequireAuth);
};
