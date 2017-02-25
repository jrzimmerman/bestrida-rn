import 'react-native';
import React from 'react';
import { ActiveChallenges } from '../ActiveChallenges';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

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
  const tree = renderer.create(
    <ActiveChallenges
      active={active}
      challenges={challenges}
      dispatch={fn => fn}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
