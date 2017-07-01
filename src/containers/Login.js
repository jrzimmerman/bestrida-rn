import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  WebView
} from 'react-native';
import SafariView from 'react-native-safari-view';
import { connect } from 'react-redux';
import * as userActions from '../actions/user';
import { API_URL } from '../constants/app';

const background = require('../images/LoginBackground.png');
const loginButton = require('../images/btn_strava_connectwith_orange.png');

const transparent = 'transparent';
const white = 'white';
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: null,
    height: null,
    backgroundColor: transparent,
    resizeMode: 'stretch'
  },
  text: {
    paddingBottom: 20,
    color: white,
    fontSize: 26,
    fontWeight: 'bold'
  },
  loginButton: {
    marginTop: 20
  }
});

export class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showWebView: false
    };
    this.handleOpenURL = this.handleOpenURL.bind(this);
  }

  componentWillMount() {
    if (this.props.loggedIn) {
      this.props.navigation.navigate('ChallengeFeed');
    }
    Linking.addEventListener('url', this.handleOpenURL);
  }

  componentWillUnMount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL(event) {
    const url = event.url;
    if (
      event.url &&
      url.match('oauth_token=(.*)&userId') &&
      url.match('&userId=(.*)')
    ) {
      const token = url.match('oauth_token=(.*)&userId')[1];
      const userId = url.match('&userId=(.*)')[1];
      if (Platform.OS === 'ios') {
        SafariView.dismiss();
      }
      this.props.dispatch(userActions.userLogin(token, userId));
    }
  }

  stravaOauth() {
    console.log('stravaOauth');
    const url = [
      'https://www.strava.com/oauth/authorize',
      '?response_type=code',
      `&client_id=${9169}`,
      `&redirect_uri=${API_URL}auth/strava/callback`
    ].join('');
    Linking.addEventListener('url', this.handleOpenURL);
    if (Platform.OS === 'ios') {
      SafariView.show({
        url: url
      });
    } else {
      this.setState({
        showWebView: true
      });
    }
  }

  render() {
    const { showWebView } = this.state;
    const url = [
      'https://www.strava.com/oauth/authorize',
      '?response_type=code',
      `&client_id=${9169}`,
      '&redirect_uri=http://www.bestridaapp.com/auth/strava/callback'
    ].join('');
    let view;
    if (showWebView) {
      view = (
        <WebView source={{ uri: url }} javaScriptEnabled domStorageEnabled />
      );
    } else {
      view = (
        <Image style={styles.backgroundImage} source={background}>
          <StatusBar barStyle="default" />
          <Text style={styles.text}>Welcome to Bestrida</Text>
          <TouchableOpacity onPress={this.stravaOauth.bind(this)}>
            <Image style={styles.loginButton} source={loginButton} />
          </TouchableOpacity>
        </Image>
      );
    }
    return view;
  }
}

const { bool, func, object } = PropTypes;

Login.propTypes = {
  dispatch: func,
  navigation: object,
  loggedIn: bool
};

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn
});

export default connect(mapStateToProps)(Login);
