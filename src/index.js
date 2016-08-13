import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import Login from './containers/Login'
import Layout from './containers/Layout'

class Root extends React.Component {
  constructor () {
    super()
    this.state = {
      loggedIn: false
    }
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin () {
    this.setState({ loggedIn: !this.state.loggedIn })
  }

  renderRoot (ComponentToRender) {
    return (
      <Provider store={store}>
        <ComponentToRender handleLogin={this.handleLogin} />
      </Provider>
    )
  }

  render () {
    const { loggedIn } = this.state
    return loggedIn ? this.renderRoot(Layout) : this.renderRoot(Login)
  }
}

export default Root
