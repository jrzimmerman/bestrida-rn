import React from 'react';
import {
  Image,
  ListView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import PendingChallengeDetail from './PendingChallengeDetail';
import * as challengeActions from '../actions/challenges';

const stravaProfilePic = require('../images/strava_profile_pic.png');

const feedStyles = StyleSheet.create({
  create: {
    flex: 0.2,
    alignSelf: 'stretch'
  },
  feed: {
    flex: 0.8,
    alignSelf: 'stretch'
  },
  list: {
    alignSelf: 'stretch'
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
});

class ChallengeFeed extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(this.props.pending.challenges)
    };
    this.pendingChallenges = this.pendingChallenges.bind(this);
    this.handlePress = this.handlePress.bind(this);
  }

  componentDidMount() {
    console.log(this.props.userId);
    this.props.dispatch(challengeActions.pendingChallenges(this.props.userId));
  }

  handlePress() {
    this.props.navigator.push({ component: PendingChallengeDetail });
  }

  async pendingChallenges(userId) {
    try {
      const response = await fetch(`https://bestrida.herokuapp.com/api/challenges/pending/${userId}`, {
        headers: {
          Accept: 'application/json'
        }
      });
      const responseJson = await response.json();
      console.log(responseJson);
      return responseJson;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={feedStyles.create}>
          <TouchableOpacity style={feedStyles.button}>
            <Text style={styles.buttonText}>Create Challenge</Text>
          </TouchableOpacity>
        </View>
        <View style={feedStyles.feed}>
          <ListView
            contentInset={{ bottom: 55 }}
            automaticallyAdjustContentInsets={false}
            style={feedStyles.list}
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
                  <Text style={styles.challengeText}>Opponent: {rowData.challengerName}</Text>
                  <Text style={styles.challengeText}>Segment: {rowData.segmentName}</Text>
                  <Text style={styles.challengeText}>Complete By: {rowData.expires}}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    );
  }
}
const { array, bool, string, object, shape } = React.PropTypes;

ChallengeFeed.propTypes = {
  navigator: object,
  userId: string,
  pending: shape({
    loading: bool,
    challenges: array,
    error: string
  })
};

const mapStateToProps = (state) => ({
  userId: state.user.auth.userId,
  pending: state.challenges.pending
});

export default connect(mapStateToProps)(ChallengeFeed);
