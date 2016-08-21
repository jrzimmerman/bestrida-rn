import React from 'react';
import {
  DatePickerIOS,
  PickerIOS,
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
    alignItems: 'center',
    paddingTop: 80,
    backgroundColor: '#2B2B2B'
  }
});

class CreateChallenge extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOpponent: '',
      selectedSegment: '',
      selectedCompletionDate: ''
    };

    this.handleSelectOpponent = this.handleSelectOpponent.bind(this);
    this.handleSelectSegment = this.handleSelectSegment.bind(this);
    this.handleSelectCompletionDate = this.handleSelectCompletionDate.bind(this);
    this.handleSumbit = this.handleSumbit.bind(this);
  }
  handleSelectOpponent(opponent) {

  }

  handleSelectSegment(segment) {

  }

  handleSelectCompletionDate(date) {

  }

  handleSumbit() {
    const { dispatch, userId } = this.props;
    const { selectedOpponent, selectedSegment, selectedCompletionDate } = this.state;
    dispatch(challengeActions.createChallenge(user, selectedOpponent, selectedSegment, selectedCompletionDate));
    dispatch(navigationActions.changeTab('challengeFeed'));
    this.setState({
      selectedOpponent: '',
      selectedSegment: '',
      selectedCompletionDate: ''
    });
  }

  render() {
    return (
      <View style={createStyles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.text}>Create Challenge</Text>
        <TouchableOpacity style={styles.button} onPress={() => this.handleSumbit()}>
          <Text style={styles.buttonText}>Create Challenge</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const { func, object } = React.PropTypes;

CreateChallenge.propTypes = {
  dispatch: func,
  userId: object
};

const mapStateToProps = (state) => ({
  userId: state.user.user
});

export default connect(mapStateToProps)(CreateChallenge);
