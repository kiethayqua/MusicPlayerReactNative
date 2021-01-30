import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
  },
  image: {
    marginTop: 50,
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  text: {
    alignItems: 'center',
    marginVertical: 40,
  },
  title: {
    color: '#aaa',
  },
  singer: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  control: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  playPauseBtn: {
    backgroundColor: 'rgb(232, 71, 59)',
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
    position: 'absolute',
    elevation: 5,
  },
  backwardBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 30,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 20,
    marginRight: 45,
  },
  forwardBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 30,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 20,
  },
});

export default styles;
