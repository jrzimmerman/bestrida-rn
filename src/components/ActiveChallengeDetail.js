import React from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import styles from '../styles/styles';
import * as challengeActions from '../actions/challenges';

export class ActiveChallengeDetail extends React.Component {
  constructor(props) {
    super(props);
    this.handleComplete = this.handleComplete.bind(this);
  }

  handleComplete(challengeId, userId) {
    const { dispatch, navigation } = this.props;
    dispatch(challengeActions.completeChallenge(challengeId, userId));
    dispatch(challengeActions.activeChallenges(userId));
    navigation.goBack();
  }

  render() {
    const { challenge, userId } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.challengeTitleView}>
          <Text style={styles.challengeTitleText}>{challenge.segmentName}</Text>
        </View>
        <View style={styles.challengeDetailView}>
          <View style={styles.detailRowView}>
            <Text style={styles.challengeDetailTitle}>Start Date</Text>
            <Text style={styles.challengeDetailText}>
              {new Date(challenge.created).toDateString()}
            </Text>
          </View>
          <View style={styles.detailRowView}>
            <Text style={styles.challengeDetailTitle}>End Date</Text>
            <Text style={styles.challengeDetailText}>
              {new Date(challenge.expires).toDateString()}
            </Text>
          </View>
          <View style={styles.detailRowView}>
            <Text style={styles.challengeDetailTitle}>Distance</Text>
            <Text style={styles.challengeDetailText}>
              {`${(challenge.segmentDistance / 1609.34).toFixed(2)} Miles`}
            </Text>
          </View>
          <View style={styles.detailRowView}>
            <Text style={styles.challengeDetailTitle}>Location</Text>
            <Text style={styles.challengeDetailText}>
              {`${challenge.segmentCity
                ? `${challenge.segmentCity},`
                : ''} ${challenge.segmentState}`}
            </Text>
          </View>
          <View style={styles.detailRowView}>
            <Text style={styles.challengeDetailTitle}>Activity Type</Text>
            <Text style={styles.challengeDetailText}>
              {challenge.segmentActivityType}
            </Text>
          </View>
          <View style={styles.detailRowView}>
            <Text style={styles.challengeDetailTitle}>Average Grade</Text>
            <Text style={styles.challengeDetailText}>
              {`${challenge.segmentAverageGrade} %`}
            </Text>
          </View>
          <View style={styles.detailRowView}>
            <Text style={styles.challengeDetailTitle}>Climb Category</Text>
            <Text style={styles.challengeDetailText}>
              {challenge.segmentClimbCategory || 'Not Available'}
            </Text>
          </View>
          <View style={styles.detailRowView}>
            <Text style={styles.challengeDetailTitle}>
              Elevation Gain
            </Text>
            <Text style={styles.challengeDetailText}>
              {`${challenge.segmentElevationGain} meters`}
            </Text>
          </View>
        </View>
        <View style={styles.challengeFooterView}>
          <TouchableOpacity
            onPress={() => this.handleComplete(challenge._id, userId)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Complete Challenge</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const { func, object, number } = PropTypes;

ActiveChallengeDetail.propTypes = {
  challenge: object,
  dispatch: func,
  navigation: object,
  userId: number
};

const mapStateToProps = state => ({
  userId: state.user.auth.userId
});

export default connect(mapStateToProps)(ActiveChallengeDetail);
