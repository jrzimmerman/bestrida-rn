import React from 'react';
import {
  View,
  StatusBar,
  Text
} from 'react-native';
import styles from './styles';

const ActiveChallengeDetail = () => (
  <View style={styles.container}>
    <StatusBar barStyle="light-content" />
      <View style={styles.challengeTitleView}>
        <Text style={styles.challengeTitleText}>Active Challenge Detail</Text>
      </View>
      <View style={styles.challengeDetailView}>
        <View style={styles.detailRowView}>
          <Text style={styles.challengeDetailTitle}>Distance</Text>
          <Text style={styles.challengeDetailText}>0.56 Miles</Text>
        </View>
        <View style={styles.detailRowView}>
          <Text style={styles.challengeDetailTitle}>Location</Text>
          <Text style={styles.challengeDetailText}>Fort Mill, South Carolina</Text>
        </View>
        <View style={styles.detailRowView}>
          <Text style={styles.challengeDetailTitle}>Activity Type</Text>
          <Text style={styles.challengeDetailText}>Ride</Text>
        </View>
        <View style={styles.detailRowView}>
          <Text style={styles.challengeDetailTitle}>Average Grade</Text>
          <Text style={styles.challengeDetailText}>3.4%</Text>
        </View>
        <View style={styles.detailRowView}>
          <Text style={styles.challengeDetailTitle}>Climb Category</Text>
          <Text style={styles.challengeDetailText}>3</Text>
        </View>
        <View style={styles.detailRowView}>
          <Text style={styles.challengeDetailTitle}>Elevation Gain</Text>
          <Text style={styles.challengeDetailText}>345 meters</Text>
        </View>
      </View>
      <View style={[{ flex: 0.2 }]}></View>
  </View>
);

export default ActiveChallengeDetail;
