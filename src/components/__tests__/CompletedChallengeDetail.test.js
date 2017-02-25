import 'react-native';
import React from 'react';
import { CompletedChallengeDetail } from '../CompletedChallengeDetail';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders CompletedChallengeDetail component', () => {
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
    <CompletedChallengeDetail
      navigation={navigation}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
