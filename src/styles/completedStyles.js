import { PixelRatio, StyleSheet } from 'react-native';

let styles;
if (PixelRatio.get() < 3) {
  styles = StyleSheet.create({
    completedTitleView: {
      flex: 0.15,
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
    completedSubTitleText: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignSelf: 'center',
      color: '#CCC',
      fontWeight: 'bold',
      fontSize: 16
    },
    completedDetailTitle: {
      flexDirection: 'column',
      alignSelf: 'center',
      color: '#CCC',
      fontWeight: 'bold',
      fontSize: 12
    },
    completedDetailText: {
      flexDirection: 'column',
      alignSelf: 'center',
      color: '#CCC',
      fontSize: 12
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
      flex: 0.2,
      alignSelf: 'stretch',
      justifyContent: 'space-around'
    },
    completedTitleText: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignSelf: 'center',
      color: '#CCC',
      fontWeight: 'bold',
      fontSize: 22
    },
    completedSubTitleText: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignSelf: 'center',
      color: '#CCC',
      fontWeight: 'bold',
      fontSize: 20
    },
    completedDetailTitle: {
      flexDirection: 'column',
      alignSelf: 'center',
      color: '#CCC',
      fontWeight: 'bold',
      fontSize: 14
    },
    completedDetailText: {
      flexDirection: 'column',
      alignSelf: 'center',
      color: '#CCC',
      fontSize: 14
    },
    row: {
      flex: 1,
      flexDirection: 'row',
      height: 120
    }
  });
}

const completedStyles = styles;
export default completedStyles;
