import { StackNavigator } from 'react-navigation';
import ConnectedSettings from '../components/Settings';

const SettingsTab = StackNavigator({
  Settings: {
    screen: ConnectedSettings,
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
