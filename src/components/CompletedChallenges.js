import React from 'react'
import {
  Image,
  ListView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { styles } from './styles'

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
        <ListView
          style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => (
            <TouchableOpacity style={styles.row}>
              <View style={styles.challengeImageView}>
                <Image style={styles.challengeImage} source={require('../images/strava_profile_pic.png')} />
              </View>
              <View style={styles.challengeDetail}>
                <Text style={styles.challengeText}>Opponent: OPPONENT</Text>
                <Text style={styles.challengeText}>Segment: SEGMENT NAME</Text>
                <Text style={styles.challengeText}>You won this challenge!</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    )
  }
}

export default CompletedChallenges
