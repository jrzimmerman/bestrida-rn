import { PixelRatio, StyleSheet } from 'react-native';

let styles;
if (PixelRatio.get() < 3) {
  styles = StyleSheet.create({
    completedTitleView: {
      flex: 0.3,
      alignSelf: 'stretch',
      justifyContent: 'space-around'
    },
    completedTitleText: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignSelf: 'center',
      color: '#CCC',
      fontWeight: 'bold',
      fontSize: 24
    },
    completedDetailTitle: {
      flexDirection: 'column',
      alignSelf: 'center',
      color: '#CCC',
      fontWeight: 'bold',
      fontSize: 13
    },
    completedDetailText: {
      flexDirection: 'column',
      alignSelf: 'center',
      color: '#CCC',
      fontSize: 13
    },
    row: {
      flex: 1,
      flexDirection: 'row',
      height: 80
    }
  });
} else {
  styles = StyleSheet.create({
    completedTitleView: {
      flex: 0.3,
      alignSelf: 'stretch',
      justifyContent: 'space-around'
    },
    completedTitleText: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignSelf: 'center',
      color: '#CCC',
      fontWeight: 'bold',
      fontSize: 18
    },
    completedDetailTitle: {
      flexDirection: 'column',
      alignSelf: 'center',
      color: '#CCC',
      fontWeight: 'bold',
      fontSize: 11
    },
    completedDetailText: {
      flexDirection: 'column',
      alignSelf: 'center',
      color: '#CCC',
      fontSize: 11
    },
    row: {
      flex: 1,
      flexDirection: 'row',
      height: 80
    }
  });
}

const completedStyles = styles;
export default completedStyles;
