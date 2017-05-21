import React from 'react';
import PropTypes from 'prop-types';
import { TabNavigator } from 'react-navigation';
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
        tabBarLabel: 'Feed',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name={focused ? 'ios-home' : 'ios-home-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        )
      }
    },
    ActiveChallenges: {
      screen: ActiveChallengesTab,
      navigationOptions: {
        tabBarLabel: 'Active',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name={focused ? 'ios-pulse' : 'ios-pulse-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        )
      }
    },
    CreateChallenge: {
      screen: CreateChallengeTab,
      navigationOptions: {
        tabBarLabel: 'Create',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name={focused ? 'md-list-box' : 'md-list'}
            size={26}
            style={{ color: tintColor }}
          />
        )
      }
    },
    CompletedChallenges: {
      screen: CompletedChallengesTab,
      navigationOptions: {
        tabBarLabel: 'Completed',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name={focused ? 'ios-trophy' : 'ios-trophy-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        )
      }
    },
    Settings: {
      screen: SettingsTab,
      navigationOptions: {
        tabBarLabel: 'Settings',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name={focused ? 'ios-settings' : 'ios-settings-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: '#ef473a',
      inactiveTintColor: '#CCC',
      labelStyle: { fontSize: 12 },
      indicatorStyle: {
        backgroundColor: '#ef473a',
      },
      style: {
        backgroundColor: '#2B2B2B',
      }
    }
  });

  return <TabNav />;
}

const { bool, string } = PropTypes;

Layout.propTypes = {
  focused: bool,
  tintColor: string
}

export default Layout;
