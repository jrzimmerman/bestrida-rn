import { Dimensions, PixelRatio, StyleSheet } from 'react-native';

const { height } = Dimensions.get('window');
let styles = null;

if (PixelRatio.get() < 3) {
  styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 20,
      backgroundColor: '#2B2B2B'
    },
    createDetailView: {
      flex: 0.775,
      alignSelf: 'stretch',
      justifyContent: 'space-around'
    },
    createButtonView: {
      flex: 0.225,
      alignSelf: 'stretch'
    },
    selectorInputView: {
      flex: 0.4,
      paddingVertical: 5
    },
    selectorButtonView: {
      flex: 0.2,
      paddingVertical: 5
    },
    selectorButton: {
      height: 35,
      backgroundColor: '#383838',
      justifyContent: 'center',
      alignSelf: 'stretch',
      margin: 10,
      borderWidth: 1,
      borderColor: '#CCC',
    },
    selectorInput: {
      height: 35,
      backgroundColor: '#383838',
      borderWidth: 1,
      borderColor: '#CCC',
      justifyContent: 'center',
      alignSelf: 'stretch',
      margin: 10,
      fontSize: 12,
      color: '#CCC',
      paddingLeft: 10
    },
    datePickerView: {
      backgroundColor: '#FFF',
      marginTop: height - 259
    },
    datePicker: {
      marginTop: 42,
      borderTopColor: '#CCC',
      borderTopWidth: 1
    },
    btnConfirm: {
      position: 'absolute',
      top: 0,
      height: 42,
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      right: 0
    },
    btnText: {
      fontSize: 16,
      color: '#007AFF'
    },
    row: {
      marginBottom: 5,
      marginHorizontal: 15,
      flexDirection: 'row',
      paddingVertical: 6,
      paddingHorizontal: 8,
      height: 35,
      backgroundColor: '#383838',
      alignItems: 'center',
      justifyContent: 'center'
    }
  });
} else {
  styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 20,
      backgroundColor: '#2B2B2B'
    },
    createDetailView: {
      flex: 0.825,
      alignSelf: 'stretch',
      justifyContent: 'space-around'
    },
    createButtonView: {
      flex: 0.175,
      alignSelf: 'stretch'
    },
    selectorInputView: {
      flex: 0.45,
      paddingVertical: 5
    },
    selectorButtonView: {
      flex: 0.15,
      paddingVertical: 5
    },
    selectorButton: {
      height: 44,
      backgroundColor: '#383838',
      justifyContent: 'center',
      alignSelf: 'stretch',
      margin: 10,
      borderWidth: 1,
      borderColor: '#CCC',
    },
    selectorInput: {
      height: 44,
      backgroundColor: '#383838',
      borderWidth: 1,
      borderColor: '#CCC',
      justifyContent: 'center',
      alignSelf: 'stretch',
      margin: 10,
      fontSize: 14,
      color: '#CCC',
      paddingLeft: 10
    },
    datePickerView: {
      backgroundColor: '#FFF',
      marginTop: height - 259
    },
    datePicker: {
      marginTop: 42,
      borderTopColor: '#CCC',
      borderTopWidth: 1
    },
    btnConfirm: {
      position: 'absolute',
      top: 0,
      height: 42,
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      right: 0
    },
    btnText: {
      fontSize: 16,
      color: '#007AFF'
    },
    row: {
      marginBottom: 5,
      marginHorizontal: 20,
      flexDirection: 'row',
      paddingVertical: 6,
      paddingHorizontal: 8,
      height: 44,
      backgroundColor: '#383838',
      alignItems: 'center',
      justifyContent: 'center'
    }
  });
}
const createStyles = styles;
export default createStyles;
