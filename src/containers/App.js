import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ConnectedLogin from './Login';
import ConnectedLayout from './Layout';

class App extends React.Component {
  render() {
    const { loggedIn } = this.props;
    return loggedIn ? <ConnectedLayout /> : <ConnectedLogin />;
  }
}

const { bool } = PropTypes;

App.propTypes = {
  loggedIn: bool
};

const mapStateToProps = state => ({
  loggedIn: state.user.auth.loggedIn
});

export default connect(mapStateToProps)(App);
