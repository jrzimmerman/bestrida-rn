import React from 'react'

import {
  Text,
  View,
  StyleSheet
} from 'react-native'

const Settings = () => (
  <View style={styles.container}>
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
