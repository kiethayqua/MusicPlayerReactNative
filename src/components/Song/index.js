import React, {useEffect, useState, useRef} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TrackPlayer from 'react-native-track-player';

import styles from './styles';

const Song = ({song}) => {
  const changeEvents = useRef(TrackPlayer).current;
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    changeEvents.addEventListener('playback-state', async ({state}) => {
      const idSong = await TrackPlayer.getCurrentTrack();
      if (idSong == song.id) {
        switch (state) {
          case 3:
            setIsPlaying(true);
            break;
          case 2:
            setIsPlaying(false);
            break;
          default:
            setIsPlaying(false);
            break;
        }
      }
    });

    changeEvents.addEventListener('playback-track-changed', async () => {
      setIsPlaying(false);
      await TrackPlayer.pause();
      await TrackPlayer.play();
    });

    return () => {
      changeEvents.remove();
    };
  }, []);

  const handlePlayPauseBtn = async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
      setIsPlaying(false);
    } else {
      await TrackPlayer.skip(song.id);
      await TrackPlayer.play();
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={song.artwork} />
      <View style={styles.textWrapper}>
        <Text style={styles.singer}>{song.artist}</Text>
        <Text style={styles.title}>{song.title}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handlePlayPauseBtn}>
        {isPlaying ? (
          <MaterialCommunityIcons
            name="pause"
            color={'rgb(232, 50, 60)'}
            size={30}
          />
        ) : (
          <MaterialCommunityIcons
            name="play"
            color={'rgb(232, 50, 60)'}
            size={30}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Song;
