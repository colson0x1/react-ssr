import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAdmins } from '../actions';
import requireAuth from '../components/hocs/requireAuth';

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
  // Wrap AdminsListPage with requireAuth HOC!
  // So now we have the initial connect statement that's going to take some
  // props and try to pass it to this second argument here
  // i.e requireAuth(AdminsListPage)
  // So whatever props we get back from mapStateToProps right there or the
  // connect function to the requireAuth function.
  // {...this.props} in the requireAuth HOC will be the set of props that gets
  // passed to the HOC from this connect function here!
  component: connect(mapStateToProps, { fetchAdmins })(
    requireAuth(AdminsListPage),
  ),
  // We don't need receive the entire store. All we really care about is the
  // dispatch function here. With a dispath fn, we will call and pass in the
  // fetchAdmins action creator.
  loadData: ({ dispatch }) => dispatch(fetchAdmins()),
};
