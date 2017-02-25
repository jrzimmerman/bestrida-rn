import { StackNavigator } from 'react-navigation';
import Settings from '../components/Settings';

const SettingsTab = StackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: {
      title: 'Settings',
      header: {
        tintColor: '#CCC',
        style: {
          backgroundColor: "#2B2B2B"
        }
      }
    }
  }
});


export default SettingsTab;
