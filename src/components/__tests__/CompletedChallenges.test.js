import 'react-native';
import React from 'react';
import { CompletedChallenges } from '../CompletedChallenges';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders CompletedChallenges component', () => {
  const completed = {
    loading: false,
    challenges: [],
    error: null
  };
  const tree = renderer.create(
    <CompletedChallenges
      completed={completed}
      dispatch={fn => fn}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
