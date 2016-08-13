import React from 'react'

import {
  Text,
  View,
  StyleSheet
} from 'react-native'

const CompletedChallenges = () => (
  <View style={styles.container}>
    <Text>Completed Challenges</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default CompletedChallenges
