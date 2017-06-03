import { StackNavigator } from 'react-navigation';
import ConnectedCreateChallenge from '../components/CreateChallenge';

const CreateChallengeTab = StackNavigator({
  CreateChallenge: {
    screen: ConnectedCreateChallenge,
    navigationOptions: {
      title: 'Create Challenge',
      headerTintColor: '#CCC',
      headerStyle: {
        backgroundColor: "#2B2B2B"
      }
    }
  }
});


export default CreateChallengeTab;
