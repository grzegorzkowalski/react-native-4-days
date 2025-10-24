import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  withDelay,
  interpolate,
} from 'react-native-reanimated';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export default function TabOneScreen() {
  // Animation values
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const translateY = useSharedValue(30);

  useEffect(() => {
    // Staggered entrance animation
    opacity.value = withTiming(1, { duration: 800 });
    scale.value = withDelay(200, withSpring(1, { damping: 15, stiffness: 200 }));
    translateY.value = withDelay(300, withSpring(0, { damping: 15, stiffness: 200 }));
  }, []);

  const titleStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { scale: scale.value },
      { translateY: translateY.value },
    ],
  }));

  const separatorStyle = useAnimatedStyle(() => {
    const width = interpolate(opacity.value, [0, 1], [0, 80]);
    return {
      width: `${width}%`,
      opacity: opacity.value,
    };
  });

  const contentStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: interpolate(opacity.value, [0, 1], [20, 0]) },
    ],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={titleStyle}>
        <Text style={styles.title}>Welcome to React Native</Text>
      </Animated.View>
      
      <View style={styles.separatorContainer}>
        <Animated.View 
          style={[styles.separator, separatorStyle]} 
        />
      </View>
      
      <Animated.View style={contentStyle}>
        <EditScreenInfo path="app/(tabs)/index.tsx" />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separatorContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 30,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
  },
});
