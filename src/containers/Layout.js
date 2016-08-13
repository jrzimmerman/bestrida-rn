import React from 'react'
import {
  TabBarIOS
} from 'react-native'
import ChallengeFeed from '../components/ChallengeFeed'
import ActiveChallenges from '../components/ActiveChallenges'
import CreateChallenge from '../components/CreateChallenge'
import CompletedChallenges from '../components/CompletedChallenges'
import Settings from '../components/Settings'

class Layout extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedTab: 'challengeFeed'
    }
  }
  render () {
    return (
      <TabBarIOS
        unselectedTintColor="white"
        tintColor="#fc4c02"
        barTintColor="black">
        <TabBarIOS.Item
          title="Feed"
          selected={this.state.selectedTab === 'challengeFeed'}
          onPress={() => {
            this.setState({
              selectedTab: 'challengeFeed'
            })
          }}>
          <ChallengeFeed />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Active"
          selected={this.state.selectedTab === 'activeChallenges'}
          onPress={() => {
            this.setState({
              selectedTab: 'activeChallenges'
            })
          }}>
          <ActiveChallenges />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Create"
          selected={this.state.selectedTab === 'createChallenge'}
          onPress={() => {
            this.setState({
              selectedTab: 'createChallenge'
            })
          }}>
          <CreateChallenge />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Completed"
          selected={this.state.selectedTab === 'completedChallenges'}
          onPress={() => {
            this.setState({
              selectedTab: 'completedChallenges'
            })
          }}>
          <CompletedChallenges />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Settings"
          selected={this.state.selectedTab === 'settings'}
          onPress={() => {
            this.setState({
              selectedTab: 'settings'
            })
          }}>
          <Settings />
        </TabBarIOS.Item>
      </TabBarIOS>
    )
  }
}

export default Layout
