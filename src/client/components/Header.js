import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Now Header component should be receiving a prop of auth
const Header = ({ auth }) => {
  console.log('My auth status is', auth);

  return (
    <div>
      <Link to='/'>React SSR</Link>
    </div>
  );
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
