import React from 'react';
import {Text, View} from 'react-native';
import PlayerScreen from './src/screens/Player';

// import {requestMultiple, PERMISSIONS} from 'react-native-permissions';

// requestMultiple([PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE]).then(
//   (statuses) => {
//     console.log('Storage', statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE]);
//   },
// );

const App = () => {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <PlayerScreen />
    </View>
  );
};

export default App;
