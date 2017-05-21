import { StackNavigator } from 'react-navigation';
import Settings from '../components/Settings';

const SettingsTab = StackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: {
      title: 'Settings',
      headerTintColor: '#CCC',
      headerStyle: {
        backgroundColor: "#2B2B2B"
      }
    }
  }
});


export default SettingsTab;
