import React from 'react'
import { connect } from 'react-redux'
import Login from './Login'
import Layout from './Layout'

class App extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { auth } = this.props
    return auth.loggedIn ? <Layout /> : <Login />
  }
}

const mapStateToProps = (state) => ({
  auth: state.user.auth
})

export default connect(mapStateToProps)(App)
