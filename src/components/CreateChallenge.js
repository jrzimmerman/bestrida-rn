import React from 'react';
import PropTypes from 'prop-types';
import {
  DatePickerIOS,
  FlatList,
  Modal,
  Platform,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';
import fuzzy from 'fuzzy';
import styles from '../styles/styles';
import createStyles from '../styles/createStyles';
import * as challengeActions from '../actions/challenges';
import * as userActions from '../actions/user';

const newDate = new Date();

export class CreateChallenge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeZoneOffsetInHours: -1 * newDate.getTimezoneOffset() / 60,
      selectedOpponentText: '',
      selectedOpponent: null,
      selectedSegmentText: '',
      selectedSegment: null,
      selectedCompletionDate: newDate,
      showDateModal: false,
      showOpponentList: true,
      showSegmentList: true,
      createChallengeError: null,
      opponents: this.props.user.friends,
      segments: this.props.user.segments
    };

    this.handleOpponentPress = this.handleOpponentPress.bind(this);
    this.handleSegmentPress = this.handleSegmentPress.bind(this);
    this.handleSelectCompletionDate = this.handleSelectCompletionDate.bind(
      this
    );
    this.handleChangeOpponentText = this.handleChangeOpponentText.bind(this);
    this.handleChangeSegmentText = this.handleChangeSegmentText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleDateModal = this.toggleDateModal.bind(this);
    this.toggleSelectedOpponent = this.toggleSelectedOpponent.bind(this);
    this.toggleSelectedSegment = this.toggleSelectedSegment.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
  }

  componentWillMount() {
    const { dispatch, userId, user } = this.props;
    dispatch(userActions.getUser(userId));
    const sortedSegments = user.segments.sort((a, b) => b.count - a.count);
    const sortedFriends = user.friends.sort(
      (a, b) => b.challengeCount - a.challengeCount
    );
    this.setState({
      segments: sortedSegments,
      opponents: sortedFriends
    });
  }

  componentDidMount() {
    const { dispatch, userId, user } = this.props;
    dispatch(userActions.getUserSegmentsFromStrava(userId));
    dispatch(userActions.getUserFriendsFromStrava(userId));
    const sortedSegments = user.segments.sort((a, b) => b.count - a.count);
    const sortedFriends = user.friends.sort(
      (a, b) => b.challengeCount - a.challengeCount
    );
    this.setState({
      segments: sortedSegments,
      opponents: sortedFriends
    });
  }

  componentWillReceiveProps(nextProps) {
    const sortedSegments = nextProps.user.segments.sort(
      (a, b) => b.count - a.count
    );
    const sortedFriends = nextProps.user.friends.sort(
      (a, b) => b.challengeCount - a.challengeCount
    );
    this.setState({
      segments: sortedSegments,
      opponents: sortedFriends
    });
  }

  handleChangeOpponentText(text) {
    const results = fuzzy.filter(text, this.props.user.friends, {
      extract: item => item.fullName
    });
    const matches = results.map(item => item.original);
    const sortedMatches = matches.sort(
      (a, b) => b.challengeCount - a.challengeCount
    );
    this.setState({
      selectedOpponentText: text,
      opponents: sortedMatches,
      createChallengeError: null
    });
  }

  handleChangeSegmentText(text) {
    const results = fuzzy.filter(text, this.props.user.segments, {
      extract: item => item.name
    });
    const matches = results.map(item => item.original);
    const sortedMatches = matches.sort((a, b) => b.count - a.count);
    this.setState({
      selectedSegmentText: text,
      segments: sortedMatches,
      createChallengeError: null
    });
  }

  handleOpponentPress(opponent) {
    this.setState({
      selectedOpponent: opponent,
      showOpponentList: !this.state.showOpponentList,
      createChallengeError: null
    });
  }

  handleSegmentPress(segment) {
    this.setState({
      selectedSegment: segment,
      showSegmentList: !this.state.showSegmentList,
      createChallengeError: null
    });
  }

  handleSelectCompletionDate(date) {
    const d = moment(date);
    this.setState({
      selectedCompletionDate: d
    });
  }

  handleSubmit() {
    const { dispatch, userId, user } = this.props;
    const {
      selectedOpponent,
      selectedSegment,
      selectedCompletionDate
    } = this.state;
    if (!selectedOpponent || !selectedSegment || !selectedCompletionDate) {
      if (!selectedCompletionDate) {
        this.setState({
          createChallengeError: 'Please select a completion date'
        });
      } else if (!selectedOpponent && !selectedSegment) {
        this.setState({
          createChallengeError: 'Please select both an opponent and segment'
        });
      } else if (!selectedOpponent) {
        this.setState({
          createChallengeError: 'Please select an opponent'
        });
      } else if (!selectedSegment) {
        this.setState({
          createChallengeError: 'Please select a segment'
        });
      } else {
        this.setState({
          createChallengeError: 'Please select an opponent and segment'
        });
      }
    } else {
      dispatch(
        challengeActions.createChallenge(
          user,
          selectedOpponent,
          selectedSegment,
          selectedCompletionDate
        )
      );
      dispatch(challengeActions.pendingChallenges(userId));
      this.props.navigation.navigate('ChallengeFeed');
      this.setState({
        selectedOpponent: null,
        selectedSegment: null,
        selectedOpponentText: '',
        selectedSegmentText: '',
        selectedCompletionDate: moment(),
        showOpponentList: true,
        showSegmentList: true,
        createChallengeError: null,
        segments: this.props.user.segments,
        opponents: this.props.user.friends
      });
    }
  }

  toggleDateModal() {
    this.setState({
      showDateModal: !this.state.showDateModal
    });
  }

  toggleSelectedOpponent() {
    if (!this.state.showOpponentList) {
      this.setState({
        selectedOpponent: null,
        selectedOpponentText: '',
        opponents: this.props.user.friends
      });
    }
    this.setState({
      showOpponentList: !this.state.showOpponentList
    });
  }

  toggleSelectedSegment() {
    if (!this.state.showSegmentList) {
      this.setState({
        selectedSegment: null,
        selectedSegmentText: '',
        segments: this.props.user.segments
      });
    }
    this.setState({ showSegmentList: !this.state.showSegmentList });
  }

  handleDismiss() {
    this.setState({ createChallengeError: null });
  }

  render() {
    let errorView;
    if (this.state.createChallengeError) {
      errorView = (
        <View style={styles.errorView}>
          <TouchableOpacity
            onPress={this.handleDismiss}
            style={styles.createBannerButton}
          >
            <Text style={styles.bannerTitle}>Error Completing Challenge</Text>
            <Text style={styles.bannerText}>
              {this.state.createChallengeError}
            </Text>
            <Text style={styles.bannerText}>Tap to dismiss</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={createStyles.container}>
        <StatusBar barStyle="light-content" />
        {errorView}
        <View style={createStyles.createDetailView}>
          {this.state.showOpponentList ? (
            <View style={createStyles.selectorInputView}>
              <Text style={styles.text}>Opponent</Text>
              <TextInput
                value={this.state.selectedOpponentText}
                style={createStyles.selectorInput}
                onChangeText={text => this.handleChangeOpponentText(text)}
                placeholder={'Select Opponent'}
                placeholderTextColor={'#CCC'}
              />
              <FlatList
                autoCorrect={false}
                keyExtractor={item => item.id}
                data={this.state.opponents}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => this.handleOpponentPress(item)}
                    style={createStyles.row}
                  >
                    <Text style={styles.text}>{item.fullName}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          ) : (
            <View style={createStyles.selectorInputView}>
              <Text style={styles.text}>Opponent</Text>
              <TouchableOpacity
                style={createStyles.selectorButton}
                onPress={this.toggleSelectedOpponent}
              >
                <Text style={styles.text}>
                  {this.state.selectedOpponent.fullName}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {this.state.showSegmentList ? (
            <View style={createStyles.selectorInputView}>
              <Text style={styles.text}>Segment</Text>
              <TextInput
                autoCorrect={false}
                value={this.state.selectedSegmentText}
                style={createStyles.selectorInput}
                onChangeText={text => this.handleChangeSegmentText(text)}
                placeholder={'Select Segment'}
                placeholderTextColor={'#CCC'}
              />
              <FlatList
                keyExtractor={item => item.id}
                data={this.state.segments}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => this.handleSegmentPress(item)}
                    style={createStyles.row}
                  >
                    <Text style={styles.text}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          ) : (
            <View style={createStyles.selectorInputView}>
              <Text style={styles.text}>Segment</Text>
              <TouchableOpacity
                style={createStyles.selectorButton}
                onPress={this.toggleSelectedSegment}
              >
                <Text style={styles.text}>
                  {this.state.selectedSegment.name}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {Platform.OS === 'ios' ? (
            <View style={createStyles.selectorButtonView}>
              <Text style={styles.text}>Completion Date</Text>
              <View>
                <TouchableOpacity
                  style={createStyles.selectorButton}
                  onPress={this.toggleDateModal}
                >
                  <Text style={styles.text}>
                    {new Date(this.state.selectedCompletionDate).toDateString()}
                  </Text>
                </TouchableOpacity>
              </View>
              <Modal
                animationType={'slide'}
                transparent={true}
                visible={this.state.showDateModal}
                onRequestClose={this.toggleDateModal}
              >
                <View style={createStyles.datePickerView}>
                  <TouchableOpacity
                    style={createStyles.btnConfirm}
                    onPress={this.toggleDateModal}
                  >
                    <Text style={createStyles.btnText}>Set Date</Text>
                  </TouchableOpacity>
                  <DatePickerIOS
                    date={new Date(this.state.selectedCompletionDate)}
                    minimumDate={newDate}
                    mode={'date'}
                    timeZoneOffsetInMinutes={
                      this.state.timeZoneOffsetInHours * 60
                    }
                    onDateChange={date => this.handleSelectCompletionDate(date)}
                    style={createStyles.datePicker}
                  />
                </View>
              </Modal>
            </View>
          ) : (
            <View style={createStyles.selectorButtonView}>
              <Text style={styles.text}>Completion Date</Text>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  margin: 10,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <DatePicker
                  customStyles={{
                    dateTouch: {
                      flexDirection: 'row',
                      flex: 1
                    },
                    dateTouchBody: {
                      flexDirection: 'row',
                      flex: 1,
                      height: 42,
                      alignItems: 'center',
                      justifyContent: 'center'
                    },
                    dateInput: {
                      height: 42,
                      borderWidth: 1,
                      backgroundColor: '#383838',
                      borderColor: '#CCC',
                      alignItems: 'center',
                      justifyContent: 'center'
                    },
                    dateText: {
                      fontSize: 14,
                      color: '#CCC'
                    }
                  }}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    flex: 1
                  }}
                  date={moment(this.state.selectedCompletionDate).format()}
                  mode="date"
                  minDate={moment(newDate).format('YYYY-MM-DD')}
                  onDateChange={date => this.handleSelectCompletionDate(date)}
                />
              </View>
            </View>
          )}
        </View>
        <View style={createStyles.createButtonView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.handleSubmit()}
          >
            <Text style={styles.buttonText}>Create Challenge</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const { func, object, number } = PropTypes;

CreateChallenge.propTypes = {
  dispatch: func,
  userId: number,
  user: object,
  navigation: object
};

const mapStateToProps = state => ({
  userId: state.user.auth.userId,
  user: state.user.user
});

export default connect(mapStateToProps)(CreateChallenge);
