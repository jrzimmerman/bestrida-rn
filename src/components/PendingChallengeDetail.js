import React from 'react';
import {
  View,
  StatusBar,
  Text,
  TouchableOpacity
} from 'react-native';
import styles from './styles';

const PendingChallengeDetail = () => (
  <View style={styles.container}>
    <StatusBar barStyle="light-content" />
      <View style={styles.challengeTitleView}>
        <Text style={styles.challengeTitleText}>Pending Challenge Detail</Text>
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
      <View style={styles.challengeCancelView}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Cancel Challenge</Text>
        </TouchableOpacity>
      </View>
  </View>
);

export default PendingChallengeDetail;
