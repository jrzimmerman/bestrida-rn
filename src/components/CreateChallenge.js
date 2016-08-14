import React from 'react'
import {
  Text,
  View,
  StatusBar,
  StyleSheet
} from 'react-native'

const CreateChallenge = () => (
  <View style={styles.container}>
    <StatusBar barStyle="light-content" />
    <Text>Create Challenge</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30
  }
})

export default CreateChallenge
