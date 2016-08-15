import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import Login from './containers/Login'
import Layout from './containers/Layout'
import { Linking } from 'react-native'
import SafariView from 'react-native-safari-view'

class Root extends React.Component {
  constructor () {
    super()
    this.state = {
      loggedIn: false
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.stravaOauth = this.stravaOauth.bind(this)
    this.handleOpenURL = this.handleOpenURL.bind(this)
  }

  componentDidMount () {
    Linking.addEventListener('url', this.handleOpenURL)
    console.log('Mounting Event Listener')
  }

  componentWillUnmount () {
    Linking.removeEventListener('url', this._handleOpenURL)
    console.log('Unmounting Event Listener')
  }

  handleOpenURL (event) {
    console.log('Linking Event: ', event)
    console.log('Linking URL: ', event.url)
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
  handleLogin () {
    this.stravaOauth()
    // this.setState({ loggedIn: !this.state.loggedIn })
  }

  renderRoot (ComponentToRender) {
    return (
      <Provider store={store}>
        <ComponentToRender handleLogin={this.stravaOauth} />
      </Provider>
    )
  }

  render () {
    const { loggedIn } = this.state
    return loggedIn ? this.renderRoot(Layout) : this.renderRoot(Login)
  }
}

export default Root
