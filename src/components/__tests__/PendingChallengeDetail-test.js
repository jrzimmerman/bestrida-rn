import 'react-native';
import React from 'react';
import { PendingChallengeDetail } from '../PendingChallengeDetail';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders PendingChallengeDetail component', () => {
  const challenge = {
    segmentName: "Test Segment"
  };
  const tree = renderer.create(
    <PendingChallengeDetail
      challenge={challenge}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
