import React from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import * as navigationActions from '../actions/navigation';
import * as challengeActions from '../actions/challenges';

const pendingStyles = StyleSheet.create({
  challengeOptions: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch'
  },
  challengeOptionsDecline: {
    flex: 0.5,
    alignSelf: 'stretch',
    margin: 10,
    padding: 10,
    borderRadius: 4,
    height: 45,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ef473a'
  },
  challengeOptionsDeclineText: {
    color: '#ef473a',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  challengeOptionsAccept: {
    flex: 0.5,
    alignSelf: 'stretch',
    margin: 10,
    padding: 10,
    borderRadius: 4,
    height: 45,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#33cd5f'
  },
  challengeOptionsAcceptText: {
    color: '#33cd5f',
    alignSelf: 'center',
    justifyContent: 'center'
  }
});

class PendingChallengeDetail extends React.Component {
  constructor(props) {
    super(props);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleDecline = this.handleDecline.bind(this);
  }

  handleAccept(challengeId) {
    this.props.dispatch(challengeActions.acceptChallenge(challengeId));
    this.props.dispatch(challengeActions.pendingChallenges(this.props.userId));
    this.props.dispatch(navigationActions.changeTab('activeChallenges'));
    this.props.navigator.pop();
  }

  handleDecline(challengeId) {
    this.props.dispatch(challengeActions.declineChallenge(challengeId));
    this.props.dispatch(challengeActions.pendingChallenges(this.props.userId));
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
                {`${challenge.segmentCity ? challenge.segmentCity + ',' : ''} ${challenge.segmentState}`}
              </Text>
            </View>
            <View style={styles.detailRowView}>
              <Text style={styles.challengeDetailTitle}>Activity Type</Text>
              <Text style={styles.challengeDetailText}>{ challenge.segmentActivityType  || 'Not Available' }</Text>
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
              <View style={pendingStyles.challengeOptions}>
                <TouchableOpacity onPress={() => this.handleDecline(challenge._id)} style={pendingStyles.challengeOptionsDecline}>
                  <Text style={pendingStyles.challengeOptionsDeclineText}>Decline</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.handleAccept(challenge._id)} style={pendingStyles.challengeOptionsAccept}>
                  <Text style={pendingStyles.challengeOptionsAcceptText}>Accept</Text>
                </TouchableOpacity>
              </View> :
              <TouchableOpacity
                onPress={() => this.handleDecline(challenge._id)}
                style={styles.button}>
                <Text style={styles.buttonText}>Cancel Challenge</Text>
            </TouchableOpacity> }
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
