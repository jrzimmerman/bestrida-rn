import * as constants from '../constants/user'

const initialState = {
  '_id': 2711071,
  'firstname': 'David',
  'lastname': 'Lee',
  'fullName': 'David Lee',
  'token': '6040bda80f9dae9ca087fb5bb1a021c797e7636b',
  'photo': 'https://dgalywyr863hv.cloudfront.net/pictures/athletes/2711071/3755643/1/large.jpg',
  'email': 'david7lee@gmail.com',
  'losses': 0,
  'wins': 0,
  'segments': [
    {
      '_id': '9585320',
      'name': 'Hearthstone to McLane',
      'count': 1
    },
    {
      '_id': '9510467',
      'name': 'Pickering straight',
      'count': 1
    },
    {
      '_id': '8443053',
      'name': 'McCulloch',
      'count': 1
    },
    {
      '_id': '8408700',
      'name': 'My Black Descent',
      'count': 1
    },
    {
      '_id': '9585313',
      'name': 'Wagon to Spinning Wheel',
      'count': 1
    }
  ],
  'friends': [
    {
      'id': 1027935,
      'username': 'justinz',
      'firstname': 'Justin',
      'lastname': 'Zimmerman',
      'fullName': 'Justin Zimmerman',
      'photo': 'https://dgalywyr863hv.cloudfront.net/pictures/athletes/1027935/951714/3/large.jpg',
      'challengeCount': 0,
      'wins': 0,
      'losses': 0
    },
    {
      'id': 6274388,
      'username': '',
      'firstname': 'A.J.',
      'lastname': 'Mullins',
      'fullName': 'A.J. Mullins',
      'photo': 'https://dgalywyr863hv.cloudfront.net/pictures/athletes/6274388/3648276/1/large.jpg',
      'challengeCount': 0,
      'wins': 0,
      'losses': 0
    },
    {
      'id': 12348243,
      'username': 'shan_batla',
      'firstname': 'Shan',
      'lastname': 'Batla',
      'fullName': 'Shan Batla',
      'photo': 'http://www.bestrida.co/assets/img/strava_profile_pic.png',
      'challengeCount': 0,
      'wins': 0,
      'losses': 0
    }
  ],
  '__v': 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.USER:
      return state
    default:
      return state
  }
}
