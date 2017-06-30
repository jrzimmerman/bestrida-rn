import 'react-native';
import React from 'react';
import { ActiveChallenges } from '../ActiveChallenges';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

test('renders ActiveChallenges component', () => {
  const active = {
    loading: false,
    challenges: [],
    error: null
  };
  const challenges = {
    complete: {
      response: null,
      error: null
    }
  };
  const store = mockStore({});
  const tree = renderer
    .create(
      <ActiveChallenges
        active={active}
        challenges={challenges}
        dispatch={fn => fn}
        store={store}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
