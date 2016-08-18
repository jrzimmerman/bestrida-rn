import React from 'react';
import {
  View,
  StatusBar,
  Text
} from 'react-native';
import styles from './styles';

const PendingChallengeDetail = () => (
  <View style={styles.container}>
    <StatusBar barStyle="light-content" />
      <Text style={[styles.text, { paddingTop: 80 }]}>Pending Challenge Detail</Text>
  </View>
);

export default PendingChallengeDetail;
