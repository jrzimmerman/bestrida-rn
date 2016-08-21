import React from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Text
} from 'react-native';
import styles from './styles';

// const stravaProfilePic = require('../images/strava_profile_pic.png');

const completedStyles = StyleSheet.create({
  completedTitleView: {
    flex: 0.3,
    alignSelf: 'stretch',
    justifyContent: 'space-around'
  },
  completedTitleText: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
    color: '#CCC',
    fontWeight: 'bold',
    fontSize: 24
  },
  completedDetailTitle: {
    flexDirection: 'column',
    alignSelf: 'center',
    color: '#CCC',
    fontWeight: 'bold',
    fontSize: 13
  },
  completedDetailText: {
    flexDirection: 'column',
    alignSelf: 'center',
    color: '#CCC',
    fontSize: 13
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    height: 80
  },
  completedImageView: {
    flex: 0.5,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignSelf: 'center'
  },
  completedImage: {
    height: 100,
    flexDirection: 'column',
    resizeMode: 'contain',
    alignSelf: 'center'
  },
});

// Use this function to convert seconds in human-readable time
function secondsToTime(secs) {
  const roundSecs = Math.round(secs);
  const hours = Math.floor(roundSecs / (60 * 60));

  const divisorForMinutes = roundSecs % (60 * 60);
  const minutes = Math.floor(divisorForMinutes / 60);

  const divisorForSeconds = divisorForMinutes % 60;
  const seconds = Math.ceil(divisorForSeconds);

  const hourString = hours < 10 ? '0' + (hours).toString() : (hours).toString();
  const minuteString = minutes < 10 ? '0' + (minutes).toString() : (minutes).toString();
  const secondString = seconds < 10 ? '0' + (seconds).toString() : (seconds).toString();

  return `${hourString}:${minuteString}:${secondString}`;
}

const CompletedChallengeDetail = (props) => {
  const { userId, challenge } = props;
  // let challengerPhoto;
  // let challengeePhoto;
  //
  // if (!challenge.challengerPhoto || challenge.challengerPhoto === 'avatar/athlete/large.png') {
  //   challengerPhoto = stravaProfilePic;
  // } else {
  //   challengerPhoto = { uri: challenge.challengerPhoto };
  // }
  // console.log('challengerPhoto: ', challengerPhoto);
  //
  // // set user photo to challengeePhoto
  // if (!challenge.challengeePhoto || challenge.challengeePhoto === 'avatar/athlete/large.png') {
  //   challengeePhoto = stravaProfilePic;
  // } else {
  //   challengeePhoto = { uri: challenge.challengeePhoto };
  // }
  // console.log('challengeePhoto: ', challengeePhoto);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={completedStyles.completedTitleView}>
        <Text
          style={[completedStyles.completedTitleText, { paddingTop: 80 }]}>
          { Number(userId) === challenge.winnerId ? 'You Won!' : 'You Lost!' }
        </Text>
        <Text
          style={[completedStyles.completedTitleText, { fontSize: 18 }]}>
          {challenge.segmentName}
        </Text>
        <Text
          style={[completedStyles.completedTitleText, { fontSize: 16 }]}>
          { `${(challenge.segmentDistance / 1609.34).toFixed(2)} Miles` }
        </Text>
      </View>
      <View style={[styles.challengeDetailView, { marginBottom: 75 }]}>
        <View style={styles.detailRowView}>
          <Text style={completedStyles.completedDetailTitle}>{challenge.challengerName}</Text>
          <Text style={completedStyles.completedDetailTitle}>{challenge.challengeeName}</Text>
        </View>
        <View style={styles.detailRowView}>
          <Text style={completedStyles.completedDetailText}>
            {secondsToTime(challenge.challengerTime)}
          </Text>
          <Text style={completedStyles.completedDetailTitle}>Time</Text>
          <Text style={completedStyles.completedDetailText}>
            {secondsToTime(challenge.challengeeTime)}
          </Text>
        </View>
        <View style={styles.detailRowView}>
          <Text style={completedStyles.completedDetailText}>
            {challenge.challengerAvgHeartrate === 0 ? null : challenge.challengerAvgHeartrate}
          </Text>
          <Text style={completedStyles.completedDetailTitle}>
            Average Heart Rate
          </Text>
          <Text style={completedStyles.completedDetailText}>
            {challenge.challengeeAvgHeartrate === 0 ? null : challenge.challengeeAvgHeartrate}
          </Text>
        </View>
        <View style={styles.detailRowView}>
          <Text style={completedStyles.completedDetailText}>
            {challenge.challengerMaxHeartRate === 0 ? null : challenge.challengerMaxHeartRate}
          </Text>
          <Text style={completedStyles.completedDetailTitle}>
            Max Heart Rate
          </Text>
          <Text style={completedStyles.completedDetailText}>
            {challenge.challengeeMaxHeartRate === 0 ? null : challenge.challengeeMaxHeartRate}
          </Text>
        </View>
        <View style={styles.detailRowView}>
          <Text style={completedStyles.completedDetailText}>
            {challenge.challengerAvgCadence === 0 ? null : challenge.challengerAvgCadence}
          </Text>
          <Text style={completedStyles.completedDetailTitle}>Cadence</Text>
          <Text style={completedStyles.completedDetailText}>
            {challenge.challengeeAvgCadence === 0 ? null : challenge.challengeeAvgCadence}
          </Text>
        </View>
        <View style={styles.detailRowView}>
          <Text style={completedStyles.completedDetailText}>
            {challenge.challengerAvgWatts === 0 ? null : challenge.challengerAvgWatts}
          </Text>
          <Text style={completedStyles.completedDetailTitle}>Watts</Text>
          <Text style={completedStyles.completedDetailText}>
            {challenge.challengeeAvgWatts === 0 ? null : challenge.challengeeAvgWatts}
          </Text>
        </View>
      </View>
    </View>
  );
};


const { number, object } = React.PropTypes;

CompletedChallengeDetail.propTypes = {
  userId: number,
  challenge: object
};

export default CompletedChallengeDetail;
