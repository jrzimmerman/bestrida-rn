import React from 'react'
import { connect } from 'react-redux'
import Login from './Login'
import Layout from './Layout'

class App extends React.Component {
  render () {
    const { loggedIn } = this.props
    console.log('App: ', loggedIn)
    return loggedIn ? <Layout /> : <Login />
  }
}

const { bool } = React.PropTypes

App.propTypes = {
  loggedIn: bool
}

const mapStateToProps = (state) => ({
  loggedIn: state.user.auth.loggedIn
})

export default connect(mapStateToProps)(App)
