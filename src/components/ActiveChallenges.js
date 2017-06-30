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
import * as challengeActions from '../actions/challenges';

const stravaProfilePic = require('../images/strava_profile_pic.png');

export class ActiveChallenges extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false
    };
    this.handlePress = this.handlePress.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
  }

  componentDidMount() {
    const { dispatch, userId } = this.props;
    dispatch(challengeActions.activeChallenges(userId));
  }

  handlePress(challenge) {
    this.props.navigation.navigate('ActiveChallengeDetail', {
      challenge: challenge,
      userId: this.props.userId
    });
  }

  handleRefresh() {
    this.setState({ refreshing: true });
    this.props.dispatch(challengeActions.activeChallenges(this.props.userId));
    this.setState({
      refreshing: false
    });
  }

  handleDismiss() {
    this.props.dispatch(challengeActions.clearCompleteError());
  }

  render() {
    let errorView;
    if (this.props.challenges.complete.error) {
      errorView = (
        <View style={styles.errorView}>
          <TouchableOpacity
            onPress={this.handleDismiss}
            style={styles.errorButton}
          >
            <Text style={styles.errorTitle}>
              Error Completing Challenge
            </Text>
            <Text style={styles.errorText}>
              Effort not found on Strava
            </Text>
            <Text style={styles.errorText}>
              Tap to dismiss
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        {errorView}
        <FlatList
          style={styles.list}
          data={this.props.active.challenges}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}
            />
          }
          keyExtractor={item => item._id}
          renderItem={({ item }) =>
            <TouchableOpacity
              key={item._id}
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
                  Segment: {item.segmentName}
                </Text>
                <Text
                  style={styles.challengeText}
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                >
                  Complete By: {new Date(item.expires).toDateString()}
                </Text>
              </View>
            </TouchableOpacity>}
        />
      </View>
    );
  }
}

const { array, bool, func, object, shape, number } = PropTypes;

ActiveChallenges.propTypes = {
  dispatch: func,
  navigation: object,
  userId: number,
  active: shape({
    loading: bool,
    challenges: array,
    error: object
  }),
  challenges: object
};

const mapStateToProps = state => ({
  userId: state.user.auth.userId,
  active: state.challenges.active,
  challenges: state.challenges
});

export default connect(mapStateToProps)(ActiveChallenges);
