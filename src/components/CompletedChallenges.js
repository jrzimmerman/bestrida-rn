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
import CompletedChallengeDetail from './CompletedChallengeDetail';
import * as challengeActions from '../actions/challenges';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => (r1 !== r2) });
const stravaProfilePic = require('../images/strava_profile_pic.png');

class CompletedChallenges extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: ds.cloneWithRows(this.props.completed.challenges),
      refreshing: false
    };
    this.handlePress = this.handlePress.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(challengeActions.completedChallenges(this.props.userId));
    this.setState({
      dataSource: ds.cloneWithRows(this.props.completed.challenges)
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: ds.cloneWithRows(nextProps.completed.challenges)
    });
  }

  handlePress(challenge) {
    const { navigator, userId } = this.props;
    navigator.push({
      component: CompletedChallengeDetail,
      passProps: { challenge, userId }
    });
  }

  handleRefresh() {
    const { dispatch, completed, userId } = this.props;
    this.setState({ refreshing: true });
    dispatch(challengeActions.completedChallenges(userId));
    this.setState({
      dataSource: ds.cloneWithRows(completed.challenges),
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
                  source={
                    rowData.opponentPhoto === 'stravaProfilePic' ?
                    stravaProfilePic : rowData.opponentPhoto
                  }
                />
              </View>
              <View style={styles.challengeDetail}>
                <Text style={styles.challengeText}>Opponent: {rowData.opponentName}</Text>
                <Text style={styles.challengeText}>Segment: {rowData.segmentName}</Text>
                <Text style={styles.challengeText}>{rowData.completedStatus}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const { array, bool, func, object, shape, number } = React.PropTypes;

CompletedChallenges.propTypes = {
  dispatch: func,
  navigator: object,
  userId: number,
  completed: shape({
    loading: bool,
    challenges: array,
    error: object
  })
};

const mapStateToProps = (state) => ({
  userId: state.user.auth.userId,
  completed: state.challenges.completed
});

export default connect(mapStateToProps)(CompletedChallenges);
