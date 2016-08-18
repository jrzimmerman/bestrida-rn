import React from 'react';
import {
  Image,
  ListView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import styles from './styles';
import ActiveChallengeDetail from './ActiveChallengeDetail';

const stravaProfilePic = require('../images/strava_profile_pic.png');

class ActiveChallenges extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
      ])
    };
    this.handlePress = this.handlePress.bind(this);
  }

  handlePress() {
    this.props.navigator.push({ component: ActiveChallengeDetail });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ListView
          style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => (
            <TouchableOpacity onPress={this.handlePress} style={styles.row}>
              <View style={styles.challengeImageView}>
                <Image
                  style={styles.challengeImage}
                  source={stravaProfilePic}
                />
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
    );
  }
}

export default ActiveChallenges;
