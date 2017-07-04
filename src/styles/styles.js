import { PixelRatio, StyleSheet } from 'react-native';

let allStyles = null;

if (PixelRatio.get() < 3) {
  allStyles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#2B2B2B'
    },
    list: {
      alignSelf: 'stretch',
      marginTop: 5
    },
    row: {
      marginVertical: 5,
      marginHorizontal: 10,
      flexDirection: 'row',
      paddingVertical: 6,
      paddingHorizontal: 8,
      height: 100,
      backgroundColor: '#383838'
    },
    text: {
      fontSize: 12,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignSelf: 'center',
      color: '#CCC'
    },
    button: {
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
    buttonText: {
      fontSize: 14,
      flexDirection: 'row',
      alignSelf: 'center',
      color: '#ef473a'
    },
    challengeImageView: {
      flex: 0.3,
      flexDirection: 'column'
    },
    challengeImage: {
      flex: 1,
      width: null,
      height: null,
      resizeMode: 'contain'
    },
    challengeDetail: {
      flex: 0.7,
      flexDirection: 'column',
      justifyContent: 'center'
    },
    challengeText: {
      fontSize: 12,
      color: '#CCC',
      alignSelf: 'flex-start',
      marginHorizontal: 10,
      marginVertical: 4
    },
    challengeTitleView: {
      flex: 0.1,
      alignSelf: 'stretch'
    },
    challengeTitleText: {
      paddingTop: 20,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignSelf: 'center',
      color: '#CCC',
      fontWeight: 'bold',
      fontSize: 18
    },
    challengeDetailView: {
      flex: 0.375,
      alignSelf: 'stretch',
      backgroundColor: '#383838',
      marginHorizontal: 20,
      marginBottom: 5
    },
    challengeDetailTitle: {
      flexDirection: 'column',
      alignSelf: 'center',
      color: '#CCC',
      fontWeight: 'bold',
      fontSize: 14
    },
    challengeDetailText: {
      flexDirection: 'column',
      alignSelf: 'center',
      color: '#CCC',
      fontSize: 12
    },
    challengeMapView: {
      flex: 0.325,
      alignSelf: 'stretch',
      marginHorizontal: 20,
      alignItems: 'center'
    },
    challengeFooterView: {
      flex: 0.1,
      alignSelf: 'stretch',
      marginBottom: 10
    },
    detailRowView: {
      flex: 1,
      marginTop: 5,
      marginHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf: 'stretch'
    },
    errorView: {
      alignSelf: 'stretch',
      backgroundColor: '#ef473a'
    },
    errorButton: {
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 10,
      paddingVertical: 6,
      paddingHorizontal: 8,
      borderRadius: 4,
      height: 45
    },
    createErrorButton: {
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 10,
      paddingVertical: 6,
      paddingHorizontal: 8,
      borderRadius: 4,
      height: 45
    },
    errorTitle: {
      color: 'white',
      alignSelf: 'center',
      fontSize: 14,
      fontWeight: 'bold'
    },
    errorText: {
      fontSize: 12,
      color: 'white',
      alignSelf: 'center'
    }
  });
} else {
  allStyles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#2B2B2B'
    },
    list: {
      alignSelf: 'stretch',
      marginTop: 5
    },
    row: {
      marginVertical: 5,
      marginHorizontal: 10,
      flexDirection: 'row',
      paddingVertical: 6,
      paddingHorizontal: 8,
      height: 120,
      backgroundColor: '#383838'
    },
    text: {
      fontSize: 16,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignSelf: 'center',
      color: '#CCC'
    },
    button: {
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
    buttonText: {
      fontSize: 16,
      flexDirection: 'row',
      alignSelf: 'center',
      color: '#ef473a'
    },
    challengeImageView: {
      flex: 0.3,
      flexDirection: 'column'
    },
    challengeImage: {
      flex: 1,
      width: null,
      height: null,
      resizeMode: 'contain'
    },
    challengeDetail: {
      flex: 0.7,
      flexDirection: 'column',
      justifyContent: 'center'
    },
    challengeText: {
      fontSize: 16,
      color: '#CCC',
      alignSelf: 'flex-start',
      marginHorizontal: 10,
      marginVertical: 4
    },
    challengeTitleView: {
      flex: 0.1,
      alignSelf: 'stretch'
    },
    challengeTitleText: {
      paddingTop: 20,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignSelf: 'center',
      color: '#CCC',
      fontWeight: 'bold',
      fontSize: 22
    },
    challengeDetailView: {
      flex: 0.375,
      alignSelf: 'stretch',
      backgroundColor: '#383838',
      marginHorizontal: 20,
      marginBottom: 10
    },
    challengeDetailTitle: {
      flexDirection: 'column',
      alignSelf: 'center',
      color: '#CCC',
      fontWeight: 'bold',
      fontSize: 16
    },
    challengeDetailText: {
      flexDirection: 'column',
      alignSelf: 'center',
      color: '#CCC',
      fontSize: 16
    },
    challengeMapView: {
      flex: 0.325,
      alignSelf: 'stretch',
      marginHorizontal: 20,
      alignItems: 'center'
    },
    challengeFooterView: {
      flex: 0.1,
      alignSelf: 'stretch',
      marginBottom: 10
    },
    detailRowView: {
      flex: 1,
      marginTop: 5,
      marginHorizontal: 30,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf: 'stretch'
    },
    errorView: {
      alignSelf: 'stretch',
      backgroundColor: '#ef473a'
    },
    errorButton: {
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 10,
      paddingVertical: 6,
      paddingHorizontal: 8,
      borderRadius: 4,
      height: 45
    },
    createErrorButton: {
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 10,
      paddingVertical: 6,
      paddingHorizontal: 8,
      borderRadius: 4,
      height: 45
    },
    errorTitle: {
      color: 'white',
      alignSelf: 'center',
      fontSize: 16,
      fontWeight: 'bold'
    },
    errorText: {
      color: 'white',
      alignSelf: 'center'
    }
  });
}

const styles = allStyles;
export default styles;
