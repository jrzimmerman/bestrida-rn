import React from 'react';
import {
  Dimensions,
  View,
  StatusBar,
  Text,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SegmentMap from './SegmentMap';
import styles from '../styles/styles';
import pendingStyles from '../styles/pendingStyles';
import * as challengeActions from '../actions/challenges';
import * as segmentActions from '../actions/segments';

export class PendingChallengeDetail extends React.Component {
  constructor(props) {
    super(props);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleDecline = this.handleDecline.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { challenge } = this.props.navigation.state.params;
    dispatch(segmentActions.getSegment(challenge.segment.id));
  }

  componentWillUnmount() {
    this.props.dispatch(segmentActions.clearSegment());
  }

  handleAccept(challengeId, userId) {
    const { dispatch, navigation } = this.props;
    dispatch(challengeActions.acceptChallenge(challengeId, userId));
    dispatch(challengeActions.pendingChallenges(userId));
    navigation.goBack();
  }

  handleDecline(challengeId, userId) {
    const { dispatch, navigation } = this.props;
    dispatch(challengeActions.declineChallenge(challengeId, userId));
    dispatch(challengeActions.pendingChallenges(userId));
    navigation.goBack();
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

    let challengeFooter;
    if (userId && challenge.challengee.id === userId) {
      challengeFooter = (
        <View style={pendingStyles.challengeOptions}>
          <TouchableOpacity
            onPress={() => this.handleDecline(challenge.id, userId)}
            style={pendingStyles.challengeOptionsDecline}
          >
            <Text style={pendingStyles.challengeOptionsDeclineText}>
              Decline
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.handleAccept(challenge.id, userId)}
            style={pendingStyles.challengeOptionsAccept}
          >
            <Text style={pendingStyles.challengeOptionsAcceptText}>Accept</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (userId && challenge.challenger.id === userId) {
      challengeFooter = (
        <TouchableOpacity
          onPress={() => this.handleDecline(challenge.id, userId)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Cancel Challenge</Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.challengeTitleView}>
          <Text style={styles.challengeTitleText}>
            {challenge.segment.name}
          </Text>
        </View>
        <View style={styles.challengeDetailView}>
          <View style={styles.detailRowView}>
            <Text style={styles.challengeDetailTitle}>Start Date</Text>
            <Text style={styles.challengeDetailText}>
              {new Date(challenge.created).toDateString()}
            </Text>
          </View>
          <View style={styles.detailRowView}>
            <Text style={styles.challengeDetailTitle}>End Date</Text>
            <Text style={styles.challengeDetailText}>
              {new Date(challenge.expires).toDateString()}
            </Text>
          </View>
          <View style={styles.detailRowView}>
            <Text style={styles.challengeDetailTitle}>Distance</Text>
            <Text style={styles.challengeDetailText}>
              {`${(challenge.segment.distance / 1609.34).toFixed(2)} Miles` ||
                '0'}
            </Text>
          </View>
          <View style={styles.detailRowView}>
            <Text style={styles.challengeDetailTitle}>Location</Text>
            <Text style={styles.challengeDetailText}>
              {`${challenge.segment.city
                ? `${challenge.segment.city},`
                : ''} ${challenge.segment.state}`}
            </Text>
          </View>
          <View style={styles.detailRowView}>
            <Text style={styles.challengeDetailTitle}>Activity Type</Text>
            <Text style={styles.challengeDetailText}>
              {challenge.segment.activityType || 'Not Available'}
            </Text>
          </View>
          <View style={styles.detailRowView}>
            <Text style={styles.challengeDetailTitle}>Average Grade</Text>
            <Text style={styles.challengeDetailText}>{`${challenge.segment
              .averageGrade} %`}</Text>
          </View>
          <View style={styles.detailRowView}>
            <Text style={styles.challengeDetailTitle}>Climb Category</Text>
            <Text style={styles.challengeDetailText}>
              {challenge.segment.climbCategory || 'Not Available'}
            </Text>
          </View>
          <View style={styles.detailRowView}>
            <Text style={styles.challengeDetailTitle}>Elevation Gain</Text>
            <Text style={styles.challengeDetailText}>
              {`${challenge.segment.totalElevationGain} meters`}
            </Text>
          </View>
        </View>
        {segmentMap}
        <View style={styles.challengeFooterView}>{challengeFooter}</View>
      </View>
    );
  }
}

const { func, number, shape } = PropTypes;

PendingChallengeDetail.propTypes = {
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

export default connect(mapStateToProps)(PendingChallengeDetail);
