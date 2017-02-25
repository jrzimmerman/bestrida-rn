import 'react-native';
import React from 'react';
import { ActiveChallengeDetail } from '../ActiveChallengeDetail';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders ActiveChallengeDetail component', () => {
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
    <ActiveChallengeDetail
      navigation={navigation}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
