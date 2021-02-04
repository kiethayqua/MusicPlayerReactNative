import 'react-native-gesture-handler';
import React, {useState, useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Text, View} from 'react-native';
import PlayerScreen from './src/screens/Player';
import MusicFiles from 'react-native-get-music-files';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TrackPlayer from 'react-native-track-player';

import {requestMultiple, PERMISSIONS} from 'react-native-permissions';
import ListSongScreen from './src/screens/ListSong';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const App = () => {
  const [songs, setSongs] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    requestMultiple([PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE]).then(
      (statuses) => {
        console.log(
          'Storage',
          statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE],
        );
        MusicFiles.getAll({
          id: true,
          blured: true, // works only when 'cover' is set to true
          artist: true,
          duration: true, //default : true
          cover: false, //default : true,
          genre: true,
          title: true,
          cover: true,
          minimumSongDuration: 10000, // get songs bigger than 10000 miliseconds duration,
        })
          .then((tracks) => {
            if (tracks === 'Something get wrong with musicCursor') return;
            const listSong = [];
            tracks.map(({id, title, author, path}) => {
              const objChangeKey = {
                id: id,
                title: title,
                artist: author,
                url: path,
                artwork: require('MusicPlayer/src/images/download.jpeg'),
              };
              listSong.push(objChangeKey);
            });
            setSongs(listSong);
            setLoading(false);

            TrackPlayer.setupPlayer().then(async () => {
              await TrackPlayer.reset();
              await TrackPlayer.add(listSong);
              //await TrackPlayer.play();
            });
          })
          .catch((error) => {
            console.log(error);
          });
      },
    );
    return () => {
      TrackPlayer.destroy();
    };
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: 'rgb(232, 50, 60)',
        }}>
        <Tab.Screen
          name="ListSong"
          options={{
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="playlist-music"
                color={color}
                size={size}
              />
            ),
          }}>
          {() =>
            loading ? <Text>Loading...</Text> : <ListSongScreen songs={songs} />
          }
        </Tab.Screen>
        <Tab.Screen
          name="Player"
          options={{
            tabBarLabel: 'Player',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="music" color={color} size={size} />
            ),
          }}>
          {() =>
            loading ? <Text>Loading...</Text> : <PlayerScreen songs={songs} />
          }
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
