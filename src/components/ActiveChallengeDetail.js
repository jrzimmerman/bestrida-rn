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
      <Text style={[styles.text, { paddingTop: 80 }]}>Active Challenge Detail</Text>
  </View>
);

export default ActiveChallengeDetail;
