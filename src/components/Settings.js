import React from 'react';
import PropTypes from 'prop-types';
import {
  PixelRatio,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';
import styles from '../styles/styles';
import * as userActions from '../actions/user';

const buttonHeight = PixelRatio.get() < 3 ? 40 : 45;
const settingStyles = StyleSheet.create({
  button: {
    marginTop: 20,
    alignSelf: 'stretch',
    justifyContent: 'space-around',
    flexDirection: 'row',
    margin: 10,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 4,
    height: buttonHeight,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ef473a'
  }
});

export class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.dispatch(userActions.userLogout());
    this.props.navigation.navigate('ChallengeFeed');
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <TouchableOpacity
          style={settingStyles.button}
          onPress={this.handleLogout}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const { bool, func, object } = PropTypes;

Settings.propTypes = {
  dispatch: func,
  loggedIn: bool,
  navigation: object
};

const mapStateToProps = state => ({
  loggedIn: state.user.auth.loggedIn
});

export default connect(mapStateToProps)(Settings);
