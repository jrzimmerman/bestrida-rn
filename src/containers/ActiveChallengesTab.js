import { StackNavigator } from 'react-navigation';
import ActiveChallenges from '../components/ActiveChallenges';
import ActiveChallengeDetail from '../components/ActiveChallengeDetail';

const ActiveChallengesTab = StackNavigator({
  ActiveChallenges: {
    screen: ActiveChallenges,
    navigationOptions: {
      title: 'Active Challenges',
      header: {
        tintColor: '#CCC',
        style: {
          backgroundColor: "#2B2B2B"
        }
      }
    }
  },
  ActiveChallengeDetail: {
    screen: ActiveChallengeDetail,
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


export default ActiveChallengesTab;
