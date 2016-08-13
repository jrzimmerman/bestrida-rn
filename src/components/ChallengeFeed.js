import React from 'react'

import {
  Text,
  View,
  StyleSheet
} from 'react-native'

const ChallengeFeed = () => (
  <View style={styles.container}>
    <Text>Challenge Feed</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default ChallengeFeed
