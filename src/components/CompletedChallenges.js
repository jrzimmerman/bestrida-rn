import React from 'react'

import {
  Text,
  View,
  StatusBar,
  StyleSheet
} from 'react-native'

const CompletedChallenges = () => (
  <View style={styles.container}>
    <StatusBar
      backgroundColor="black"
      barStyle="light-content"
    />
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
