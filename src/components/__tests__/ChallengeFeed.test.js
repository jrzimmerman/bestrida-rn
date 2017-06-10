import 'react-native';
import React from 'react';
import { ChallengeFeed } from '../ChallengeFeed';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders ChallengeFeed component', () => {
  const pending = {
    loading: false,
    challenges: [],
    error: null
  };
  const tree = renderer
    .create(<ChallengeFeed pending={pending} dispatch={fn => fn} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
