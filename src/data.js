import MusicFiles from 'react-native-get-music-files';

const songs = new Array();
MusicFiles.getAll({
  id: true, // get id
  artist: true, // get artist
  duration: true, // get duration
  genre: true, // get genre
  title: true, // get title
  fileName: true, // get file name
  minimumSongDuration: 1000, // get track has min duration is 1000 ms (or 1s)
})
  .then((tracks) => {
    tracks.map(({title, author, path, id}) => {
      const changeKeyOfObjSong = {
        id: id,
        title: title,
        artist: author,
        url: path,
        artwork: '',
      };
      songs.push(changeKeyOfObjSong);
    });

    console.log(songs);
  })
  .catch((error) => {
    console.log(error);
  });

export default songs;
