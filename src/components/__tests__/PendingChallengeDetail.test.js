import 'react-native';
import React from 'react';
import { PendingChallengeDetail } from '../PendingChallengeDetail';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

test('renders PendingChallengeDetail component', () => {
  const challenge = {
    segment: {
      name: 'Test Segment'
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
      <PendingChallengeDetail
        navigation={navigation}
        dispatch={fn => fn}
        store={store}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
