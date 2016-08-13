import * as constants from '../constants/segments'

const initialState = {
  _id: 10663090,
  name: '1 mile start',
  activityType: 'VirtualRide',
  distance: 1617,
  averageGrade: 0,
  climbCategory: 0,
  city: 'Richmond',
  state: 'Virginia',
  country: 'United States',
  totalElevationGain: 4,
  endLatLng: [
    37.548271,
    -77.447922
  ],
  startLatLng: [
    37.540608,
    -77.433336
  ],
  __v: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.SEGMENTS:
      return state
    default:
      return state
  }
}
