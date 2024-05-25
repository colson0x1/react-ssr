import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAdmins } from '../actions';

class AdminsListPage extends Component {
  componentDidMount() {
    this.props.fetchAdmins();
  }

  renderAdmins() {
    return this.props.admins.map((admin) => {
      return <li key={admin.id}>{admin.name}</li>;
    });
  }

  render() {
    return (
      <div>
        <h3 style={{ color: 'springgreen' }}>Protected list of admins</h3>
        <ul>{this.renderAdmins()}</ul>
      </div>
    );
  }
}

function mapStateToProps({ admins }) {
  return { admins };
}

export default {
  // We do want to call the action creator from within this component just in
  // case we ever have a user land on, say, our home route and then navigate
  // over inside of our application to the admins route. So we'll pass in our
  // fetchAdmins action creator
  component: connect(mapStateToProps, { fetchAdmins })(AdminsListPage),
  // We don't need receive the entire store. All we really care about is the
  // dispatch function here. With a dispath fn, we will call and pass in the
  // fetchAdmins action creator.
  loadData: ({ dispatch }) => dispatch(fetchAdmins()),
};
