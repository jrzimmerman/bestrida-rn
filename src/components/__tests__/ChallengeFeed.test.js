import 'react-native';
import React from 'react';
import { ChallengeFeed } from '../ChallengeFeed';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

test('renders ChallengeFeed component', () => {
  const pending = {
    loading: false,
    challenges: [],
    error: null
  };
  const store = mockStore({});
  const tree = renderer
    .create(
      <ChallengeFeed pending={pending} dispatch={fn => fn} store={store} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
