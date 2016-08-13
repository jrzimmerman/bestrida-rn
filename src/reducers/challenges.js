import * as constants from '../constants/challenges'

const initialState = {
  _id: {
    $oid: '567b4b44139efc0300c77c9c'
  },
  segmentId: 10943110,
  segmentName: 'Zwift Watopia Sprint',
  challengerId: 12348243,
  challengerName: 'Shan Batla',
  challengeeId: 1027935,
  challengeeName: 'Justin Zimmerman',
  expires: {
    $date: '2015-12-24T05:00:00.000Z'
  },
  created: {
    $date: '2015-12-23T01:32:52.231Z'
  },
  status: 'complete',
  challengeeCompleted: true,
  challengerCompleted: true,
  __v: 0,
  segmentCountry: 'Solomon Islands',
  segmentState: 'Temotu Province',
  segmentCity: null,
  segmentClimbCategory: 0,
  segmentElevationGain: 0,
  segmentAverageGrade: 0,
  segmentDistance: 214.9,
  challengerMaxHeartRate: 0,
  challengerAvgHeartrate: 0,
  challengerAvgWatts: 105.1,
  challengerAvgCadence: 57.7,
  challengerTime: 18,
  challengeeMaxHeartRate: 186,
  challengeeAvgHeartrate: 160.3,
  challengeeAvgWatts: 52.8,
  challengeeAvgCadence: 60.7,
  challengeeTime: 32,
  loserName: 'Justin Zimmerman',
  loserId: 1027935,
  winnerName: 'Shan Batla',
  winnerId: 12348243,
  expired: true
}

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.CHALLENGES:
      return state
    default:
      return state
  }
}
