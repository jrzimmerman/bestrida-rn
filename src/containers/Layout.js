import React from 'react';
import { TabNavigator, TabView } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import ChallengeFeedTab from './ChallengeFeedTab';
import ActiveChallengesTab from './ActiveChallengesTab';
import CreateChallengeTab from './CreateChallengeTab';
import CompletedChallengesTab from './CompletedChallengesTab';
import SettingsTab from './SettingsTab';

export const Layout = () => {
  const TabNav = TabNavigator({
    ChallengeFeed : {
      screen: ChallengeFeedTab,
      navigationOptions: {
        tabBar: {
          label: 'Feed',
          icon: ({ tintColor, focused }) => (
            <Icon
              name={focused ? 'ios-home' : 'ios-home-outline'}
              size={26}
              style={{ color: tintColor }}
            />
          ),
        },
      }
    },
    ActiveChallenges: {
      screen: ActiveChallengesTab,
      navigationOptions: {
        tabBar: {
          label: 'Active',
          icon: ({ tintColor, focused }) => (
            <Icon
              name={focused ? 'ios-pulse' : 'ios-pulse-outline'}
              size={26}
              style={{ color: tintColor }}
            />
          ),
        },
      }
    },
    CreateChallenge: {
      screen: CreateChallengeTab,
      navigationOptions: {
        tabBar: {
          label: 'Create',
          icon: ({ tintColor, focused }) => (
            <Icon
              name={focused ? 'md-list-box' : 'md-list'}
              size={26}
              style={{ color: tintColor }}
            />
          ),
        },
      }
    },
    CompletedChallenges: {
      screen: CompletedChallengesTab,
      navigationOptions: {
        tabBar: {
          label: 'Completed',
          icon: ({ tintColor, focused }) => (
            <Icon
              name={focused ? 'ios-trophy' : 'ios-trophy-outline'}
              size={26}
              style={{ color: tintColor }}
            />
          ),
        },
      }
    },
    Settings: {
      screen: SettingsTab,
      navigationOptions: {
        tabBar: {
          label: 'Settings',
          icon: ({ tintColor, focused }) => (
            <Icon
              name={focused ? 'ios-settings' : 'ios-settings-outline'}
              size={26}
              style={{ color: tintColor }}
            />
          ),
        },
      }
    }
  },
  {
    tabBarComponent: TabView.TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#ef473a',
      inactiveTintColor: '#CCC',
      labelStyle: { fontSize: 12 },
      style: {
        backgroundColor: '#2B2B2B',
      }
    }
  });

  return <TabNav />;
}

export default Layout;
