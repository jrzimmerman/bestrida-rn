import React from 'react';
import {
  Image,
  ListView,
  RefreshControl,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import ActiveChallengeDetail from './ActiveChallengeDetail';

const stravaProfilePic = require('../images/strava_profile_pic.png');
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class ActiveChallenges extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: ds.cloneWithRows(this.props.pending.challenges),
      refreshing: false
    };
    this.handlePress = this.handlePress.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(challengeActions.activeChallenges(this.props.userId));
    this.setState({
      dataSource: ds.cloneWithRows(this.props.pending.challenges)
    });
  }

  handlePress(challenge) {
    this.props.navigator.push({ component: ActiveChallengeDetail, passProps: { challenge } });
  }

  handleRefresh() {
    this.setState({ refreshing: true });
    this.props.dispatch(challengeActions.pendingChallenges(this.props.userId));
    this.setState({
      dataSource: ds.cloneWithRows(this.props.pending.challenges),
      refreshing: false
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ListView
          contentInset={{ bottom: 55 }}
          automaticallyAdjustContentInsets={false}
          enableEmptySections={true}
          style={feedStyles.list}
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
                  source={rowData.opponentPhoto === 'stravaProfilePic' ? stravaProfilePic : rowData.opponentPhoto }
                />
              </View>
              <View style={styles.challengeDetail}>
                <Text style={styles.challengeText}>Opponent: {rowData.opponentName}</Text>
                <Text style={styles.challengeText}>Segment: {rowData.segmentName}</Text>
                <Text style={styles.challengeText}>Complete By: {new Date(rowData.expires).toLocaleDateString('en-us', { month: 'short', day: 'numeric', year: 'numeric' })}</Text>
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
  pending: shape({
    loading: bool,
    challenges: array,
    error: object
  })
};

const mapStateToProps = (state) => ({
  userId: state.user.auth.userId,
  pending: state.challenges.pending
});

export default connect(mapStateToProps)(ActiveChallenges);
