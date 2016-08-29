import { PixelRatio, StyleSheet } from 'react-native';

let styles;
if (PixelRatio.get() < 3) {
  styles = StyleSheet.create({
    create: {
      flex: 0.225,
      alignSelf: 'stretch'
    },
    feed: {
      flex: 0.775,
      alignSelf: 'stretch'
    },
    list: {
      alignSelf: 'stretch'
    },
    button: {
      marginTop: 80,
      alignSelf: 'stretch',
      justifyContent: 'space-around',
      flexDirection: 'row',
      margin: 10,
      paddingVertical: 6,
      paddingHorizontal: 8,
      borderRadius: 4,
      height: 40,
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: '#ef473a'
    },
    challengeOptions: {
      flex: 1,
      flexDirection: 'row',
      alignSelf: 'stretch'
    },
    challengeOptionsDecline: {
      flex: 0.5,
      alignSelf: 'stretch',
      marginHorizontal: 5,
      borderRadius: 4,
      height: 20,
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: '#ef473a'
    },
    challengeOptionsDeclineText: {
      fontSize: 12,
      color: '#ef473a',
      alignSelf: 'center',
      justifyContent: 'center'
    },
    challengeOptionsAccept: {
      flex: 0.5,
      alignSelf: 'stretch',
      marginHorizontal: 4,
      borderRadius: 4,
      height: 20,
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: '#33cd5f'
    },
    challengeOptionsAcceptText: {
      fontSize: 12,
      color: '#33cd5f',
      alignSelf: 'center',
      justifyContent: 'center'
    }
  });
} else {
  styles = StyleSheet.create({
    create: {
      flex: 0.2,
      alignSelf: 'stretch'
    },
    feed: {
      flex: 0.8,
      alignSelf: 'stretch'
    },
    list: {
      alignSelf: 'stretch'
    },
    button: {
      marginTop: 80,
      alignSelf: 'stretch',
      justifyContent: 'space-around',
      flexDirection: 'row',
      margin: 10,
      paddingVertical: 6,
      paddingHorizontal: 8,
      borderRadius: 4,
      height: 45,
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: '#ef473a'
    },
    challengeOptions: {
      flex: 1,
      flexDirection: 'row',
      alignSelf: 'stretch'
    },
    challengeOptionsDecline: {
      flex: 0.5,
      alignSelf: 'stretch',
      marginHorizontal: 5,
      borderRadius: 4,
      height: 25,
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: '#ef473a'
    },
    challengeOptionsDeclineText: {
      color: '#ef473a',
      alignSelf: 'center',
      justifyContent: 'center'
    },
    challengeOptionsAccept: {
      flex: 0.5,
      alignSelf: 'stretch',
      marginHorizontal: 5,
      borderRadius: 4,
      height: 25,
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: '#33cd5f'
    },
    challengeOptionsAcceptText: {
      color: '#33cd5f',
      alignSelf: 'center',
      justifyContent: 'center'
    }
  });
}

const feedStyles = styles;
export default feedStyles;
