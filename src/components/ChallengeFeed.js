import React from 'react'
import {
  Image,
  ListView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { styles } from './styles'

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
        <TouchableOpacity style={feedStyles.button}>
          <Text style={styles.buttonText}>Create Challenge</Text>
        </TouchableOpacity>
        <ListView
          style={feedStyles.list}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => (
            <TouchableOpacity style={styles.row}>
              <View style={styles.challengeImageView}>
                <Image style={styles.challengeImage} source={require('../images/strava_profile_pic.png')} />
              </View>
              <View style={styles.challengeDetail}>
                <Text style={styles.challengeText}>Opponent: OPPONENT</Text>
                <Text style={styles.challengeText}>Segment: SEGMENT NAME</Text>
                <Text style={styles.challengeText}>Complete By: DATE HERE</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    )
  }
}

const feedStyles = StyleSheet.create({
  list: {
    alignSelf: 'stretch',
    marginTop: -60
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
  }
})

export default ChallengeFeed
