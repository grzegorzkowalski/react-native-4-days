import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Audio } from 'expo-av';
import { AVPlaybackStatus } from 'expo-av';

import { Text, View } from '@/components/Themed';
import { Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

// Demo track data
const demoTrack = {
  id: 'demo-track',
  url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  title: 'Demo Song',
  artist: 'SoundHelix',
  duration: 195000, // 3:15 in milliseconds
};

export default function PlayerScreen() {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(demoTrack.duration);
  const colorScheme = useColorScheme();

  useEffect(() => {
    setupAudio();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const setupAudio = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
    } catch (error) {
      console.error('Error setting up audio:', error);
    }
  };

  const loadAudio = async () => {
    try {
      setIsLoading(true);
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: demoTrack.url },
        { shouldPlay: false },
        onPlaybackStatusUpdate
      );
      setSound(newSound);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading audio:', error);
      setIsLoading(false);
      Alert.alert('Error', 'Failed to load audio track');
    }
  };

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis || 0);
      setDuration(status.durationMillis || demoTrack.duration);
      setIsPlaying(status.isPlaying);
      
      if (status.didJustFinish) {
        setIsPlaying(false);
        setPosition(0);
      }
    }
  };

  const togglePlayback = async () => {
    try {
      if (!sound) {
        await loadAudio();
        return;
      }

      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
    } catch (error) {
      console.error('Error toggling playback:', error);
      Alert.alert('Error', 'Failed to control playback');
    }
  };

  const stopPlayback = async () => {
    try {
      if (sound) {
        await sound.stopAsync();
        await sound.setPositionAsync(0);
      }
    } catch (error) {
      console.error('Error stopping playback:', error);
    }
  };

  const seekForward = async () => {
    try {
      if (sound) {
        const newPosition = Math.min(position + 10000, duration);
        await sound.setPositionAsync(newPosition);
      }
    } catch (error) {
      console.error('Error seeking forward:', error);
    }
  };

  const seekBackward = async () => {
    try {
      if (sound) {
        const newPosition = Math.max(position - 10000, 0);
        await sound.setPositionAsync(newPosition);
      }
    } catch (error) {
      console.error('Error seeking backward:', error);
    }
  };

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPlayButtonIcon = () => {
    if (isLoading) {
      return 'spinner';
    } else if (isPlaying) {
      return 'pause';
    } else {
      return 'play';
    }
  };

  const getStatus = () => {
    if (isLoading) return 'Loading';
    if (!sound) return 'Ready to load';
    if (isPlaying) return 'Playing';
    return 'Paused';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Music Player</Text>
      
      {/* Track Info */}
      <View style={styles.trackInfo}>
        <Text style={styles.trackTitle}>{demoTrack.title}</Text>
        <Text style={styles.trackArtist}>{demoTrack.artist}</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <Text style={styles.timeText}>{formatTime(position)}</Text>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: `${(position / duration) * 100}%`,
                backgroundColor: Colors[colorScheme ?? 'light'].tint
              }
            ]} 
          />
        </View>
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>

      {/* Player Controls */}
      <View style={styles.controls}>
        <Pressable 
          style={styles.controlButton} 
          onPress={seekBackward}
          disabled={!sound}
        >
          <FontAwesome 
            name="backward" 
            size={24} 
            color={!sound ? '#ccc' : Colors[colorScheme ?? 'light'].text} 
          />
        </Pressable>

        <Pressable 
          style={[styles.controlButton, styles.playButton]} 
          onPress={togglePlayback}
          disabled={isLoading}
        >
          <FontAwesome 
            name={getPlayButtonIcon()} 
            size={32} 
            color={Colors[colorScheme ?? 'light'].background} 
          />
        </Pressable>

        <Pressable 
          style={styles.controlButton} 
          onPress={seekForward}
          disabled={!sound}
        >
          <FontAwesome 
            name="forward" 
            size={24} 
            color={!sound ? '#ccc' : Colors[colorScheme ?? 'light'].text} 
          />
        </Pressable>
      </View>

      {/* Stop Button */}
      <Pressable 
        style={[styles.stopButton, { borderColor: Colors[colorScheme ?? 'light'].tint }]} 
        onPress={stopPlayback}
        disabled={!sound}
      >
        <Text style={[styles.stopButtonText, { 
          color: !sound ? '#ccc' : Colors[colorScheme ?? 'light'].tint 
        }]}>
          Stop
        </Text>
      </Pressable>

      {/* Player State */}
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          Status: {getStatus()}
        </Text>
      </View>

      {/* Instructions */}
      {!sound && (
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsText}>
            Tap the play button to load and play the demo track
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  trackInfo: {
    alignItems: 'center',
    marginBottom: 40,
  },
  trackTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
  },
  trackArtist: {
    fontSize: 16,
    opacity: 0.7,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 40,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
    marginHorizontal: 10,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  timeText: {
    fontSize: 12,
    minWidth: 40,
    textAlign: 'center',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  controlButton: {
    padding: 15,
    marginHorizontal: 10,
  },
  playButton: {
    backgroundColor: '#007AFF',
    borderRadius: 35,
    padding: 20,
    marginHorizontal: 20,
  },
  stopButton: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
  },
  stopButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  statusContainer: {
    marginTop: 20,
  },
  statusText: {
    fontSize: 14,
    opacity: 0.6,
  },
  instructionsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  instructionsText: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.6,
    fontStyle: 'italic',
  },
});
