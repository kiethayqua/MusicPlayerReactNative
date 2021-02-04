import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    marginBottom: 3,
  },
  image: {
    margin: 5,
    width: 70,
    height: 70,
    borderRadius: 5,
    flex: 1,
  },
  textWrapper: {
    flex: 3,
  },
  singer: {
    fontWeight: 'bold',
    fontSize: 17,
    marginLeft: 7,
    marginBottom: 5,
  },
  title: {
    marginLeft: 7,
    color: '#aaa',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
