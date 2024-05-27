import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions';
import { Helmet } from 'react-helmet';

class UsersList extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  renderUsers() {
    return this.props.users.map((user) => {
      return <li key={user.id}>{user.name}</li>;
    });
  }

  // Now any time our application gets rendered on the server, Helmet will
  // inspect the tags that we pass to it and the Helmet library will kind of
  // internalize or store these two tags. So then inside of our helper
  // renderer.js file, we can import the Helmet library and extract those tags
  // out and shove them into our HTML template.
  // Note: React Helmet expects to see one single expression. But if we pass
  // content like this:
  // <title>{this.propr.users.length} Uses Loaded </title>
  // this content right there, gets converted into JSX, it's going to end up as
  // two separate expressions. It's one expressoin to pull out the length of
  // the user's length right there, and then a second for remaining string.
  // So essentially, React Helmet want to see one single string passed as a
  // content to the title tag. i.e We need to pass one single child to the
  // title tag. And if we don't we get this error:
  // Error: Helmet expects a string as a child of <title>!
  // So to fix that, we essentially just have to make use of an ES6 template
  // string inside of our curly braces.
  // <title>{`${this.props.users.length} Users Loaded`}</title>
  head() {
    return (
      <Helmet>
        <title>{`${this.props.users.length} Users Loaded`}</title>
        <meta property='og:title' content='Users App' />
      </Helmet>
    );
  }

  render() {
    return (
      <div>
        {this.head()}
        Big list of users:
        <ul>{this.renderUsers()}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { users: state.users };
}

function loadData(store) {
  // console.log('Trying to load some data...');
  // We're going to do a manual dispatch here and we're going to call the
  // fetchUsers action creator and pass the result into store.dispatch
  // So now fetchUsers will be called. It will make a network request to the
  // API and it's going to return a promise representing the network request
  // to make sure that the promise is created, gets send back to our index.js
  // file.
  // So the thing that actually calls loadData, we're going to return the result
  // of all of this stuff right here.
  return store.dispatch(fetchUsers());
}

// export { loadData };
export default {
  // We will assign the load data fn to a key of load data
  loadData,
  // And then, The component that is produced by the connect fn right here
  // will be assigned to a component key.
  component: connect(mapStateToProps, { fetchUsers })(UsersList),
};
