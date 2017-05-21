import { StackNavigator } from 'react-navigation';
import ChallengeFeed from '../components/ChallengeFeed';
import PendingChallengeDetail from '../components/PendingChallengeDetail';

const ChallengeFeedTab = StackNavigator({
  ChallengeFeed: {
    screen: ChallengeFeed,
    navigationOptions: {
      title: 'Challenge Feed',
      headerTintColor: '#CCC',
      headerStyle: {
        backgroundColor: "#2B2B2B"
      }
    }
  },
  PendingChallengeDetail: {
    screen: PendingChallengeDetail,
    navigationOptions: {
      headerTintColor: '#ef473a',
      headerStyle: {
        backgroundColor: "#2B2B2B"
      }
    }
  }
});


export default ChallengeFeedTab;
