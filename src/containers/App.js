import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

const App = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Bestrida</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
    padding: 40
  },
  text: {
    color: 'white',
    fontSize: 34,
    fontWeight: 'bold'
  }
})

export default App
