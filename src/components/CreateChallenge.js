import React from 'react';
import {
  DatePickerIOS,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import * as challengeActions from '../actions/challenges';
import * as navigationActions from '../actions/navigation';
import * as userActions from '../actions/user';

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

  },
  selectorButton: {
    height: 40,
    backgroundColor: '#383838',
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginVertical: 10,
    marginHorizontal: 10
  }
});

class CreateChallenge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
      selectedOpponent: '',
      selectedSegment: '',
      selectedCompletionDate: new Date(),
      showDateModal: false
    };

    this.handleSelectOpponent = this.handleSelectOpponent.bind(this);
    this.handleSelectSegment = this.handleSelectSegment.bind(this);
    this.handleSelectCompletionDate = this.handleSelectCompletionDate.bind(this);
    this.handleChangeOpponent = this.handleChangeOpponent.bind(this);
    this.handleChangeSegment = this.handleChangeSegment.bind(this);
    this.handleChangeCompletionDate = this.handleChangeCompletionDate.bind(this);
    this.handleSumbit = this.handleSumbit.bind(this);
    this.toggleDateModal = this.toggleDateModal.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(userActions.getUser(this.props.userId));
  }

  handleChangeOpponent() {
    console.log('change opponent');
  }

  handleChangeSegment() {
    console.log('change segment');
  }

  handleChangeCompletionDate() {
    console.log('change date');
    this.setState({ showDateModal: true });
  }

  handleSelectOpponent(opponent) {
    console.log('change opponent');
    this.setState({ selectedOpponent: opponent });
  }

  handleSelectSegment(segment) {
    console.log('change segment');
    this.setState({ selectedSegment: segment });
  }

  handleSelectCompletionDate(date) {
    console.log('change date: ', date);
    this.setState({ selectedCompletionDate: date });
  }

  handleSumbit() {
    const { dispatch, userId, user } = this.props;
    const { selectedOpponent, selectedSegment, selectedCompletionDate } = this.state;
    if (!selectedOpponent || !selectedSegment || !selectedCompletionDate || selectedCompletionDate < newDate) {
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
            <View>
              <TouchableOpacity style={createStyles.selectorButton} onPress={this.handleChangeOpponent}>
                <Text style={styles.text}>{'Select Opponent'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={createStyles.selectorView}>
            <Text style={styles.text}>Segment</Text>
            <View>
              <TouchableOpacity style={createStyles.selectorButton} onPress={this.handleChangeSegment}>
                <Text style={styles.text}>Select Segment</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={createStyles.selectorView}>
            <Text style={styles.text}>Completion Date</Text>
            <View>
              <TouchableOpacity style={createStyles.selectorButton} onPress={this.handleChangeCompletionDate}>
                <Text style={styles.text}>{this.state.selectedCompletionDate.toDateString()}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Modal
            transparent={false}
            visible={this.state.showDateModal}>
            <View>
              <View>
                <Text>Choose Completion Date</Text>
                <TouchableOpacity onPress={this.toggleDateModal}><Text>Set</Text></TouchableOpacity>
              </View>
              <View>
                 <DatePickerIOS
                    date={this.state.selectedCompletionDate}
                    minimumDate={new Date()}
                    mode="date"
                    timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                    onDateChange={(date) => this.handleSelectCompletionDate(date)}
                  />
              </View>
          </View>
        </Modal>

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
