import React from 'react';
import {
  Animated,
  DatePickerIOS,
  Dimensions,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import * as challengeActions from '../actions/challenges';
import * as navigationActions from '../actions/navigation';
import * as userActions from '../actions/user';

const { height } = Dimensions.get('window');
const createStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
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
  selectorView: {
    flex: 1
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
    color: '#CCC'
  },
  datePickerView: {
    backgroundColor: '#fff',
    marginTop: height - 259
  },
  datePicker: {
    marginTop: 42,
    borderTopColor: '#ccc',
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
    color: '#46cf98'
  }
});

class CreateChallenge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeZoneOffsetInHours: ((-1) * (new Date()).getTimezoneOffset()) / 60,
      selectedOpponentText: '',
      selectedOpponent: '',
      selectedSegmentText: '',
      selectedSegment: '',
      selectedCompletionDate: new Date(),
      showDateModal: false
    };

    this.handleSelectOpponent = this.handleSelectOpponent.bind(this);
    this.handleSelectSegment = this.handleSelectSegment.bind(this);
    this.handleSelectCompletionDate = this.handleSelectCompletionDate.bind(this);
    this.handleChangeOpponentText = this.handleChangeOpponentText.bind(this);
    this.handleChangeSegmentText = this.handleChangeSegmentText.bind(this);
    this.handleChangeCompletionDate = this.handleChangeCompletionDate.bind(this);
    this.handleSumbit = this.handleSumbit.bind(this);
    this.toggleDateModal = this.toggleDateModal.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(userActions.getUser(this.props.userId));
  }

  handleChangeOpponentText(e) {
    this.setState({ selectedOpponentText: e.target.value });
  }

  handleChangeSegmentText(e) {
    this.setState({ selectedSegmentText: e.target.value });
  }

  handleChangeCompletionDate() {
    this.setState({ showDateModal: true });
  }

  handleSelectOpponent(opponent) {
    this.setState({ selectedOpponent: opponent });
  }

  handleSelectSegment(segment) {
    this.setState({ selectedSegment: segment });
  }

  handleSelectCompletionDate(date) {
    this.setState({ selectedCompletionDate: date });
  }

  handleSumbit() {
    const { dispatch, userId, user } = this.props;
    const { selectedOpponent, selectedSegment, selectedCompletionDate } = this.state;
    if (!selectedOpponent || !selectedSegment || !selectedCompletionDate || selectedCompletionDate < new Date()) {
      console.log('form invalid');
    } else {
      dispatch(challengeActions.createChallenge(user, selectedOpponent, selectedSegment, selectedCompletionDate));
      dispatch(challengeActions.pendingChallenges(userId));
      dispatch(navigationActions.changeTab('challengeFeed'));
      this.setState({
        selectedOpponent: '',
        selectedSegment: '',
        selectedCompletionDate: new Date()
      });
    }
  }

  toggleDateModal() {
    this.setState({ showDateModal: !this.state.showDateModal });
  }

  render() {
    return (
      <View style={createStyles.container}>
        <StatusBar barStyle="light-content" />
        <View style={createStyles.createDetailView}>

          <View style={createStyles.selectorView}>
            <Text style={styles.text}>Opponent</Text>
            <TextInput value={this.state.selectedOpponentText} style={createStyles.selectorInput} onChange={this.handleChangeOpponentText} placeholder={'Select Opponent'} />
          </View>

          <View style={createStyles.selectorView}>
            <Text style={styles.text}>Segment</Text>
            <TextInput value={this.state.selectedSegmentText} style={createStyles.selectorInput} onChange={this.handleChangeSegmentText} placeholder={'Select Segment'} />
          </View>

          <View style={createStyles.selectorView}>
            <Text style={styles.text}>Completion Date</Text>
            <View>
              <TouchableOpacity style={createStyles.selectorButton} onPress={this.handleChangeCompletionDate}>
                <Text style={styles.text}>{this.state.selectedCompletionDate.toDateString()}</Text>
              </TouchableOpacity>
            </View>
            <Modal
              animationType={'slide'}
              transparent={true}
              visible={this.state.showDateModal}>
              <Animated.View style={createStyles.datePickerView}>
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
              </Animated.View>
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
