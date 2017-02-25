import React from 'react';
import {
  Image,
  Linking,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  WebView
} from 'react-native';
import { connect } from 'react-redux';
import Layout from './Layout';
import * as userActions from '../actions/user';


const background = require('../images/LoginBackground.png');
const loginButton = require('../images/btn_strava_connectwith_orange.png');

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: null,
    height: null,
    backgroundColor: 'transparent',
    resizeMode: 'stretch'
  },
  text: {
    paddingBottom: 20,
    color: 'white',
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

    this.stravaOauth = this.stravaOauth.bind(this);
    this.handleOpenURL = this.handleOpenURL.bind(this);
  }

  componentWillMount() {
    if (this.props.loggedIn) {
      console.log('logged in, navigating!');
      this.props.navigation.navigate('ChallengeFeed');
    }
  }

  handleOpenURL(event) {
    if (event.url && event.url.match('oauth_token=(.*)&userId') && event.url.match('&userId=(.*)')) {
      const url = event.url;
      const token = url.match('oauth_token=(.*)&userId')[1];
      console.log('token: ', token);
      const userId = url.match('&userId=(.*)')[1];
      console.log('userId: ', userId);
      this.props.dispatch(userActions.userLogin(token, userId));
      this.setState({
        showWebView: false
      });
      Linking.removeEventListener('url', this.handleOpenURL);
    }
  }

  stravaOauth() {
    Linking.addEventListener('url', this.handleOpenURL);
    this.setState({
      showWebView: true
    });
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
        <WebView
          source={{uri: url}}
          onNavigationStateChange={this.handleOpenURL}
        />
      );
    } else {
      view = (
        <Image style={styles.backgroundImage} source={background}>
          <StatusBar barStyle="default" />
          <Text style={styles.text}>Welcome to Bestrida</Text>
          <TouchableOpacity onPress={this.stravaOauth}>
            <Image style={styles.loginButton}source={loginButton} />
          </TouchableOpacity>
        </Image>
      );
    }
    return view;
  }
}

const { bool, func, object } = React.PropTypes;

Login.propTypes = {
  dispatch: func,
  navigation: object,
  loggedIn: bool
};

const mapStateToProps = (state) => ({
  loggedIn: state.user.loggedIn
});

export default connect(mapStateToProps)(Login);
