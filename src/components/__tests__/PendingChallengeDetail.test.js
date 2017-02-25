import 'react-native';
import React from 'react';
import { PendingChallengeDetail } from '../PendingChallengeDetail';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders PendingChallengeDetail component', () => {
  const challenge = {
    segmentName: "Test Segment"
  };
  const navigation = {
    state: {
      params: {
        challenge
      }
    }
  }
  const tree = renderer.create(
    <PendingChallengeDetail
      navigation={navigation}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
