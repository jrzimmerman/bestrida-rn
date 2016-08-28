import React from 'react';
import {
  Image,
  ListView,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import ActiveChallengeDetail from './ActiveChallengeDetail';
import * as challengeActions from '../actions/challenges';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
const stravaProfilePic = require('../images/strava_profile_pic.png');

const activeStyles = StyleSheet.create({
  errorView: {
    alignSelf: 'stretch',
    backgroundColor: '#ef473a'
  },
  errorButton: {
    marginTop: 80,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 4,
    height: 45
  }
});

class ActiveChallenges extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: ds.cloneWithRows(this.props.active.challenges),
      refreshing: false
    };
    this.handlePress = this.handlePress.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(challengeActions.activeChallenges(this.props.userId));
    this.setState({
      dataSource: ds.cloneWithRows(this.props.active.challenges)
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: ds.cloneWithRows(nextProps.active.challenges)
    });
  }

  handlePress(challenge) {
    this.props.navigator.push({
      component: ActiveChallengeDetail,
      passProps: { challenge, navigator: this.props.navigator }
    });
  }

  handleRefresh() {
    this.setState({ refreshing: true });
    this.props.dispatch(challengeActions.activeChallenges(this.props.userId));
    this.setState({
      dataSource: ds.cloneWithRows(this.props.active.challenges),
      refreshing: false
    });
  }

  handleDismiss() {
    this.props.dispatch(challengeActions.clearCompleteError());
  }

  render() {
    let errorView;
    if (this.props.challenges.complete.error) {
      errorView = (
        <View style={activeStyles.errorView}>
          <TouchableOpacity onPress={this.handleDismiss} style={activeStyles.errorButton}>
            <Text
              style={{ color: 'white', alignSelf: 'center', fontSize: 16, fontWeight: 'bold' }}>
              Error Completing Challenge
            </Text>
            <Text style={{ color: 'white', alignSelf: 'center' }}> Effort not found on Strava</Text>
            <Text style={{ color: 'white', alignSelf: 'center' }}> Tap to dismiss </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        { errorView }
        <ListView
          enableEmptySections={true}
          style={styles.list}
          dataSource={this.state.dataSource}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}
            />
          }
          renderRow={(rowData) => (
            <TouchableOpacity onPress={() => this.handlePress(rowData)} style={styles.row}>
              <View style={styles.challengeImageView}>
                <Image
                  style={styles.challengeImage}
                  source={rowData.opponentPhoto === 'stravaProfilePic' ?
                  stravaProfilePic : rowData.opponentPhoto }
                />
              </View>
              <View style={styles.challengeDetail}>
                <Text style={styles.challengeText}>Opponent: {rowData.opponentName}</Text>
                <Text style={styles.challengeText}>Segment: {rowData.segmentName}</Text>
                <Text style={styles.challengeText}>
                  Complete By: {new Date(rowData.expires).toDateString()}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const { array, bool, func, object, shape, number } = React.PropTypes;

ActiveChallenges.propTypes = {
  dispatch: func,
  navigator: object,
  userId: number,
  active: shape({
    loading: bool,
    challenges: array,
    error: object
  }),
  challenges: object
};

const mapStateToProps = (state) => ({
  userId: state.user.auth.userId,
  active: state.challenges.active,
  challenges: state.challenges
});

export default connect(mapStateToProps)(ActiveChallenges);
