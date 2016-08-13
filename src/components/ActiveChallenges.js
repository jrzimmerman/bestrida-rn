import React from 'react'

import {
  Text,
  View,
  StyleSheet
} from 'react-native'

const ActiveChallenges = () => (
  <View style={styles.container}>
    <Text>Active Challenges</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default ActiveChallenges
