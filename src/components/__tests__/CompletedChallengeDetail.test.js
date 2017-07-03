import 'react-native';
import React from 'react';
import { CompletedChallengeDetail } from '../CompletedChallengeDetail';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

test('renders CompletedChallengeDetail component', () => {
  const challenge = {
    id: '57be4f7ef7fb96130084f0b2',
    segment: {
      id: 12924664,
      name: 'Test Segment'
    },
    challenger: {
      id: 8302445,
      name: 'Test Challenger',
      completed: true,
      time: 139
    },
    challengee: {
      id: 1027935,
      name: 'Test Challengee',
      completed: true,
      time: 115
    }
  };
  const navigation = {
    state: {
      params: {
        challenge
      }
    }
  };
  const store = mockStore({});
  const tree = renderer
    .create(
      <CompletedChallengeDetail
        navigation={navigation}
        dispatch={fn => fn}
        store={store}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
