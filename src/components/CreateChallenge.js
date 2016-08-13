import React from 'react'

import {
  Text,
  View,
  StyleSheet
} from 'react-native'

const CreateChallenge = () => (
  <View style={styles.container}>
    <Text>Create Challenge</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default CreateChallenge
