import React from 'react'
import {
  Text,
  View,
  ListView,
  StatusBar,
  StyleSheet
} from 'react-native'

class ActiveChallenges extends React.Component {
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
        <ListView
          style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => (
            <View style={styles.row}>
              <Text style={styles.text}>{rowData}</Text>
            </View>
          )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2B2B2B'
  },
  list: {
    alignSelf: 'stretch',
    marginTop: 5
  },
  row: {
    marginVertical: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 8,
    height: 120,
    backgroundColor: '#383838'
  },
  text: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
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

export default ActiveChallenges
