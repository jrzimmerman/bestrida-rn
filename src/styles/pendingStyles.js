import { PixelRatio, StyleSheet } from 'react-native';

let styles;
if (PixelRatio.get() < 3) {
  styles = StyleSheet.create({
    challengeOptions: {
      flex: 1,
      flexDirection: 'row',
      alignSelf: 'stretch'
    },
    challengeOptionsDecline: {
      flex: 0.5,
      alignSelf: 'stretch',
      margin: 10,
      padding: 10,
      borderRadius: 4,
      height: 40,
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
      margin: 10,
      padding: 10,
      borderRadius: 4,
      height: 40,
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
} else {
  styles = StyleSheet.create({
    challengeOptions: {
      flex: 1,
      flexDirection: 'row',
      alignSelf: 'stretch'
    },
    challengeOptionsDecline: {
      flex: 0.5,
      alignSelf: 'stretch',
      margin: 10,
      padding: 10,
      borderRadius: 4,
      height: 45,
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: '#ef473a'
    },
    challengeOptionsDeclineText: {
      fontSize: 16,
      color: '#ef473a',
      alignSelf: 'center',
      justifyContent: 'center'
    },
    challengeOptionsAccept: {
      flex: 0.5,
      alignSelf: 'stretch',
      margin: 10,
      padding: 10,
      borderRadius: 4,
      height: 45,
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: '#33cd5f'
    },
    challengeOptionsAcceptText: {
      fontSize: 16,
      color: '#33cd5f',
      alignSelf: 'center',
      justifyContent: 'center'
    }
  });
}

const pendingStyles = styles;
export default pendingStyles;
