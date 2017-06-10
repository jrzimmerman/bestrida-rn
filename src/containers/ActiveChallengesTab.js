import { StackNavigator } from 'react-navigation';
import ConnectedActiveChallenges from '../components/ActiveChallenges';
import ConnectedActiveChallengeDetail from '../components/ActiveChallengeDetail';

const ActiveChallengesTab = StackNavigator({
  ActiveChallenges: {
    screen: ConnectedActiveChallenges,
    navigationOptions: {
      title: 'Active Challenges',
      headerTintColor: '#CCC',
      headerStyle: {
        backgroundColor: '#2B2B2B'
      }
    }
  },
  ActiveChallengeDetail: {
    screen: ConnectedActiveChallengeDetail,
    navigationOptions: {
      headerTintColor: '#ef473a',
      headerStyle: {
        backgroundColor: '#2B2B2B'
      }
    }
  }
});

export default ActiveChallengesTab;
