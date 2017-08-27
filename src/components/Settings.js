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
const transparent = 'transparent';
const buttonBorder = '#ef473a';
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
    backgroundColor: transparent,
    borderWidth: 1,
    borderColor: buttonBorder
  }
});

export class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleDataReload = this.handleDataReload.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
  }

  handleLogout() {
    const { dispatch, navigation } = this.props;
    dispatch(userActions.userLogout());
    navigation.navigate('ChallengeFeed');
  }

  handleDataReload() {
    const { dispatch, userId } = this.props;
    dispatch(userActions.reloadUser(userId));
  }

  handleDismiss() {
    this.props.dispatch(userActions.userDismiss());
  }

  render() {
    const { userError, userReloaded } = this.props;
    let reloadView;
    if (userError) {
      reloadView = (
        <View style={styles.errorView}>
          <TouchableOpacity
            onPress={this.handleDismiss}
            style={styles.bannerButton}
          >
            <Text style={styles.bannerTitle}>Error Reloading Data</Text>
            <Text style={styles.bannerText}>
              Unable to reload data from Strava
            </Text>
            <Text style={styles.bannerText}>Tap to dismiss</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (userReloaded) {
      reloadView = (
        <View style={styles.successView}>
          <TouchableOpacity
            onPress={this.handleDismiss}
            style={styles.bannerButton}
          >
            <Text style={styles.bannerTitle}>Successfully Reloaded Data</Text>
            <Text style={styles.bannerText}>Reloaded data from Strava</Text>
            <Text style={styles.bannerText}>Tap to dismiss</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        {reloadView}
        <TouchableOpacity
          style={settingStyles.button}
          onPress={this.handleDataReload}
        >
          <Text style={styles.buttonText}>Reload Data</Text>
        </TouchableOpacity>
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

const { bool, func, object, number } = PropTypes;

Settings.propTypes = {
  dispatch: func,
  loggedIn: bool,
  navigation: object,
  userId: number,
  userReloaded: bool,
  userError: object
};

const mapStateToProps = state => ({
  userId: state.user.auth.userId,
  loggedIn: state.user.auth.loggedIn,
  userReloaded: state.user.userReloaded,
  userError: state.user.userError
});

export default connect(mapStateToProps)(Settings);
