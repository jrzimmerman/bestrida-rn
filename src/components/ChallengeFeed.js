import React from 'react'
import {
  Image,
  ListView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { connect } from 'react-redux'
import { styles } from './styles'
import * as challengeActions from '../actions/challenges'

class ChallengeFeed extends React.Component {
  constructor (props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows([
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
      ])
    }
  }

  componentWillMount () {
    this.props.dispatch(challengeActions.pendingChallenges)
  }

  render () {
    console.log(this.props.userId)
    console.log(this.props.pending)
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={feedStyles.create}>
          <TouchableOpacity style={feedStyles.button}>
            <Text style={styles.buttonText}>Create Challenge</Text>
          </TouchableOpacity>
        </View>
        <View style={feedStyles.feed}>
          <ListView
            contentInset={{bottom: 55}}
            automaticallyAdjustContentInsets={false}
            style={feedStyles.list}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => (
              <TouchableOpacity style={styles.row}>
                <View style={styles.challengeImageView}>
                  <Image style={styles.challengeImage} source={require('../images/strava_profile_pic.png')} />
                </View>
                <View style={styles.challengeDetail}>
                  <Text style={styles.challengeText}>Opponent: OPPONENT</Text>
                  <Text style={styles.challengeText}>Segment: SEGMENT NAME</Text>
                  <Text style={styles.challengeText}>Complete By: DATE HERE</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    )
  }
}

const feedStyles = StyleSheet.create({
  create: {
    flex: 0.2,
    alignSelf: 'stretch'
  },
  feed: {
    flex: 0.8,
    alignSelf: 'stretch'
  },
  list: {
    alignSelf: 'stretch'
  },
  button: {
    marginTop: 80,
    alignSelf: 'stretch',
    justifyContent: 'space-around',
    flexDirection: 'row',
    margin: 10,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 4,
    height: 45,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ef473a'
  }
})

const mapStateToProps = (state) => ({
  userId: state.user.auth.userId,
  pending: state.challenges.pending
})

export default connect(mapStateToProps)(ChallengeFeed)
