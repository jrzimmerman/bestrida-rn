import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
    color: '#CCC',
    alignSelf: 'flex-start',
    marginHorizontal: 10,
    marginVertical: 5
  },
  challengeTitleView: {
    flex: 0.2,
    alignSelf: 'stretch'
  },
  challengeTitleText: {
    paddingTop: 85,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
    color: '#CCC',
    fontWeight: 'bold',
    fontSize: 24
  },
  challengeDetailView: {
    flex: 0.6,
    alignSelf: 'stretch',
    backgroundColor: '#383838',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 40
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
  challengeCancelView: {
    flex: 0.2,
    alignSelf: 'stretch'
  },
  detailRowView: {
    flex: 1,
    marginTop: 5,
    marginHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch'
  }
});

export default styles;
