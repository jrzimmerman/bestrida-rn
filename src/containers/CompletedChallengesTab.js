import { StackNavigator } from 'react-navigation';
import CompletedChallenges from '../components/CompletedChallenges';
import CompletedChallengeDetail from '../components/CompletedChallengeDetail';

const CompletedChallengesTab = StackNavigator({
  CompletedChallenges: {
    screen: CompletedChallenges,
    navigationOptions: {
      title: 'Completed Challenges',
      headerTintColor: '#CCC',
      headerStyle: {
        backgroundColor: "#2B2B2B"
      }
    }
  },
  CompletedChallengeDetail: {
    screen: CompletedChallengeDetail,
    navigationOptions: {
      headerTintColor: '#ef473a',
      headerStyle: {
        backgroundColor: "#2B2B2B"
      }
    }
  }
});


export default CompletedChallengesTab;
