import React from 'react'

import {
  Text,
  View,
  StatusBar,
  StyleSheet
} from 'react-native'

const Settings = () => (
  <View style={styles.container}>
    <StatusBar
      backgroundColor="black"
      barStyle="light-content"
    />
    <Text>Settings</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Settings
