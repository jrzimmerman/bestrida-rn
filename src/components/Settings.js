import React from 'react'
import {
  Text,
  View,
  StatusBar,
  StyleSheet
} from 'react-native'

const Settings = () => (
  <View style={styles.container}>
    <StatusBar barStyle="light-content" />
    <Text>Settings</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30
  }
})

export default Settings
