import React from 'react'
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

const CreateChallenge = () => (
  <View style={styles.container}>
    <StatusBar barStyle="light-content" />
    <Text style={styles.text}>Create Challenge</Text>
    <TouchableOpacity style={styles.button} onPress={this.handleCreate}>
      <Text style={styles.buttonText}>Create Challenge</Text>
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 80,
    backgroundColor: '#2B2B2B'
  },
  text: {
    flexDirection: 'row',
    color: '#CCC'
  },
  button: {
    alignSelf: 'stretch',
    justifyContent: 'space-around',
    flexDirection: 'row',
    margin: 10,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 4,
    height: 45,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ef473a'
  },
  buttonText: {
    flexDirection: 'row',
    alignSelf: 'center',
    color: '#ef473a'
  }
})

export default CreateChallenge
