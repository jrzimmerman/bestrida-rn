import React from 'react';
import {
  Image,
  ListView,
  RefreshControl,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import ActiveChallengeDetail from './ActiveChallengeDetail';
import * as challengeActions from '../actions/challenges';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1._id !== r2._id });
const stravaProfilePic = require('../images/strava_profile_pic.png');

class ActiveChallenges extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: ds.cloneWithRows(this.props.active.challenges),
      refreshing: false
    };
    this.handlePress = this.handlePress.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(challengeActions.activeChallenges(this.props.userId));
    this.setState({
      dataSource: ds.cloneWithRows(this.props.active.challenges)
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: ds.cloneWithRows(nextProps.active.challenges)
    });
  }

  handlePress(challenge) {
    this.props.navigator.push({
      component: ActiveChallengeDetail,
      passProps: { challenge, navigator: this.props.navigator }
    });
  }

  handleRefresh() {
    this.setState({ refreshing: true });
    this.props.dispatch(challengeActions.activeChallenges(this.props.userId));
    this.setState({
      dataSource: ds.cloneWithRows(this.props.active.challenges),
      refreshing: false
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ListView
          enableEmptySections={true}
          style={styles.list}
          dataSource={this.state.dataSource}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}
            />
          }
          renderRow={(rowData) => (
            <TouchableOpacity onPress={() => this.handlePress(rowData)} style={styles.row}>
              <View style={styles.challengeImageView}>
                <Image
                  style={styles.challengeImage}
                  source={rowData.opponentPhoto === 'stravaProfilePic' ? stravaProfilePic : rowData.opponentPhoto }
                />
              </View>
              <View style={styles.challengeDetail}>
                <Text style={styles.challengeText}>Opponent: {rowData.opponentName}</Text>
                <Text style={styles.challengeText}>Segment: {rowData.segmentName}</Text>
                <Text style={styles.challengeText}>
                  Complete By: {new Date(rowData.expires).toDateString()}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const { array, bool, func, object, shape, number } = React.PropTypes;

ActiveChallenges.propTypes = {
  dispatch: func,
  navigator: object,
  userId: number,
  active: shape({
    loading: bool,
    challenges: array,
    error: object
  })
};

const mapStateToProps = (state) => ({
  userId: state.user.auth.userId,
  active: state.challenges.active
});

export default connect(mapStateToProps)(ActiveChallenges);
