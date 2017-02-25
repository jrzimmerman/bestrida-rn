import { StackNavigator } from 'react-navigation';
import CreateChallenge from '../components/CreateChallenge';

const CreateChallengeTab = StackNavigator({
  CreateChallenge: {
    screen: CreateChallenge,
    navigationOptions: {
      title: 'Create Challenge',
      header: {
        tintColor: '#CCC',
        style: {
          backgroundColor: "#2B2B2B"
        }
      }
    }
  }
});


export default CreateChallengeTab;
