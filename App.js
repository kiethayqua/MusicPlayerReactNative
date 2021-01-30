import React from 'react';
import {Text, View} from 'react-native';
import PlayerScreen from './src/screens/Player';

const App = () => {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <PlayerScreen />
    </View>
  );
};

export default App;
