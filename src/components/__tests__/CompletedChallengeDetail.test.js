import 'react-native';
import React from 'react';
import { CompletedChallengeDetail } from '../CompletedChallengeDetail';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders CompletedChallengeDetail component', () => {
  const challenge = {
    segmentName: "Test Segment"
  };
  const tree = renderer.create(
    <CompletedChallengeDetail
      challenge={challenge}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
