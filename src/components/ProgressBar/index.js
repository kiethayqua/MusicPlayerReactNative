import React from 'react';
import {Text, View} from 'react-native';
import Slider from '@react-native-community/slider';
import {useProgress} from 'react-native-track-player';
import styles from './styles';

const ProgressBar = (props) => {
  const {duration, position, positionBuffered} = useProgress();

  const formatTime = (secs) => {
    secs = Math.ceil(secs);
    let minutes = Math.floor(secs / 60);
    let seconds = secs - minutes * 60;

    if (seconds < 10) seconds = `0${seconds}`;
    if (seconds % 60 === 0) seconds = `00`;

    return `${minutes}:${seconds}`;
  };

  const handleChangeValue = (value) => {
    TrackPlayer.seekTo(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{formatTime(position)}</Text>
      <Slider
        style={{width: 200, height: 40}}
        value={position}
        minimumValue={0}
        maximumValue={duration}
        minimumTrackTintColor="rgb(232, 71, 59)"
        maximumTrackTintColor="rgb(232, 50, 60)"
        thumbTintColor="rgb(232, 71, 59)"
        onValueChange={handleChangeValue}
      />
      <Text style={styles.timer}>{formatTime(duration)}</Text>
    </View>
  );
};

export default ProgressBar;
