import React from 'react'
import {
  Image,
  Linking,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import SafariView from 'react-native-safari-view'
import * as userActions from '../actions/user'

const background = require('../images/LoginBackground.png')
const loginButton = require('../images/LogInWithStrava@2x.png')

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.stravaOauth = this.stravaOauth.bind(this)
    this.handleOpenURL = this.handleOpenURL.bind(this)
  }

  componentDidMount () {
    Linking.addEventListener('url', this.handleOpenURL.bind(this))
  }

  handleOpenURL (event) {
    if (event.url) {
      const url = event.url
      var token = url.match('oauth_token=(.*)&userId')[1]
      var userId = url.match('&userId=(.*)')[1]
      SafariView.dismiss()
      this.props.dispatch(userActions.userLogin(token, userId))
    }
  }

  stravaOauth () {
    const url = [
      'https://www.strava.com/oauth/authorize',
      '?response_type=code',
      `&client_id=${9169}`,
      '&redirect_uri=http://bestrida.herokuapp.com/auth/strava/callback'
    ].join('')
    SafariView.show({
      url
    })
    Linking.addEventListener('url', this.handleOpenURL.bind(this))
  }

  render () {
    return (
      <Image style={styles.backgroundImage} source={background}>
        <StatusBar barStyle="default" />
        <Text style={styles.text}>Welcome to Bestrida</Text>
        <TouchableOpacity onPress={this.stravaOauth}>
          <Image style={styles.loginButton}source={loginButton} />
        </TouchableOpacity>
      </Image>
    )
  }
}

const { func } = React.PropTypes

Login.propTypes = {
  dispatch: func
}

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
    padding: 20,
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold'
  },
  loginButton: {
    marginTop: 20
  }
})

export default connect()(Login)
