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
import songs from '../../data.json';
import ProgressBar from '../../components/ProgressBar';

const PlayerScreen = (props) => {
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

  const playbackState = usePlaybackState();
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    TrackPlayer.setupPlayer().then(async () => {
      await TrackPlayer.reset();
      await TrackPlayer.add(songs);
      //await TrackPlayer.play();
    });

    TrackPlayer.updateOptions({
      stopWithApp: false,
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
      ],
    });
  }, []);

  useEffect(() => {
    switch (playbackState) {
      case 3:
        setIsPlaying(true);
        break;
      case 2:
        setIsPlaying(false);
        break;
      default:
        setIsPlaying(true);
        break;
    }
  }, [playbackState]);

  // khi bai hat ket thuc chuyen bai
  useEffect(() => {
    TrackPlayer.addEventListener('playback-track-changed', async () => {
      const indexSong = (await TrackPlayer.getCurrentTrack()) - 1;
      setCurrentSongIndex(indexSong);
    });
  }, [currentSongIndex]);

  const renderControl = () => {
    if (isPlaying) {
      return (
        <TouchableHighlight
          style={styles.playPauseBtn}
          onPress={playPauseBtnClick}>
          <FontAwesome name="pause" size={25} color={'white'} />
        </TouchableHighlight>
      );
    } else {
      return (
        <TouchableHighlight
          style={styles.playPauseBtn}
          onPress={playPauseBtnClick}>
          <FontAwesome name="play" size={25} color={'white'} />
        </TouchableHighlight>
      );
    }
  };

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
    const indexSong = (await TrackPlayer.getCurrentTrack()) - 1;
    if (indexSong === songs.length - 1) return;
    TrackPlayer.skipToNext();
    setCurrentSongIndex(indexSong + 1);

    await TrackPlayer.play();
  };

  const prevBtnClick = async () => {
    const indexSong = (await TrackPlayer.getCurrentTrack()) - 1;
    if (indexSong === 0) return;
    TrackPlayer.skipToPrevious();
    setCurrentSongIndex(indexSong - 1);

    await TrackPlayer.play();
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
          source={{uri: songs[currentSongIndex].artwork}}
        />
      </DropShadow>

      <View style={styles.text}>
        <Text style={styles.singer}>{songs[currentSongIndex].artist}</Text>
        <Text style={styles.title}>{songs[currentSongIndex].title}</Text>
        <ProgressBar style={{marginTop: 10}} />
      </View>

      <View style={styles.control}>
        <TouchableOpacity style={styles.backwardBtn} onPress={prevBtnClick}>
          <FontAwesome name="fast-backward" size={20} color="#aaa" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.forwardBtn} onPress={nextBtnClick}>
          <FontAwesome name="fast-forward" size={20} color="#aaa" />
        </TouchableOpacity>
        {renderControl()}
      </View>
    </View>
  );
};

export default PlayerScreen;
