import 'react-native';
import React from 'react';
import { ActiveChallengeDetail } from '../ActiveChallengeDetail';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders ActiveChallengeDetail component', () => {
  const challenge = {
    segmentName: "Test Segment"
  };
  const tree = renderer.create(
    <ActiveChallengeDetail
      challenge={challenge}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
