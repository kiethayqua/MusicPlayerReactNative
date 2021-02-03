import React, {useState, useEffect, useRef} from 'react';
import {Text, View} from 'react-native';
import PlayerScreen from './src/screens/Player';
import MusicFiles from 'react-native-get-music-files';

import {requestMultiple, PERMISSIONS} from 'react-native-permissions';

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
          })
          .catch((error) => {
            console.log(error);
          });
      },
    );
  }, []);

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      {console.log(songs)}
      {loading ? <Text>Loading...</Text> : <PlayerScreen songs={songs} />}
    </View>
  );
};

export default App;
