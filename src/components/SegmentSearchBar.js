import React from 'react';
import {
  Text,
  View
} from 'react-native';

class SegmentSearchBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>Segment Search Bar</Text>
      </View>
    );
  }
}

const { array } = React.PropTypes;

SegmentSearchBar.propTypes = {
  segments: array
};

export default SegmentSearchBar;
