import React from 'react';
import {
  Text,
  View
} from 'react-native';

class OpponentSearchBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>Opponent Search Bar</Text>
      </View>
    );
  }
}

const { array } = React.PropTypes;

OpponentSearchBar.propTypes = {
  segments: array
};

export default OpponentSearchBar;
