import React from 'react'
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { styles } from './styles'

const CreateChallenge = () => (
  <View style={createStyles.container}>
    <StatusBar barStyle="light-content" />
    <Text style={styles.text}>Create Challenge</Text>
    <TouchableOpacity style={styles.button} onPress={this.handleCreate}>
      <Text style={styles.buttonText}>Create Challenge</Text>
    </TouchableOpacity>
  </View>
)

const createStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 80,
    backgroundColor: '#2B2B2B'
  }
})

export default CreateChallenge
