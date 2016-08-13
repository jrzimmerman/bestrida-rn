import React from 'react'
import {
  Image,
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native'

const background = require('../images/LoginBackground.png')
const loginButton = require('../images/LogInWithStrava@2x.png')

const Login = () => (
  <Image style={styles.backgroundImage} source={background}>
    <Text style={styles.text}>Welcome to Bestrida</Text>
    <TouchableHighlight>
      <Image style={styles.loginButton}source={loginButton} />
    </TouchableHighlight>
  </Image>
)

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
    fontSize: 34,
    fontWeight: 'bold'
  },
  loginButton: {
    marginTop: 20
  }
})

export default Login
