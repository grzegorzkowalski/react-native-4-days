import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Pressable, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
  withSequence,
  withDelay,
  useDerivedValue,
  useAnimatedScrollHandler,
  interpolate,
  runOnUI,
  runOnJS,
  Extrapolate,
  interpolateColor,
  cancelAnimation,
} from 'react-native-reanimated';
import { Text } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

/**
 * Advanced Animations Example
 * 
 * This screen demonstrates advanced techniques in React Native Reanimated:
 * 1. Worklet functions and runOnUI/runOnJS
 * 2. Derived values and complex interpolations
 * 3. Scroll-driven animations
 * 4. Performance-optimized animations
 * 5. Complex timing and sequencing
 */

export default function AdvancedAnimationsScreen() {
  const colorScheme = useColorScheme();
  const [counter, setCounter] = useState(0);
  
  // Shared values for complex animations
  const scrollY = useSharedValue(0);
  const wavePhase = useSharedValue(0);
  const particlePositions = useSharedValue(
    Array.from({ length: 5 }, () => ({ x: 0, y: 0, rotation: 0 }))
  );
  const clockValue = useSharedValue(0);
  const morphProgress = useSharedValue(0);

  // Start continuous animations on mount
  useEffect(() => {
    // Wave animation
    wavePhase.value = withRepeat(
      withTiming(Math.PI * 2, { duration: 3000 }),
      -1,
      false
    );

    // Clock animation
    clockValue.value = withRepeat(
      withTiming(1, { duration: 1000 }),
      -1,
      false
    );

    // Morph animation
    morphProgress.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2000 }),
        withTiming(0, { duration: 2000 })
      ),
      -1,
      false
    );
  }, []);

  // Worklet function - runs on UI thread
  const updateParticles = () => {
    'worklet';
    const newPositions = particlePositions.value.map((_, index) => ({
      x: Math.sin(clockValue.value * Math.PI * 2 + index) * 50,
      y: Math.cos(clockValue.value * Math.PI * 2 + index) * 30,
      rotation: clockValue.value * 360 + index * 72,
    }));
    particlePositions.value = newPositions;
  };

  // Derived value that automatically updates when dependencies change
  const derivedAnimation = useDerivedValue(() => {
    updateParticles();
    return {
      scale: 1 + Math.sin(clockValue.value * Math.PI * 2) * 0.2,
      rotation: clockValue.value * 180,
    };
  }, [clockValue]);

  // Scroll handler
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  // Complex animated styles using interpolation
  const waveStyle = useAnimatedStyle(() => {
    const wave1 = Math.sin(wavePhase.value) * 20;
    const wave2 = Math.sin(wavePhase.value + Math.PI / 2) * 15;
    const wave3 = Math.sin(wavePhase.value + Math.PI) * 10;
    
    return {
      transform: [
        { translateX: wave1 },
        { translateY: wave2 },
        { rotate: `${wave3}deg` },
      ],
      backgroundColor: interpolateColor(
        wavePhase.value,
        [0, Math.PI, Math.PI * 2],
        ['#3498db', '#e74c3c', '#3498db']
      ),
    };
  });

  // Particle system animation
  const particleStyles = Array.from({ length: 5 }, (_, index) =>
    useAnimatedStyle(() => {
      const particle = particlePositions.value[index];
      return {
        transform: [
          { translateX: particle?.x || 0 },
          { translateY: particle?.y || 0 },
          { rotate: `${particle?.rotation || 0}deg` },
        ],
        opacity: interpolate(
          clockValue.value,
          [0, 0.5, 1],
          [0.3, 1, 0.3],
          Extrapolate.CLAMP
        ),
      };
    })
  );

  // Morphing shape animation
  const morphStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      morphProgress.value,
      [0, 0.5, 1],
      [0, 30, 60]
    );
    
    const width = interpolate(
      morphProgress.value,
      [0, 1],
      [100, 150]
    );

    const height = interpolate(
      morphProgress.value,
      [0, 1],
      [100, 80]
    );

    return {
      width,
      height,
      borderRadius,
      backgroundColor: interpolateColor(
        morphProgress.value,
        [0, 0.5, 1],
        ['#9b59b6', '#f39c12', '#27ae60']
      ),
    };
  });

  // Scroll-driven parallax effect
  const parallaxStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [0, 200],
            [0, -50],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  // Performance counter using runOnJS
  const incrementCounter = () => {
    'worklet';
    runOnJS(setCounter)(counter + 1);
  };

  const handlePerformanceTest = () => {
    // This runs on UI thread for better performance
    runOnUI(incrementCounter)();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Advanced Animations</Text>
      <Text style={styles.description}>
        Complex patterns, worklets, and performance optimization
      </Text>

      <Animated.ScrollView
        style={styles.scrollContainer}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {/* Wave Animation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Continuous Wave Animation</Text>
          <View style={styles.waveContainer}>
            <Animated.View style={[styles.waveElement, waveStyle]}>
              <Text style={styles.waveText}>🌊</Text>
            </Animated.View>
          </View>
        </View>

        {/* Particle System */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Particle System</Text>
          <View style={styles.particleContainer}>
            <View style={styles.particleCenter}>
              <Text style={styles.centerText}>⭐</Text>
            </View>
            {particleStyles.map((style, index) => (
              <Animated.View
                key={index}
                style={[styles.particle, style]}
              >
                <Text style={styles.particleText}>✨</Text>
              </Animated.View>
            ))}
          </View>
        </View>

        {/* Morphing Shape */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Morphing Shapes</Text>
          <View style={styles.morphContainer}>
            <Animated.View style={[styles.morphShape, morphStyle]} />
          </View>
        </View>

        {/* Parallax Section */}
        <Animated.View style={[styles.section, parallaxStyle]}>
          <Text style={styles.sectionTitle}>Scroll-Driven Parallax</Text>
          <Text style={styles.parallaxText}>
            This section moves at a different speed than the scroll!
            Scroll up and down to see the parallax effect.
          </Text>
        </Animated.View>

        {/* Performance Test */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>UI Thread Performance</Text>
          <Text style={styles.counterText}>Counter: {counter}</Text>
          <Pressable
            style={[styles.performanceButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
            onPress={handlePerformanceTest}
          >
            <Text style={styles.buttonText}>
              Increment on UI Thread
            </Text>
          </Pressable>
        </View>

        {/* Technical Information */}
        <View style={styles.technicalSection}>
          <Text style={styles.technicalTitle}>Technical Implementation</Text>
          
          <View style={styles.techniqueCard}>
            <Text style={styles.techniqueTitle}>Worklets</Text>
            <Text style={styles.techniqueDescription}>
              Functions that run on the UI thread for 60fps animations
            </Text>
          </View>

          <View style={styles.techniqueCard}>
            <Text style={styles.techniqueTitle}>Derived Values</Text>
            <Text style={styles.techniqueDescription}>
              Automatically computed values that update when dependencies change
            </Text>
          </View>

          <View style={styles.techniqueCard}>
            <Text style={styles.techniqueTitle}>runOnUI / runOnJS</Text>
            <Text style={styles.techniqueDescription}>
              Bridge between UI and JS threads for optimal performance
            </Text>
          </View>

          <View style={styles.techniqueCard}>
            <Text style={styles.techniqueTitle}>Interpolation</Text>
            <Text style={styles.techniqueDescription}>
              Smooth value mapping with extrapolation control
            </Text>
          </View>
        </View>

        {/* Code Examples */}
        <View style={styles.codeContainer}>
          <Text style={styles.codeTitle}>Key Advanced Concepts:</Text>
          <Text style={styles.codeText}>
            • 'worklet' directive - Marks functions for UI thread{'\n'}
            • useDerivedValue() - Computed animations{'\n'}
            • useAnimatedScrollHandler() - Scroll-driven animations{'\n'}
            • Extrapolate.CLAMP - Control interpolation bounds{'\n'}
            • runOnUI() - Execute on UI thread{'\n'}
            • Complex interpolations - Multiple value mappings
          </Text>
        </View>
      </Animated.ScrollView>
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
    marginBottom: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  section: {
    marginBottom: 40,
    padding: 20,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  waveContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  waveElement: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  waveText: {
    fontSize: 24,
  },
  particleContainer: {
    height: 150,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  particleCenter: {
    position: 'absolute',
    zIndex: 10,
  },
  centerText: {
    fontSize: 32,
  },
  particle: {
    position: 'absolute',
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  particleText: {
    fontSize: 16,
  },
  morphContainer: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  morphShape: {
    backgroundColor: '#9b59b6',
  },
  parallaxText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.8,
  },
  counterText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '600',
  },
  performanceButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  technicalSection: {
    marginBottom: 20,
  },
  technicalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  techniqueCard: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  techniqueTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  techniqueDescription: {
    fontSize: 14,
    opacity: 0.8,
    lineHeight: 20,
  },
  codeContainer: {
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 8,
    marginBottom: 40,
  },
  codeTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  codeText: {
    fontSize: 12,
    fontFamily: 'monospace',
    lineHeight: 18,
  },
});
