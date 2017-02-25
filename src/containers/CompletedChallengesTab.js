import { StackNavigator } from 'react-navigation';
import CompletedChallenges from '../components/CompletedChallenges';
import CompletedChallengeDetail from '../components/CompletedChallengeDetail';

const CompletedChallengesTab = StackNavigator({
  CompletedChallenges: {
    screen: CompletedChallenges,
    navigationOptions: {
      title: 'Completed Challenges',
      header: {
        tintColor: '#CCC',
        style: {
          backgroundColor: "#2B2B2B"
        }
      }
    }
  },
  CompletedChallengeDetail: {
    screen: CompletedChallengeDetail,
    navigationOptions: {
      header: {
        tintColor: '#ef473a',
        style: {
          backgroundColor: "#2B2B2B"
        }
      }
    }
  }
});


export default CompletedChallengesTab;
