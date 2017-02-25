import { StackNavigator } from 'react-navigation';
import ChallengeFeed from '../components/ChallengeFeed';
import PendingChallengeDetail from '../components/PendingChallengeDetail';

const ChallengeFeedTab = StackNavigator({
  ChallengeFeed: {
    screen: ChallengeFeed,
    navigationOptions: {
      title: 'Challenge Feed',
      header: {
        tintColor: '#CCC',
        style: {
          backgroundColor: "#2B2B2B"
        }
      }
    }
  },
  PendingChallengeDetail: {
    screen: PendingChallengeDetail,
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


export default ChallengeFeedTab;
