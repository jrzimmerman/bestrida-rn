import React from 'react';
import {
  DatePickerIOS,
  Dimensions,
  ListView,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';
import fuzzy from 'fuzzy';
import styles from './styles';
import * as challengeActions from '../actions/challenges';
import * as navigationActions from '../actions/navigation';
import * as userActions from '../actions/user';

const { height } = Dimensions.get('window');
const createStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 69,
    backgroundColor: '#2B2B2B'
  },
  createDetailView: {
    flex: 0.8,
    alignSelf: 'stretch',
    justifyContent: 'space-around'
  },
  createButtonView: {
    flex: 0.2,
    alignSelf: 'stretch'
  },
  selectorInputView: {
    flex: 0.45,
    paddingVertical: 5
  },
  selectorButtonView: {
    flex: 0.15,
    paddingVertical: 5
  },
  selectorButton: {
    height: 40,
    backgroundColor: '#383838',
    justifyContent: 'center',
    alignSelf: 'stretch',
    margin: 10,
    borderWidth: 1,
    borderColor: '#CCC',
  },
  selectorInput: {
    height: 40,
    backgroundColor: '#383838',
    borderWidth: 1,
    borderColor: '#CCC',
    justifyContent: 'center',
    alignSelf: 'stretch',
    margin: 10,
    fontSize: 14,
    color: '#CCC',
    paddingLeft: 10
  },
  datePickerView: {
    backgroundColor: '#FFF',
    marginTop: height - 259
  },
  datePicker: {
    marginTop: 42,
    borderTopColor: '#CCC',
    borderTopWidth: 1
  },
  btnConfirm: {
    position: 'absolute',
    top: 0,
    height: 42,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0
  },
  btnText: {
    fontSize: 16,
    color: '#007AFF'
  },
  row: {
    marginBottom: 5,
    marginHorizontal: 20,
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 8,
    height: 30,
    backgroundColor: '#383838',
    alignItems: 'center',
    justifyContent: 'center'
  },
  errorView: {
    alignSelf: 'stretch',
    backgroundColor: '#ef473a'
  },
  errorButton: {
    marginTop: 20,
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

const opponentDS = new ListView.DataSource({ rowHasChanged: (r1, r2) => (r1 !== r2) });
const segmentDS = new ListView.DataSource({ rowHasChanged: (r1, r2) => (r1 !== r2) });

class CreateChallenge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newDate: new Date(),
      timeZoneOffsetInHours: ((-1) * (new Date()).getTimezoneOffset()) / 60,
      selectedOpponentText: '',
      selectedOpponent: null,
      selectedSegmentText: '',
      selectedSegment: null,
      selectedCompletionDate: new Date(),
      showDateModal: false,
      segmentDataSource: segmentDS.cloneWithRows(this.props.user.segments),
      opponentDataSource: opponentDS.cloneWithRows(this.props.user.friends),
      showOpponentList: true,
      showSegmentList: true,
      createChallengeError: null
    };

    this.handleOpponentPress = this.handleOpponentPress.bind(this);
    this.handleSegmentPress = this.handleSegmentPress.bind(this);
    this.handleSelectCompletionDate = this.handleSelectCompletionDate.bind(this);
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

  componentWillReceiveProps(nextProps) {
    this.setState({
      segmentDataSource: segmentDS.cloneWithRows(nextProps.user.segments),
      opponentDataSource: opponentDS.cloneWithRows(nextProps.user.friends)
    });
  }

  handleChangeOpponentText(text) {
    const results = fuzzy.filter(text, this.props.user.friends,
      { extract: (item) => item.fullName });
    const matches = results.map((item) => item.original);
    this.setState({
      selectedOpponentText: text,
      opponentDataSource: opponentDS.cloneWithRows(matches),
      createChallengeError: null
    });
  }

  handleChangeSegmentText(text) {
    const results = fuzzy.filter(text, this.props.user.segments,
      { extract: (item) => item.name });
    const matches = results.map((item) => item.original);
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
    this.setState({ selectedCompletionDate: date });
  }

  handleSumbit() {
    const { dispatch, userId, user } = this.props;
    const { selectedOpponent, selectedSegment, selectedCompletionDate } = this.state;
    if (!selectedOpponent || !selectedSegment ||
      !selectedCompletionDate || selectedCompletionDate < this.state.newDate) {
      if (!selectedOpponent && !selectedSegment) {
        this.setState({ createChallengeError: 'Please select both an opponent and segment' });
      } else if (!selectedOpponent) {
        this.setState({ createChallengeError: 'Please select an opponent' });
      } else if (!selectedSegment) {
        this.setState({ createChallengeError: 'Please select a segment' });
      } else {
        this.setState({ createChallengeError: 'Please select an opponent and segment' });
      }
    } else {
      dispatch(challengeActions.createChallenge(user, selectedOpponent,
        selectedSegment, selectedCompletionDate));
      dispatch(challengeActions.pendingChallenges(userId));
      dispatch(navigationActions.changeTab('challengeFeed'));
      this.setState({
        selectedOpponent: null,
        selectedSegment: null,
        selectedOpponentText: '',
        selectedSegmentText: '',
        selectedCompletionDate: new Date(),
        showOpponentList: true,
        showSegmentList: true,
        createChallengeError: null
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
        selectedOpponentText: ''
      });
    }
    this.setState({ showOpponentList: !this.state.showOpponentList });
  }

  toggleSelectedSegment() {
    if (!this.state.showSegmentList) {
      this.setState({
        selectedSegment: null,
        selectedSegmentText: ''
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
        <View style={createStyles.errorView}>
          <TouchableOpacity onPress={this.handleDismiss} style={createStyles.errorButton}>
            <Text style={{ color: 'white', alignSelf: 'center', fontSize: 16, fontWeight: 'bold' }}>
              Error Completing Challenge
            </Text>
            <Text style={{ color: 'white', alignSelf: 'center' }}>
              {this.state.createChallengeError}
            </Text>
            <Text style={{ color: 'white', alignSelf: 'center' }}>
              Tap to dismiss
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={createStyles.container}>
        <StatusBar barStyle="light-content" />
        <View style={createStyles.createDetailView}>
          {errorView}
          { this.state.showOpponentList ?
            <View style={createStyles.selectorInputView}>
              <Text style={styles.text}>Opponent</Text>
              <TextInput
                value={this.state.selectedOpponentText}
                style={createStyles.selectorInput}
                onChangeText={(text) => this.handleChangeOpponentText(text)}
                placeholder={'Select Opponent'}
                placeholderTextColor={'#CCC'} />
              <ListView
                autoCorrect={false}
                automaticallyAdjustContentInsets={false}
                enableEmptySections={true}
                dataSource={this.state.opponentDataSource}
                renderRow={(rowData) => (
                  <TouchableOpacity
                    onPress={() => this.handleOpponentPress(rowData)}
                    style={createStyles.row}>
                      <Text style={styles.text}>{rowData.fullName}</Text>
                  </TouchableOpacity>
                )} />
            </View> :
            <View style={createStyles.selectorInputView}>
              <Text style={styles.text}>Opponent</Text>
              <TouchableOpacity
                style={createStyles.selectorButton}
                onPress={this.toggleSelectedOpponent}>
                <Text style={styles.text}>{this.state.selectedOpponent.fullName}</Text>
              </TouchableOpacity>
            </View>
          }

          { this.state.showSegmentList ?
            <View style={createStyles.selectorInputView}>
              <Text style={styles.text}>Segment</Text>
              <TextInput
                autoCorrect={false}
                value={this.state.selectedSegmentText}
                style={createStyles.selectorInput}
                onChangeText={(text) => this.handleChangeSegmentText(text)}
                placeholder={'Select Segment'}
                placeholderTextColor={'#CCC'} />
              <ListView
                automaticallyAdjustContentInsets={false}
                enableEmptySections={true}
                dataSource={this.state.segmentDataSource}
                renderRow={(rowData) => (
                  <TouchableOpacity
                    onPress={() => this.handleSegmentPress(rowData)}
                    style={createStyles.row}>
                    <Text style={styles.text}>{rowData.name}</Text>
                  </TouchableOpacity>
                )} />
            </View> :
            <View style={createStyles.selectorInputView}>
              <Text style={styles.text}>Segment</Text>
              <TouchableOpacity
                style={createStyles.selectorButton}
                onPress={this.toggleSelectedSegment}>
                <Text style={styles.text}>{this.state.selectedSegment.name}</Text>
              </TouchableOpacity>
            </View>
          }

          <View style={createStyles.selectorButtonView}>
            <Text style={styles.text}>Completion Date</Text>
            <View>
              <TouchableOpacity
                style={createStyles.selectorButton}
                onPress={this.toggleDateModal}>
                <Text style={styles.text}>{this.state.selectedCompletionDate.toDateString()}</Text>
              </TouchableOpacity>
            </View>
            <Modal
              animationType={'slide'}
              transparent={true}
              visible={this.state.showDateModal}>
              <View style={createStyles.datePickerView}>
                <TouchableOpacity style={createStyles.btnConfirm} onPress={this.toggleDateModal}>
                  <Text style={createStyles.btnText}>Set Date</Text>
                </TouchableOpacity>
                 <DatePickerIOS
                    date={this.state.selectedCompletionDate}
                    minimumDate={new Date()}
                    mode={'date'}
                    timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                    onDateChange={(date) => this.handleSelectCompletionDate(date)}
                    style={createStyles.datePicker}
                  />
              </View>
          </Modal>
          </View>

        </View>
        <View style={createStyles.createButtonView}>
          <TouchableOpacity style={styles.button} onPress={() => this.handleSumbit()}>
            <Text style={styles.buttonText}>Create Challenge</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const { func, object, number } = React.PropTypes;

CreateChallenge.propTypes = {
  dispatch: func,
  userId: number,
  user: object
};

const mapStateToProps = (state) => ({
  userId: state.user.auth.userId,
  user: state.user.user
});

export default connect(mapStateToProps)(CreateChallenge);
