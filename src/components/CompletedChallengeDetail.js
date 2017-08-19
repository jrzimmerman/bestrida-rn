import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, StatusBar, Text, Dimensions } from 'react-native';
import SegmentMap from './SegmentMap';
import styles from '../styles/styles';
import completedStyles from '../styles/completedStyles';
import * as segmentActions from '../actions/segments';

// Use this function to convert seconds in human-readable time
function secondsToTime(secs) {
  const roundSecs = Math.round(secs);
  const hours = Math.floor(roundSecs / (60 * 60));

  const divisorForMinutes = roundSecs % (60 * 60);
  const minutes = Math.floor(divisorForMinutes / 60);

  const divisorForSeconds = divisorForMinutes % 60;
  const seconds = Math.ceil(divisorForSeconds);

  const hourString = hours < 10 ? `0${hours}` : `${hours}`;
  const minuteString = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const secondString = seconds < 10 ? `0${seconds}` : `${seconds}`;

  let resultTime;

  if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
    resultTime = '';
  } else {
    resultTime = `${hourString}:${minuteString}:${secondString}`;
  }
  return resultTime;
}

export class CompletedChallengeDetail extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const { challenge } = this.props.navigation.state.params;
    dispatch(segmentActions.getSegment(challenge.segment.id));
  }

  componentWillUnmount() {
    this.props.dispatch(segmentActions.clearSegment());
  }

  render() {
    const { segments } = this.props;
    const { challenge, userId } = this.props.navigation.state.params;
    const { height, width } = Dimensions.get('window');
    let segmentMap;
    if (segments && segments.segment && segments.segment.map) {
      segmentMap = (
        <View style={styles.challengeMapView}>
          <SegmentMap
            height={height * 0.275}
            width={width * 0.9}
            map={segments.segment.map}
          />
        </View>
      );
    }

    let completedDetail;
    if (
      challenge.completedStatus === 'Challenge is still calculating.' ||
      challenge.completedStatus === 'Waiting for opponent.'
    ) {
      completedDetail = (
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <Text
            style={[completedStyles.completedTitleText, { marginBottom: 75 }]}
          >
            {challenge.completedStatus}
          </Text>
          {segmentMap}
        </View>
      );
    } else {
      completedDetail = (
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <View style={completedStyles.completedTitleView}>
            <Text style={completedStyles.completedTitleText}>
              {Number(userId) === challenge.winnerId ? 'You Won!' : 'You Lost!'}
            </Text>
            <Text style={completedStyles.completedSubTitleText}>
              {challenge.segment.name}
            </Text>
            <Text style={completedStyles.completedSubTitleText}>
              {`${(challenge.segment.distance / 1609.34).toFixed(2)} Miles`}
            </Text>
          </View>
          <View style={styles.challengeDetailView}>
            <View style={styles.detailRowView}>
              <Text style={completedStyles.completedDetailTitle}>
                {challenge.challenger.name}
              </Text>
              <Text style={completedStyles.completedDetailTitle}>
                {challenge.challengee.name}
              </Text>
            </View>
            <View style={styles.detailRowView}>
              <Text style={completedStyles.completedDetailText}>
                {secondsToTime(challenge.challenger.time)}
              </Text>
              <Text style={completedStyles.completedDetailTitle}>Time</Text>
              <Text style={completedStyles.completedDetailText}>
                {secondsToTime(challenge.challengee.time)}
              </Text>
            </View>
            <View style={styles.detailRowView}>
              <Text style={completedStyles.completedDetailText}>
                {challenge.challenger.averageHeartRate === 0
                  ? null
                  : challenge.challenger.averageHeartRate}
              </Text>
              <Text style={completedStyles.completedDetailTitle}>
                Average Heart Rate
              </Text>
              <Text style={completedStyles.completedDetailText}>
                {challenge.challengee.averageHeartRate === 0
                  ? null
                  : challenge.challengee.averageHeartRate}
              </Text>
            </View>
            <View style={styles.detailRowView}>
              <Text style={completedStyles.completedDetailText}>
                {challenge.challenger.maxHeartRate === 0
                  ? null
                  : challenge.challenger.maxHeartRate}
              </Text>
              <Text style={completedStyles.completedDetailTitle}>
                Max Heart Rate
              </Text>
              <Text style={completedStyles.completedDetailText}>
                {challenge.challengee.maxHeartRate === 0
                  ? null
                  : challenge.challengee.maxHeartRate}
              </Text>
            </View>
            <View style={styles.detailRowView}>
              <Text style={completedStyles.completedDetailText}>
                {challenge.challenger.averageCadence === 0
                  ? null
                  : challenge.challenger.averageCadence}
              </Text>
              <Text style={completedStyles.completedDetailTitle}>Cadence</Text>
              <Text style={completedStyles.completedDetailText}>
                {challenge.challengee.averageCadence === 0
                  ? null
                  : challenge.challengee.averageCadence}
              </Text>
            </View>
            <View style={styles.detailRowView}>
              <Text style={completedStyles.completedDetailText}>
                {challenge.challenger.averageWatts === 0
                  ? null
                  : challenge.challenger.averageWatts}
              </Text>
              <Text style={completedStyles.completedDetailTitle}>Watts</Text>
              <Text style={completedStyles.completedDetailText}>
                {challenge.challengeeAvgWatts === 0
                  ? null
                  : challenge.challengee.averageWatts}
              </Text>
            </View>
            <View style={styles.detailRowView}>
              <Text style={completedStyles.completedDetailTitle}>
                Completed On
              </Text>
              <Text style={completedStyles.completedDetailText}>
                {new Date(challenge.completed).toDateString()}
              </Text>
            </View>
          </View>
          {segmentMap}
        </View>
      );
    }
    return completedDetail;
  }
}

const { func, number, shape } = PropTypes;

CompletedChallengeDetail.propTypes = {
  dispatch: func,
  challenge: shape({}),
  userId: number,
  navigation: shape({}),
  segments: shape({})
};

const mapStateToProps = state => ({
  userId: state.user.auth.userId,
  segments: state.segments
});

export default connect(mapStateToProps)(CompletedChallengeDetail);
