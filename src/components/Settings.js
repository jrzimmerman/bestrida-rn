import React from 'react'
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { connect } from 'react-redux'
import { styles } from './styles'
import * as userActions from '../actions/user'

class Settings extends React.Component {
  constructor (props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout () {
    console.log('handleLogout')
    this.props.dispatch(userActions.userLogout)
  }

  render () {
    console.log('settings loggedIn: ', this.props.loggedIn)
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <TouchableOpacity style={settingStyles.button} onPress={this.handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const { bool, func } = React.PropTypes

Settings.propTypes = {
  dispatch: func,
  loggedIn: bool
}

const settingStyles = StyleSheet.create({
  button: {
    marginTop: 80,
    alignSelf: 'stretch',
    justifyContent: 'space-around',
    flexDirection: 'row',
    margin: 10,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 4,
    height: 45,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ef473a'
  }
})

const mapStateToProps = (state) => ({
  loggedIn: state.user.auth.loggedIn
})

export default connect(mapStateToProps)(Settings)
