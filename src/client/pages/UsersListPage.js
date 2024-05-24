import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions';

class UsersList extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  renderUsers() {
    return this.props.users.map((user) => {
      return <li key={user.id}>{user.name}</li>;
    });
  }

  render() {
    return (
      <div>
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