import React from 'react'
import {
  Image,
  Text,
  TouchableHighlight,
  StatusBar,
  StyleSheet
} from 'react-native'

const background = require('../images/LoginBackground.png')
const loginButton = require('../images/LogInWithStrava@2x.png')

const Login = (props) => (
  <Image style={styles.backgroundImage} source={background}>
    <StatusBar barStyle="default" />
    <Text style={styles.text}>Welcome to Bestrida</Text>
    <TouchableHighlight onPress={props.handleLogin}>
      <Image style={styles.loginButton}source={loginButton} />
    </TouchableHighlight>
  </Image>
)

const { func } = React.PropTypes

Login.propTypes = {
  handleLogin: func
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
    fontSize: 34,
    fontWeight: 'bold'
  },
  loginButton: {
    marginTop: 20
  }
})

export default Login
