import React from 'react'
import {
  Text,
  View,
  ListView,
  StatusBar,
  StyleSheet
} from 'react-native'

class CompletedChallenges extends React.Component {
  constructor (props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows([
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
      ])
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text>Completed Challenges</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData}</Text>}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30
  }
})

export default CompletedChallenges
