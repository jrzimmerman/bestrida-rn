import React from 'react'
import {
  Text,
  View,
  ListView,
  StatusBar,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

class ChallengeFeed extends React.Component {
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
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Create Challenge</Text>
        </TouchableOpacity>
        <ListView
          style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => (
            <TouchableOpacity style={styles.row}>
              <Text style={styles.text}>{rowData}</Text>
            </TouchableOpacity>
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
    marginTop: -60
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
    marginTop: 80,
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

export default ChallengeFeed
