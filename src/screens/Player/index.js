import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  Easing,
  Animated,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DropShadow from 'react-native-drop-shadow';
import TrackPlayer, {
  Capability,
  usePlaybackState,
} from 'react-native-track-player';
//import songs from '../../data.json';
import ProgressBar from '../../components/ProgressBar';

const PlayerScreen = ({songs}) => {
  let rotateValueHolder = new Animated.Value(0);
  const startImageRotateFunction = () => {
    rotateValueHolder.setValue(0);
    Animated.timing(rotateValueHolder, {
      toValue: 1,
      duration: 10000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => startImageRotateFunction());
  };

  const RotateData = rotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    startImageRotateFunction();
  });

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const changeTrackEvent = useRef(TrackPlayer).current;
  useEffect(() => {
    TrackPlayer.setupPlayer().then(async () => {
      await TrackPlayer.reset();
      await TrackPlayer.add(songs);
      //await TrackPlayer.play();
    });

    TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
      ],
    });

    changeTrackEvent.addEventListener('playback-track-changed', async () => {
      const idSong = await TrackPlayer.getCurrentTrack();
      const indexSong = songs.findIndex(({id}) => {
        return id == idSong;
      });
      setCurrentSongIndex(indexSong);
    });

    return () => {
      TrackPlayer.destroy();
      changeTrackEvent.remove();
    };
  }, []);

  const playPauseBtnClick = async () => {
    console.log('click');
    if (isPlaying) {
      await TrackPlayer.pause();
      setIsPlaying(false);
    } else {
      await TrackPlayer.play();
      setIsPlaying(true);
    }
  };

  const nextBtnClick = async () => {
    const idSong = await TrackPlayer.getCurrentTrack();
    const indexSong = songs.findIndex(({id}) => {
      return id == idSong;
    });
    if (indexSong === songs.length - 1) return;
    await TrackPlayer.skipToNext();
    setCurrentSongIndex(indexSong + 1);
  };

  const prevBtnClick = async () => {
    const idSong = await TrackPlayer.getCurrentTrack();
    const indexSong = songs.findIndex(({id}) => {
      return id == idSong;
    });
    if (indexSong === 0) return;
    await TrackPlayer.skipToPrevious();
    setCurrentSongIndex(indexSong - 1);
  };

  return (
    <View style={styles.container}>
      <DropShadow
        style={{
          shadowColor: '#aaa',
          shadowOffset: {
            width: 3,
            height: 10,
          },
          shadowOpacity: 1,
          shadowRadius: 5,
        }}>
        <Animated.Image
          style={{
            width: 200,
            height: 200,
            marginTop: 50,
            borderRadius: 100,
            transform: [{rotate: RotateData}],
          }}
          source={{
            uri:
              'https://i.pinimg.com/originals/5b/e8/4f/5be84f684cb91a9783116073ba0d740a.jpg',
          }}
        />
      </DropShadow>

      <View style={styles.text}>
        <Text style={styles.singer}>{songs[currentSongIndex].artist}</Text>
        <Text style={styles.title}>{songs[currentSongIndex].title}</Text>
        <ProgressBar />
      </View>

      <View style={styles.control}>
        <TouchableOpacity style={styles.backwardBtn} onPress={prevBtnClick}>
          <FontAwesome name="fast-backward" size={20} color="#aaa" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.forwardBtn} onPress={nextBtnClick}>
          <FontAwesome name="fast-forward" size={20} color="#aaa" />
        </TouchableOpacity>
        {isPlaying ? (
          <TouchableHighlight
            style={styles.playPauseBtn}
            onPress={playPauseBtnClick}>
            <FontAwesome name="pause" size={25} color={'white'} />
          </TouchableHighlight>
        ) : (
          <TouchableHighlight
            style={styles.playPauseBtn}
            onPress={playPauseBtnClick}>
            <FontAwesome name="play" size={25} color={'white'} />
          </TouchableHighlight>
        )}
      </View>
    </View>
  );
};

export default PlayerScreen;
