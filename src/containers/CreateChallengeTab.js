import { StackNavigator } from 'react-navigation';
import CreateChallenge from '../components/CreateChallenge';

const CreateChallengeTab = StackNavigator({
  CreateChallenge: {
    screen: CreateChallenge,
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
