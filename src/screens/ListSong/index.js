import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Song from '../../components/Song';

const ListSongScreen = ({songs}) => {
  const renderItem = ({item}) => <Song song={item} />;

  return (
    <SafeAreaView>
      {/* <Song /> */}
      <FlatList
        data={songs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default ListSongScreen;
