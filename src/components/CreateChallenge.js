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
    marginHorizontal: 20
  }
});

const newDate = new Date();

class CreateChallenge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOpponent: '',
      selectedSegment: '',
      selectedCompletionDate: newDate,
      showDateModal: false
    };

    this.handleSelectOpponent = this.handleSelectOpponent.bind(this);
    this.handleSelectSegment = this.handleSelectSegment.bind(this);
    this.handleSelectCompletionDate = this.handleSelectCompletionDate.bind(this);
    this.handleChangeOpponent = this.handleChangeOpponent.bind(this);
    this.handleChangeSegment = this.handleChangeSegment.bind(this);
    this.handleChangeCompletionDate = this.handleChangeCompletionDate.bind(this);
    this.handleSumbit = this.handleSumbit.bind(this);
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
    console.log('change date');
    this.setState({ selectedCompletionDate: date });
  }

  handleSumbit() {
    const { dispatch, userId, user } = this.props;
    const { selectedOpponent, selectedSegment, selectedCompletionDate } = this.state;
    dispatch(challengeActions.createChallenge(user, selectedOpponent, selectedSegment, selectedCompletionDate));
    dispatch(challengeActions.pendingChallenges(userId));
    dispatch(navigationActions.changeTab('challengeFeed'));
    this.setState({
      selectedOpponent: '',
      selectedSegment: '',
      selectedCompletionDate: newDate
    });
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
                <Text style={styles.text}>{new Date(this.state.selectedCompletionDate).toDateString()}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Modal
            animated={true}
            transparent={false}
            visible={this.state.showModal}>
            <View style={styles.modalContainer}>
              <View style={styles.modalNav}>
                <TouchableHighlight underlayColor="#fff" onPress={() => this._closeModal()}><Text style={[styles.btnText,{width:80,textAlign:"left"}]}>Cancle</Text></TouchableHighlight>
                <Text style={styles.navTitle}>Choose a time</Text>
                <TouchableHighlight underlayColor="#fff" onPress={() => this._setTime()}><Text style={[styles.btnText,,{width:80,textAlign:"right"}]}>Set</Text></TouchableHighlight>
              </View>
              <View style={styles.modalContent}>
                   <DatePickerIOS
                date={this.state.setDate}
                mode="date"
                timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                onDateChange={(date) => this._onDateChange(date)}
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
