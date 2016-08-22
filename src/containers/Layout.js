import React from 'react';
import { connect } from 'react-redux';
import {
  NavigatorIOS,
  StyleSheet,
  TabBarIOS
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ChallengeFeed from '../components/ChallengeFeed';
import ActiveChallenges from '../components/ActiveChallenges';
import CreateChallenge from '../components/CreateChallenge';
import CompletedChallenges from '../components/CompletedChallenges';
import Settings from '../components/Settings';
import * as navigationActions from '../actions/navigation';
import * as challengeActions from '../actions/challenges';

const styles = StyleSheet.create({
  nav: {
    flex: 1
  }
});

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }

  handlePress(tab) {
    if (tab === 'activeChallenges') this.props.dispatch(challengeActions.activeChallenges(this.props.userId));
    if (tab === 'challengeFeed') this.props.dispatch(challengeActions.pendingChallenges(this.props.userId));
    if (tab === 'completedChallenges') this.props.dispatch(challengeActions.completedChallenges(this.props.userId));
    this.props.dispatch(navigationActions.changeTab(tab));
  }

  render() {
    return (
      <TabBarIOS
        unselectedTintColor="#CCC"
        tintColor="#ef473a"
        barTintColor="#2B2B2B">
        <Icon.TabBarItemIOS
          title="Feed"
          iconName="ios-home-outline"
          selectedIconName="ios-home"
          selected={this.props.navigation.selectedTab === 'challengeFeed'}
          onPress={() => this.handlePress('challengeFeed')}>
          <NavigatorIOS
            style={styles.nav}
            titleTextColor={'#CCC'}
            tintColor={'#ef473a'}
            barTintColor={'#2B2B2B'}
            initialRoute={{
              title: 'Challenge Feed',
              component: ChallengeFeed
            }}
          />
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="Active"
          iconName="ios-pulse-outline"
          selectedIconName="ios-pulse"
          selected={this.props.navigation.selectedTab === 'activeChallenges'}
          onPress={() => this.handlePress('activeChallenges')}>
          <NavigatorIOS
            style={styles.nav}
            titleTextColor={'#CCC'}
            tintColor={'#ef473a'}
            barTintColor={'#2B2B2B'}
            initialRoute={{
              title: 'Active Challenges',
              component: ActiveChallenges
            }}
          />
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="Create"
          iconName="md-list"
          selectedIconName="md-list-box"
          selected={this.props.navigation.selectedTab === 'createChallenge'}
          onPress={() => this.handlePress('createChallenge')}>
          <NavigatorIOS
            style={styles.nav}
            titleTextColor={'#CCC'}
            tintColor={'#ef473a'}
            barTintColor={'#2B2B2B'}
            initialRoute={{
              title: 'Create Challenge',
              component: CreateChallenge
            }}
          />
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="Completed"
          iconName="ios-trophy-outline"
          selectedIconName="ios-trophy"
          selected={this.props.navigation.selectedTab === 'completedChallenges'}
          onPress={() => this.handlePress('completedChallenges')}>
          <NavigatorIOS
            style={styles.nav}
            titleTextColor={'#CCC'}
            tintColor={'#ef473a'}
            barTintColor={'#2B2B2B'}
            initialRoute={{
              title: 'Completed Challenges',
              component: CompletedChallenges
            }}
          />
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="Settings"
          iconName="ios-settings-outline"
          selectedIconName="ios-settings"
          selected={this.props.navigation.selectedTab === 'settings'}
          onPress={() => this.handlePress('settings')}>
          <NavigatorIOS
            style={styles.nav}
            titleTextColor={'#CCC'}
            tintColor={'#ef473a'}
            barTintColor={'#2B2B2B'}
            initialRoute={{
              title: 'Settings',
              component: Settings
            }}
          />
        </Icon.TabBarItemIOS>
      </TabBarIOS>
    );
  }
}

const { func, object, number } = React.PropTypes;

Layout.propTypes = {
  dispatch: func,
  navigation: object,
  userId: number
};

const mapStateToProps = (state) => ({
  navigation: state.navigation,
  userId: state.user.auth.userId
});

export default connect(mapStateToProps)(Layout);
