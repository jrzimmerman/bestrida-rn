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

export class CompletedChallenges extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false
    };
    this.handlePress = this.handlePress.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(
      challengeActions.completedChallenges(this.props.userId)
    );
  }

  handlePress(challenge) {
    const { navigation, userId } = this.props;
    navigation.navigate('CompletedChallengeDetail', {
      challenge: challenge,
      userId: userId
    });
  }

  handleRefresh() {
    const { dispatch, userId } = this.props;
    this.setState({ refreshing: true });
    dispatch(challengeActions.completedChallenges(userId));
    this.setState({
      refreshing: false
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <FlatList
          style={styles.list}
          keyExtractor={item => item.id}
          data={this.props.completed.challenges}
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
                  {item.completedStatus}
                </Text>
              </View>
            </TouchableOpacity>}
        />
      </View>
    );
  }
}

const { array, bool, func, object, shape, number } = PropTypes;

CompletedChallenges.propTypes = {
  dispatch: func,
  navigation: object,
  userId: number,
  completed: shape({
    loading: bool,
    challenges: array,
    error: object
  })
};

const mapStateToProps = state => ({
  userId: state.user.auth.userId,
  completed: state.challenges.completed
});

export default connect(mapStateToProps)(CompletedChallenges);
