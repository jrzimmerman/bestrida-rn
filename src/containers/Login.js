import React from 'react'
import {
  Image,
  Linking,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet
} from 'react-native'
import SafariView from 'react-native-safari-view'

const background = require('../images/LoginBackground.png')
const loginButton = require('../images/LogInWithStrava@2x.png')

class Login extends React.Component {
  constructor () {
    super()
    this.state = {
      loggedIn: false
    }
    this.stravaOauth = this.stravaOauth.bind(this)
    this.handleOpenURL = this.handleOpenURL.bind(this)
  }

  componentDidMount () {
    console.log(Linking)
    Linking.addListener('url', this.handleOpenURL)
    console.log('Mounting Event Listener')
  }

  async handleOpenURL (event) {
    try {
      console.log('Linking Event: ', event)
      console.log('Linking URL: ', event.url)
    } catch (error) {
      console.log(error)
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

export default Login
