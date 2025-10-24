import React, { useEffect, useCallback } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
  withSequence,
  withDelay,
  interpolateColor,
  runOnJS,
} from 'react-native-reanimated';
import { Text } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

/**
 * Basic Animations Example
 * 
 * This screen demonstrates fundamental animation concepts in React Native Reanimated:
 * 1. Fade In/Out animations using opacity
 * 2. Scale animations for interactive feedback
 * 3. Translation animations (moving elements)
 * 4. Color interpolation animations
 * 5. Sequential and parallel animations
 */

export default function BasicAnimationsScreen() {
  const colorScheme = useColorScheme();
  
  // Shared values for different animation types
  const opacity = useSharedValue(0);
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const backgroundColor = useSharedValue(0);

  // Auto-start fade in animation on component mount
  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1000 });
  }, []);

  // Animated styles using useAnimatedStyle hook
  const fadeStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const translateStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  const colorStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      backgroundColor.value,
      [0, 1],
      ['#3498db', '#e74c3c']
    ),
  }));

  // Animation functions with micro-interactions
  const handleFadeToggle = useCallback(() => {
    // Add subtle scale feedback
    scale.value = withSequence(
      withTiming(0.98, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );
    opacity.value = withTiming(opacity.value === 1 ? 0 : 1, { duration: 500 });
  }, []);

  const handleScaleAnimation = useCallback(() => {
    scale.value = withSequence(
      withTiming(1.3, { duration: 200 }),
      withTiming(0.9, { duration: 150 }),
      withTiming(1, { duration: 200 })
    );
  }, []);

  const handleMoveAnimation = useCallback(() => {
    const randomX = (Math.random() - 0.5) * 200;
    const randomY = (Math.random() - 0.5) * 200;
    
    // Add anticipation before movement
    scale.value = withSequence(
      withTiming(0.8, { duration: 100 }),
      withTiming(1.1, { duration: 200 }),
      withTiming(1, { duration: 200 })
    );
    
    translateX.value = withSpring(randomX, { damping: 15, stiffness: 200 });
    translateY.value = withSpring(randomY, { damping: 15, stiffness: 200 });
  }, []);

  const handleColorAnimation = useCallback(() => {
    // Add rotation during color change
    scale.value = withSequence(
      withTiming(1.2, { duration: 250 }),
      withTiming(1, { duration: 250 })
    );
    
    backgroundColor.value = withTiming(
      backgroundColor.value === 0 ? 1 : 0,
      { duration: 500 }
    );
  }, []);

  const handleResetAnimations = useCallback(() => {
    // Sequential reset with stagger
    translateX.value = withSpring(0, { damping: 15, stiffness: 200 });
    translateY.value = withDelay(100, withSpring(0, { damping: 15, stiffness: 200 }));
    scale.value = withDelay(200, withTiming(1, { duration: 300 }));
    backgroundColor.value = withDelay(300, withTiming(0, { duration: 400 }));
    opacity.value = withDelay(400, withTiming(1, { duration: 300 }));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Basic Animations</Text>
      <Text style={styles.description}>
        Fundamental animation patterns with Reanimated
      </Text>

      {/* Animation Demo Area */}
      <View style={styles.demoArea}>
        <Animated.View style={[styles.animatedBox, fadeStyle, scaleStyle, translateStyle, colorStyle]}>
          <Text style={styles.boxText}>🎭</Text>
        </Animated.View>
      </View>

      {/* Control Buttons */}
      <View style={styles.controlsContainer}>
        <Pressable
          style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
          onPress={handleFadeToggle}
        >
          <Text style={styles.buttonText}>Fade Toggle</Text>
        </Pressable>

        <Pressable
          style={[styles.button, { backgroundColor: '#27ae60' }]}
          onPress={handleScaleAnimation}
        >
          <Text style={styles.buttonText}>Scale Bounce</Text>
        </Pressable>

        <Pressable
          style={[styles.button, { backgroundColor: '#f39c12' }]}
          onPress={handleMoveAnimation}
        >
          <Text style={styles.buttonText}>Random Move</Text>
        </Pressable>

        <Pressable
          style={[styles.button, { backgroundColor: '#e74c3c' }]}
          onPress={handleColorAnimation}
        >
          <Text style={styles.buttonText}>Color Change</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.resetButton]}
          onPress={handleResetAnimations}
        >
          <Text style={[styles.buttonText, { color: Colors[colorScheme ?? 'light'].text }]}>
            Reset All
          </Text>
        </Pressable>
      </View>

      {/* Code Example */}
      <View style={styles.codeContainer}>
        <Text style={styles.codeTitle}>Key Concepts:</Text>
        <Text style={styles.codeText}>
          • useSharedValue() - Creates animated values{'\n'}
          • useAnimatedStyle() - Defines animated styles{'\n'}
          • withTiming() - Smooth timing animations{'\n'}
          • withSpring() - Physics-based spring animations{'\n'}
          • withSequence() - Chain multiple animations{'\n'}
          • interpolateColor() - Smooth color transitions
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
    marginBottom: 30,
  },
  demoArea: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  animatedBox: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  boxText: {
    fontSize: 32,
  },
  controlsContainer: {
    marginBottom: 30,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  codeContainer: {
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 8,
  },
  codeTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  codeText: {
    fontSize: 14,
    fontFamily: 'monospace',
    lineHeight: 20,
  },
});
