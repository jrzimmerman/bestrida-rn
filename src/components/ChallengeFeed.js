import React from 'react';
import {
  Image,
  ListView,
  RefreshControl,
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
import * as navigationActions from '../actions/navigation';

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
  },
  challengeOptions: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch'
  },
  challengeOptionsDecline: {
    flex: 0.5,
    alignSelf: 'stretch',
    marginHorizontal: 5,
    borderRadius: 4,
    height: 25,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ef473a'
  },
  challengeOptionsDeclineText: {
    color: '#ef473a',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  challengeOptionsAccept: {
    flex: 0.5,
    alignSelf: 'stretch',
    marginHorizontal: 5,
    borderRadius: 4,
    height: 25,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#33cd5f'
  },
  challengeOptionsAcceptText: {
    color: '#33cd5f',
    alignSelf: 'center',
    justifyContent: 'center'
  }
});

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => (r1 !== r2) });

class ChallengeFeed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: ds.cloneWithRows(this.props.pending.challenges),
      refreshing: false
    };
    this.handleCreate = this.handleCreate.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleDecline = this.handleDecline.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(challengeActions.pendingChallenges(this.props.userId));
    this.setState({
      dataSource: ds.cloneWithRows(this.props.pending.challenges)
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: ds.cloneWithRows(nextProps.pending.challenges)
    });
  }

  handlePress(challenge) {
    this.props.navigator.push({ component: PendingChallengeDetail, passProps: { challenge, navigator: this.props.navigator } });
  }

  handleCreate() {
    this.props.dispatch(navigationActions.changeTab('createChallenge'));
  }

  handleAccept(challengeId, userId) {
    this.props.dispatch(challengeActions.acceptChallenge(challengeId, userId));
    this.props.dispatch(navigationActions.changeTab('activeChallenges'));
    this.setState({
      dataSource: ds.cloneWithRows(this.props.pending.challenges),
      refreshing: false
    });
  }

  handleDecline(challengeId, userId) {
    this.props.dispatch(challengeActions.declineChallenge(challengeId, userId));
    this.props.dispatch(challengeActions.pendingChallenges(this.props.userId));
    this.setState({
      dataSource: ds.cloneWithRows(this.props.pending.challenges),
      refreshing: false
    });
  }

  handleRefresh() {
    this.setState({ refreshing: true });
    this.props.dispatch(challengeActions.pendingChallenges(this.props.userId));
    this.setState({
      dataSource: ds.cloneWithRows(this.props.pending.challenges),
      refreshing: false
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={feedStyles.create}>
          <TouchableOpacity onPress={this.handleCreate} style={feedStyles.button}>
            <Text style={styles.buttonText}>Create Challenge</Text>
          </TouchableOpacity>
        </View>
        <View style={feedStyles.feed}>
          <ListView
            contentInset={{ bottom: 55 }}
            automaticallyAdjustContentInsets={false}
            enableEmptySections={true}
            style={feedStyles.list}
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
                  <Text style={styles.challengeText}>Complete By: {new Date(rowData.expires).toDateString()}</Text>
                  { rowData.challengeeId === this.props.userId ?
                    <View style={feedStyles.challengeOptions}>
                      <TouchableOpacity onPress={() => this.handleDecline(rowData._id, this.props.userId)} style={feedStyles.challengeOptionsDecline}>
                        <Text style={feedStyles.challengeOptionsDeclineText}>Decline</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => this.handleAccept(rowData._id, this.props.userId)} style={feedStyles.challengeOptionsAccept}>
                        <Text style={feedStyles.challengeOptionsAcceptText}>Accept</Text>
                      </TouchableOpacity>
                    </View>
                    : null }
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    );
  }
}

const { array, bool, func, object, shape, number } = React.PropTypes;

ChallengeFeed.propTypes = {
  dispatch: func,
  navigator: object,
  userId: number,
  pending: shape({
    loading: bool,
    challenges: array,
    error: object
  })
};

const mapStateToProps = (state) => ({
  userId: state.user.auth.userId,
  pending: state.challenges.pending
});

export default connect(mapStateToProps)(ChallengeFeed);
