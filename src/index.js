import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import Login from './containers/Login'

const Root = () => (
  <Provider store={store}>
    <Login />
  </Provider>
)

export default Root
