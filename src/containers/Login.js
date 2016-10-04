import React from 'react';
import {
  Image,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import SafariView from 'react-native-safari-view';
import Layout from './Layout';
import * as userActions from '../actions/user';


const background = require('../images/LoginBackground.png');
const loginButton = require('../images/btn_strava_connectwith_orange@2x.png');

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

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.stravaOauth = this.stravaOauth.bind(this);
    this.handleOpenURL = this.handleOpenURL.bind(this);
  }

  componentWillMount() {
    if (this.props.loggedIn) {
      this.props.navigator.push({ component: Layout, parentNavigator: this.props.navigator });
    }
  }

  componentDidMount() {
    Linking.addEventListener('url', this.handleOpenURL.bind(this));
  }

  handleOpenURL(event) {
    if (event.url) {
      const url = event.url;
      const token = url.match('oauth_token=(.*)&userId')[1];
      const userId = url.match('&userId=(.*)')[1];
      if (Platform.OS === 'ios') {
        SafariView.dismiss();
      }
      this.props.dispatch(userActions.userLogin(token, userId));
    }
  }

  stravaOauth() {
    const url = [
      'https://www.strava.com/oauth/authorize',
      '?response_type=code',
      `&client_id=${9169}`,
      '&redirect_uri=http://www.bestridaapp.com/auth/strava/callback'
    ].join('');
    if (Platform.OS === 'ios') {
      SafariView.show({
        url
      });
    } else {
      Linking.openURL(url);
    }
    Linking.addEventListener('url', this.handleOpenURL.bind(this));
  }

  render() {
    return (
      <Image style={styles.backgroundImage} source={background}>
        <StatusBar barStyle="default" />
        <Text style={styles.text}>Welcome to Bestrida</Text>
        <TouchableOpacity onPress={this.stravaOauth}>
          <Image style={styles.loginButton}source={loginButton} />
        </TouchableOpacity>
      </Image>
    );
  }
}

const { bool, func, object } = React.PropTypes;

Login.propTypes = {
  dispatch: func,
  navigator: object,
  loggedIn: bool
};

const mapStateToProps = (state) => ({
  loggedIn: state.user.loggedIn
});

export default connect(mapStateToProps)(Login);
