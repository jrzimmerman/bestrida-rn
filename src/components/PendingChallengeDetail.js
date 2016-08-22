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

class PendingChallengeDetail extends React.Component {
  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleCancel(challengeId) {
    console.log('cancel challenge:', challengeId);
    this.props.dispatch(challengeActions.declineChallenge(challengeId));
    this.props.navigator.pop();
  }

  render() {
    const { challenge, userId } = this.props;
    console.log('challenge: ', challenge);
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
                {`${challenge.segmentCity}, ${challenge.segmentState}`}
              </Text>
            </View>
            <View style={styles.detailRowView}>
              <Text style={styles.challengeDetailTitle}>Activity Type</Text>
              <Text style={styles.challengeDetailText}>{ challenge.segmentActivityType }</Text>
            </View>
            <View style={styles.detailRowView}>
              <Text style={styles.challengeDetailTitle}>Average Grade</Text>
              <Text style={styles.challengeDetailText}>{`${challenge.segmentAverageGrade} %`}</Text>
            </View>
            <View style={styles.detailRowView}>
              <Text style={styles.challengeDetailTitle}>Climb Category</Text>
              <Text style={styles.challengeDetailText}>
                {challenge.segmentClimbCategory || 'Not Available'}
              </Text>
            </View>
            <View style={styles.detailRowView}>
              <Text style={styles.challengeDetailTitle}>Elevation Gain</Text>
              <Text style={styles.challengeDetailText}>
                {`${challenge.segmentElevationGain} meters`}
              </Text>
            </View>
          </View>
          <View style={styles.challengeFooterView}>
            { challenge.challengeeId === userId ?
              <TouchableOpacity
              onPress={() => this.handleCancel(challenge._id)}
              style={styles.button}>
              <Text style={styles.buttonText}>Cancel Challenge</Text>
            </TouchableOpacity> : <Text style={styles.challengeDetailTitle}>Challenger</Text> }
          </View>
      </View>
    );
  }
}

const { func, number, object } = React.PropTypes;

PendingChallengeDetail.propTypes = {
  dispatch: func,
  challenge: object,
  userId: number,
  navigator: object
};

const mapStateToProps = (state) => ({
  userId: state.user.auth.userId
});

export default connect(mapStateToProps)(PendingChallengeDetail);
