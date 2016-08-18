import React from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Text
} from 'react-native';
import styles from './styles';

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
    fontSize: 14
  },
  completedDetailText: {
    flexDirection: 'column',
    alignSelf: 'center',
    color: '#CCC',
    fontSize: 12
  },
});

const CompletedChallengeDetail = () => (
  <View style={styles.container}>
    <StatusBar barStyle="light-content" />
    <View style={completedStyles.completedTitleView}>
      <Text style={[completedStyles.completedTitleText, { paddingTop: 80 }]}>You Won!</Text>
      <Text style={[completedStyles.completedTitleText, { fontSize: 18 }]}>Completed Challenge Name</Text>
      <Text style={[completedStyles.completedTitleText, { fontSize: 18 }]}>0.13 Miles</Text>
    </View>
    <View style={styles.challengeDetailView}>
      <View style={styles.detailRowView}>
        <Text style={[completedStyles.completedDetailTitle, { fontSize: 12 }]}>Justin Zimmerman</Text>
        <Text style={[completedStyles.completedDetailTitle, { fontSize: 12 }]}>Brianne Zimmerman</Text>
      </View>
      <View style={styles.detailRowView}>
        <Text style={completedStyles.completedDetailText}>00:00:32</Text>
        <Text style={completedStyles.completedDetailTitle}>Time</Text>
        <Text style={completedStyles.completedDetailText}>00:00:32</Text>
      </View>
      <View style={styles.detailRowView}>
        <Text style={completedStyles.completedDetailText}>167</Text>
        <Text style={completedStyles.completedDetailTitle}>Average Heart Rate</Text>
        <Text style={completedStyles.completedDetailText}>167</Text>
      </View>
      <View style={styles.detailRowView}>
        <Text style={completedStyles.completedDetailText}>192</Text>
        <Text style={completedStyles.completedDetailTitle}>Max Heart Rate</Text>
        <Text style={completedStyles.completedDetailText}>192</Text>
      </View>
      <View style={styles.detailRowView}>
        <Text style={completedStyles.completedDetailText}>76</Text>
        <Text style={completedStyles.completedDetailTitle}>Cadence</Text>
        <Text style={completedStyles.completedDetailText}>76</Text>
      </View>
      <View style={styles.detailRowView}>
        <Text style={completedStyles.completedDetailText}>450</Text>
        <Text style={completedStyles.completedDetailTitle}>Watts</Text>
        <Text style={completedStyles.completedDetailText}>450</Text>
      </View>
    </View>
    <View style={{ flex: 0.1 }}></View>
  </View>
);

export default CompletedChallengeDetail;
