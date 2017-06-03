import { StackNavigator } from 'react-navigation';
import ConnectedCompletedChallenges from '../components/CompletedChallenges';
import ConnectedCompletedChallengeDetail from '../components/CompletedChallengeDetail';

const CompletedChallengesTab = StackNavigator({
  CompletedChallenges: {
    screen: ConnectedCompletedChallenges,
    navigationOptions: {
      title: 'Completed Challenges',
      headerTintColor: '#CCC',
      headerStyle: {
        backgroundColor: "#2B2B2B"
      }
    }
  },
  CompletedChallengeDetail: {
    screen: ConnectedCompletedChallengeDetail,
    navigationOptions: {
      headerTintColor: '#ef473a',
      headerStyle: {
        backgroundColor: "#2B2B2B"
      }
    }
  }
});


export default CompletedChallengesTab;
