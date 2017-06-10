import React from 'react';
import PropTypes from 'prop-types';
import {
  DatePickerIOS,
  ListView,
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

const opponentDS = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});
const segmentDS = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});
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
      segmentDataSource: segmentDS.cloneWithRows(this.props.user.segments),
      opponentDataSource: opponentDS.cloneWithRows(this.props.user.friends),
      showOpponentList: true,
      showSegmentList: true,
      createChallengeError: null
    };

    this.handleOpponentPress = this.handleOpponentPress.bind(this);
    this.handleSegmentPress = this.handleSegmentPress.bind(this);
    this.handleSelectCompletionDate = this.handleSelectCompletionDate.bind(
      this
    );
    this.handleChangeOpponentText = this.handleChangeOpponentText.bind(this);
    this.handleChangeSegmentText = this.handleChangeSegmentText.bind(this);
    this.handleSumbit = this.handleSumbit.bind(this);
    this.toggleDateModal = this.toggleDateModal.bind(this);
    this.toggleSelectedOpponent = this.toggleSelectedOpponent.bind(this);
    this.toggleSelectedSegment = this.toggleSelectedSegment.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(userActions.getUser(this.props.userId));
    this.setState({
      segmentDataSource: segmentDS.cloneWithRows(this.props.user.segments),
      opponentDataSource: opponentDS.cloneWithRows(this.props.user.friends)
    });
  }

  componentDidMount() {
    this.props.dispatch(userActions.getUserSegments(this.props.userId));
    this.props.dispatch(userActions.getUserFriends(this.props.userId));
    this.setState({
      segmentDataSource: segmentDS.cloneWithRows(this.props.user.segments),
      opponentDataSource: opponentDS.cloneWithRows(this.props.user.friends)
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      segmentDataSource: segmentDS.cloneWithRows(nextProps.user.segments),
      opponentDataSource: opponentDS.cloneWithRows(nextProps.user.friends)
    });
  }

  handleChangeOpponentText(text) {
    const results = fuzzy.filter(text, this.props.user.friends, {
      extract: item => item.fullName
    });
    const matches = results.map(item => item.original);
    this.setState({
      selectedOpponentText: text,
      opponentDataSource: opponentDS.cloneWithRows(matches),
      createChallengeError: null
    });
  }

  handleChangeSegmentText(text) {
    const results = fuzzy.filter(text, this.props.user.segments, {
      extract: item => item.name
    });
    const matches = results.map(item => item.original);
    this.setState({
      selectedSegmentText: text,
      segmentDataSource: segmentDS.cloneWithRows(matches),
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
    let d = moment(date);
    this.setState({ selectedCompletionDate: d });
  }

  handleSumbit() {
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
        this.setState({ createChallengeError: 'Please select an opponent' });
      } else if (!selectedSegment) {
        this.setState({ createChallengeError: 'Please select a segment' });
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
        segmentDataSource: segmentDS.cloneWithRows(this.props.user.segments),
        opponentDataSource: opponentDS.cloneWithRows(this.props.user.friends)
      });
    }
  }

  toggleDateModal() {
    this.setState({ showDateModal: !this.state.showDateModal });
  }

  toggleSelectedOpponent() {
    if (!this.state.showOpponentList) {
      this.setState({
        selectedOpponent: null,
        selectedOpponentText: '',
        pponentDataSource: opponentDS.cloneWithRows(this.props.user.friends)
      });
    }
    this.setState({ showOpponentList: !this.state.showOpponentList });
  }

  toggleSelectedSegment() {
    if (!this.state.showSegmentList) {
      this.setState({
        selectedSegment: null,
        selectedSegmentText: '',
        segmentDataSource: segmentDS.cloneWithRows(this.props.user.segments)
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
            style={styles.createErrorButton}
          >
            <Text style={styles.errorTitle}>
              Error Completing Challenge
            </Text>
            <Text style={styles.errorText}>
              {this.state.createChallengeError}
            </Text>
            <Text style={styles.errorText}>
              Tap to dismiss
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={createStyles.container}>
        <StatusBar barStyle="light-content" />
        {errorView}
        <View style={createStyles.createDetailView}>
          {this.state.showOpponentList
            ? <View style={createStyles.selectorInputView}>
                <Text style={styles.text}>Opponent</Text>
                <TextInput
                  value={this.state.selectedOpponentText}
                  style={createStyles.selectorInput}
                  onChangeText={text => this.handleChangeOpponentText(text)}
                  placeholder={'Select Opponent'}
                  placeholderTextColor={'#CCC'}
                />
                <ListView
                  autoCorrect={false}
                  automaticallyAdjustContentInsets={false}
                  enableEmptySections={true}
                  dataSource={this.state.opponentDataSource}
                  renderRow={rowData =>
                    <TouchableOpacity
                      onPress={() => this.handleOpponentPress(rowData)}
                      style={createStyles.row}
                    >
                      <Text style={styles.text}>{rowData.fullName}</Text>
                    </TouchableOpacity>}
                />
              </View>
            : <View style={createStyles.selectorInputView}>
                <Text style={styles.text}>Opponent</Text>
                <TouchableOpacity
                  style={createStyles.selectorButton}
                  onPress={this.toggleSelectedOpponent}
                >
                  <Text style={styles.text}>
                    {this.state.selectedOpponent.fullName}
                  </Text>
                </TouchableOpacity>
              </View>}

          {this.state.showSegmentList
            ? <View style={createStyles.selectorInputView}>
                <Text style={styles.text}>Segment</Text>
                <TextInput
                  autoCorrect={false}
                  value={this.state.selectedSegmentText}
                  style={createStyles.selectorInput}
                  onChangeText={text => this.handleChangeSegmentText(text)}
                  placeholder={'Select Segment'}
                  placeholderTextColor={'#CCC'}
                />
                <ListView
                  automaticallyAdjustContentInsets={false}
                  enableEmptySections={true}
                  dataSource={this.state.segmentDataSource}
                  renderRow={rowData =>
                    <TouchableOpacity
                      onPress={() => this.handleSegmentPress(rowData)}
                      style={createStyles.row}
                    >
                      <Text style={styles.text}>{rowData.name}</Text>
                    </TouchableOpacity>}
                />
              </View>
            : <View style={createStyles.selectorInputView}>
                <Text style={styles.text}>Segment</Text>
                <TouchableOpacity
                  style={createStyles.selectorButton}
                  onPress={this.toggleSelectedSegment}
                >
                  <Text style={styles.text}>
                    {this.state.selectedSegment.name}
                  </Text>
                </TouchableOpacity>
              </View>}

          {Platform.OS === 'ios'
            ? <View style={createStyles.selectorButtonView}>
                <Text style={styles.text}>Completion Date</Text>
                <View>
                  <TouchableOpacity
                    style={createStyles.selectorButton}
                    onPress={this.toggleDateModal}
                  >
                    <Text style={styles.text}>
                      {new Date(
                        this.state.selectedCompletionDate
                      ).toDateString()}
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
                      onDateChange={date =>
                        this.handleSelectCompletionDate(date)}
                      style={createStyles.datePicker}
                    />
                  </View>
                </Modal>
              </View>
            : <View style={createStyles.selectorButtonView}>
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
              </View>}

        </View>
        <View style={createStyles.createButtonView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.handleSumbit()}
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
