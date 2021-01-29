import React from 'react';
import {Text, View} from 'react-native';
import Player from './src/PlayerScreen';

const App = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Player />
    </View>
  );
};

export default App;
