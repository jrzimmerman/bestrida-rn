import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import SegmentMap from './SegmentMap';
import styles from '../styles/styles';
import * as challengeActions from '../actions/challenges';
import * as segmentActions from '../actions/segments';

export class ActiveChallengeDetail extends React.Component {
  constructor(props) {
    super(props);
    this.handleComplete = this.handleComplete.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { challenge } = this.props.navigation.state.params;
    dispatch(segmentActions.getSegment(challenge.segmentId));
  }

  componentWillUnmount() {
    this.props.dispatch(segmentActions.clearSegment());
  }

  handleComplete(challengeId, userId) {
    const { dispatch, navigation } = this.props;
    dispatch(challengeActions.completeChallenge(challengeId, userId));
    dispatch(challengeActions.activeChallenges(userId));
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
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.challengeTitleView}>
          <Text style={styles.challengeTitleText}>
            {challenge.segmentName}
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
              {`${(challenge.segmentDistance / 1609.34).toFixed(2)} Miles`}
            </Text>
          </View>
          <View style={styles.detailRowView}>
            <Text style={styles.challengeDetailTitle}>Location</Text>
            <Text style={styles.challengeDetailText}>
              {`${challenge.segmentCity
                ? `${challenge.segmentCity},`
                : ''} ${challenge.segmentState}`}
            </Text>
          </View>
          <View style={styles.detailRowView}>
            <Text style={styles.challengeDetailTitle}>Activity Type</Text>
            <Text style={styles.challengeDetailText}>
              {challenge.segmentActivityType}
            </Text>
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
            <Text style={styles.challengeDetailTitle}>Elevation Gain</Text>
            <Text style={styles.challengeDetailText}>
              {`${challenge.segmentElevationGain} meters`}
            </Text>
          </View>
        </View>
        {segmentMap}
        <View style={styles.challengeFooterView}>
          <TouchableOpacity
            onPress={() => this.handleComplete(challenge._id, userId)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Complete Challenge</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const { func, number, shape } = PropTypes;

ActiveChallengeDetail.propTypes = {
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

export default connect(mapStateToProps)(ActiveChallengeDetail);
