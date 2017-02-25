import 'react-native';
import React from 'react';
import { Settings } from '../Settings';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders Settings component', () => {
  const tree = renderer.create(
    <Settings
      dispatch={fn => fn}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
