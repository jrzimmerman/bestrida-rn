import { StackNavigator } from 'react-navigation';
import ConnectedChallengeFeed from '../components/ChallengeFeed';
import ConnectedPendingChallengeDetail from '../components/PendingChallengeDetail';

const ChallengeFeedTab = StackNavigator({
  ChallengeFeed: {
    screen: ConnectedChallengeFeed,
    navigationOptions: {
      title: 'Challenge Feed',
      headerTintColor: '#CCC',
      headerStyle: {
        backgroundColor: "#2B2B2B"
      }
    }
  },
  PendingChallengeDetail: {
    screen: ConnectedPendingChallengeDetail,
    navigationOptions: {
      headerTintColor: '#ef473a',
      headerStyle: {
        backgroundColor: "#2B2B2B"
      }
    }
  }
});


export default ChallengeFeedTab;
