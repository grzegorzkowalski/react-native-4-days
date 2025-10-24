import TrackPlayer, { Event, RepeatMode } from 'react-native-track-player';

module.exports = async function() {
  // This service needs to be registered for the module to work
  // but it will be used to handle remote events
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());

  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());

  TrackPlayer.addEventListener(Event.RemoteStop, () => TrackPlayer.stop());

  TrackPlayer.addEventListener(Event.RemoteNext, () => TrackPlayer.skipToNext());

  TrackPlayer.addEventListener(Event.RemotePrevious, () => TrackPlayer.skipToPrevious());

  TrackPlayer.addEventListener(Event.RemoteJumpForward, async (event) => {
    TrackPlayer.seekBy(event.interval);
  });

  TrackPlayer.addEventListener(Event.RemoteJumpBackward, async (event) => {
    TrackPlayer.seekBy(-event.interval);
  });

  TrackPlayer.addEventListener(Event.RemoteSeek, (event) => {
    TrackPlayer.seekTo(event.position);
  });
};
