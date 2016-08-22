import React from 'react';
import {
  View,
  StatusBar,
  Text,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import * as challengeActions from '../actions/challenges';
import * as navigationActions from '../actions/navigation';

class ActiveChallengeDetail extends React.Component {
  constructor(props) {
    super(props);
    this.handleComplete = this.handleComplete.bind(this);
  }

  handleComplete(challengeId) {
    console.log('complete challenge: ', challengeId);
    this.props.dispatch(navigationActions.changeTab('completedChallenges'));
    this.props.navigator.pop();
  }

  render() {
    const { challenge } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
          <View style={styles.challengeTitleView}>
            <Text style={styles.challengeTitleText}>{ challenge.segmentName }</Text>
          </View>
          <View style={styles.challengeDetailView}>
            <View style={styles.detailRowView}>
              <Text style={styles.challengeDetailTitle}>Distance</Text>
              <Text style={styles.challengeDetailText}>
                {`${(challenge.segmentDistance / 1609.34).toFixed(2)} Miles`}
              </Text>
            </View>
            <View style={styles.detailRowView}>
              <Text style={styles.challengeDetailTitle}>Location</Text>
              <Text style={styles.challengeDetailText}>
                {`${challenge.segmentCity ? challenge.segmentCity + ',' : ''} ${challenge.segmentState}`}
              </Text>
            </View>
            <View style={styles.detailRowView}>
              <Text style={styles.challengeDetailTitle}>Activity Type</Text>
              <Text style={styles.challengeDetailText}>{ challenge.segmentActivityType }</Text>
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
              onPress={() => this.handleComplete(this.props.challenge._id)}
              style={styles.button}>
              <Text style={styles.buttonText}>Complete Challenge</Text>
            </TouchableOpacity>
          </View>
      </View>
    );
  }
}

const { func, object } = React.PropTypes;

ActiveChallengeDetail.propTypes = {
  challenge: object,
  dispatch: func,
  navigator: object
};

export default connect()(ActiveChallengeDetail);
