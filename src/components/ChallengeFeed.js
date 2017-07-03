import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  FlatList,
  RefreshControl,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';
import styles from '../styles/styles';
import feedStyles from '../styles/feedStyles';
import * as challengeActions from '../actions/challenges';

const stravaProfilePic = require('../images/strava_profile_pic.png');

export class ChallengeFeed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false
    };
    this.handleCreate = this.handleCreate.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleDecline = this.handleDecline.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(challengeActions.pendingChallenges(this.props.userId));
  }

  handlePress(challenge) {
    this.props.navigation.navigate('PendingChallengeDetail', {
      challenge: challenge,
      userId: this.props.userId
    });
  }

  handleCreate() {
    this.props.navigation.navigate('CreateChallenge');
  }

  handleAccept(challengeId, userId) {
    this.props.dispatch(challengeActions.acceptChallenge(challengeId, userId));
    this.props.navigation.navigate('ActiveChallenges');
    this.props.dispatch(challengeActions.pendingChallenges(this.props.userId));
    this.setState({
      refreshing: false
    });
  }

  handleDecline(challengeId, userId) {
    this.props.dispatch(challengeActions.declineChallenge(challengeId, userId));
    this.props.dispatch(challengeActions.pendingChallenges(this.props.userId));
    this.setState({
      refreshing: false
    });
  }

  handleRefresh() {
    this.setState({ refreshing: true });
    this.props.dispatch(challengeActions.pendingChallenges(this.props.userId));
    this.setState({
      refreshing: false
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={feedStyles.create}>
          <TouchableOpacity
            onPress={this.handleCreate}
            style={feedStyles.button}
          >
            <Text style={styles.buttonText}>Create Challenge</Text>
          </TouchableOpacity>
        </View>
        <View style={feedStyles.feed}>
          <FlatList
            style={feedStyles.list}
            keyExtractor={item => item.id}
            data={this.props.pending.challenges}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefresh}
              />
            }
            renderItem={({ item }) =>
              <TouchableOpacity
                key={item.id}
                onPress={() => this.handlePress(item)}
                style={styles.row}
              >
                <View style={styles.challengeImageView}>
                  <Image
                    style={styles.challengeImage}
                    source={
                      item.opponentPhoto === 'stravaProfilePic'
                        ? stravaProfilePic
                        : item.opponentPhoto
                    }
                  />
                </View>
                <View style={styles.challengeDetail}>
                  <Text
                    style={styles.challengeText}
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                  >
                    Opponent: {item.opponentName}
                  </Text>
                  <Text
                    style={styles.challengeText}
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                  >
                    Segment: {item.segment.name}
                  </Text>
                  <Text
                    style={styles.challengeText}
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                  >
                    Complete By: {new Date(item.expires).toDateString()}
                  </Text>
                  {item.challengee.id === this.props.userId
                    ? <View style={feedStyles.challengeOptions}>
                        <TouchableOpacity
                          onPress={() =>
                            this.handleDecline(item.id, this.props.userId)}
                          style={feedStyles.challengeOptionsDecline}
                        >
                          <Text style={feedStyles.challengeOptionsDeclineText}>
                            Decline
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() =>
                            this.handleAccept(item.id, this.props.userId)}
                          style={feedStyles.challengeOptionsAccept}
                        >
                          <Text style={feedStyles.challengeOptionsAcceptText}>
                            Accept
                          </Text>
                        </TouchableOpacity>
                      </View>
                    : null}
                </View>
              </TouchableOpacity>}
          />
        </View>
      </View>
    );
  }
}

const { array, bool, func, object, shape, number } = PropTypes;

ChallengeFeed.propTypes = {
  dispatch: func,
  navigation: object,
  userId: number,
  pending: shape({
    loading: bool,
    challenges: array,
    error: object
  })
};

const mapStateToProps = state => ({
  userId: state.user.auth.userId,
  pending: state.challenges.pending
});

export default connect(mapStateToProps)(ChallengeFeed);
