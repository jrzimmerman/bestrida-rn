import { StackNavigator } from 'react-navigation';
import ActiveChallenges from '../components/ActiveChallenges';
import ActiveChallengeDetail from '../components/ActiveChallengeDetail';

const ActiveChallengesTab = StackNavigator({
  ActiveChallenges: {
    screen: ActiveChallenges,
    navigationOptions: {
      title: 'Active Challenges',
      headerTintColor: '#CCC',
      headerStyle: {
        backgroundColor: "#2B2B2B"
      }
    }
  },
  ActiveChallengeDetail: {
    screen: ActiveChallengeDetail,
    navigationOptions: {
      headerTintColor: '#ef473a',
      headerStyle: {
        backgroundColor: "#2B2B2B"
      }
    }
  }
});


export default ActiveChallengesTab;
