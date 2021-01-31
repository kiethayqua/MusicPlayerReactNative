import React, {useRef, useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import Slider from '@react-native-community/slider';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import styles from './styles';

const ProgressBar = (props) => {
  const {duration, position} = useProgress();

  const handleChangeValue = (value) => {
    TrackPlayer.seekTo(value);
  };
  return (
    <View>
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
    </View>
  );
};

export default ProgressBar;
