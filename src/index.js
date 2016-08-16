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
  }

  renderRoot (ComponentToRender) {
    return (
      <Provider store={store}>
        <ComponentToRender />
      </Provider>
    )
  }

  render () {
    const { loggedIn } = this.state
    return loggedIn ? this.renderRoot(Layout) : this.renderRoot(Login)
  }
}

export default Root
