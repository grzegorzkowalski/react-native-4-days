import React, { useEffect, useCallback } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withSequence,
  withDelay,
  interpolate,
  runOnJS,
  cancelAnimation,
} from 'react-native-reanimated';
import { Text } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

/**
 * Spring Animations Example
 * 
 * This screen demonstrates spring physics animations in React Native Reanimated:
 * 1. Basic spring animations with different configurations
 * 2. Bouncy ball simulation
 * 3. Elastic card interactions
 * 4. Spring chain reactions
 * 5. Damping and stiffness customization
 */

export default function SpringAnimationsScreen() {
  const colorScheme = useColorScheme();
  
  // Shared values for different spring animations
  const ballY = useSharedValue(0);
  const cardScale = useSharedValue(1);
  const chainRotation = useSharedValue(0);
  const elasticScale = useSharedValue(1);
  const bounceHeight = useSharedValue(0);

  // Auto-start some animations on mount
  useEffect(() => {
    // Start continuous bouncing ball
    ballY.value = withRepeat(
      withSpring(-150, { damping: 2, stiffness: 100 }),
      -1,
      true
    );

    // Start chain rotation
    chainRotation.value = withRepeat(
      withSpring(360, { damping: 15, stiffness: 100 }),
      -1,
      false
    );
  }, []);

  // Animated styles
  const ballStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: ballY.value }],
  }));

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cardScale.value }],
  }));

  const chainStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${chainRotation.value}deg` }],
  }));

  const elasticStyle = useAnimatedStyle(() => ({
    transform: [{ scale: elasticScale.value }],
  }));

  const bounceStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bounceHeight.value }],
  }));

  // Animation functions with different spring configurations
  const handleGentleSpring = () => {
    cardScale.value = withSequence(
      withSpring(1.2, { damping: 15, stiffness: 200 }),
      withSpring(1, { damping: 10, stiffness: 150 })
    );
  };

  const handleBouncySpring = () => {
    elasticScale.value = withSequence(
      withSpring(1.5, { damping: 2, stiffness: 300 }), // Low damping = more bouncy
      withSpring(1, { damping: 8, stiffness: 200 })
    );
  };

  const handleStiffSpring = () => {
    bounceHeight.value = withSequence(
      withSpring(-100, { damping: 5, stiffness: 500 }), // High stiffness = fast
      withSpring(0, { damping: 10, stiffness: 300 })
    );
  };

  const handleChainReaction = () => {
    // Create a chain reaction of spring animations
    cardScale.value = withSpring(1.1, { damping: 10 });
    
    setTimeout(() => {
      elasticScale.value = withSpring(1.1, { damping: 8 });
    }, 100);
    
    setTimeout(() => {
      bounceHeight.value = withSpring(-50, { damping: 6 });
    }, 200);
    
    setTimeout(() => {
      // Reset all
      cardScale.value = withSpring(1);
      elasticScale.value = withSpring(1);
      bounceHeight.value = withSpring(0);
    }, 800);
  };

  const resetAllAnimations = () => {
    cardScale.value = withSpring(1);
    elasticScale.value = withSpring(1);
    bounceHeight.value = withSpring(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spring Animations</Text>
      <Text style={styles.description}>
        Physics-based animations with spring configurations
      </Text>

      {/* Animation Demo Area */}
      <View style={styles.demoArea}>
        {/* Bouncing Ball */}
        <Animated.View style={[styles.ball, ballStyle]}>
          <Text style={styles.ballText}>⚽</Text>
        </Animated.View>

        {/* Interactive Card */}
        <Animated.View style={[styles.card, cardStyle]}>
          <Text style={styles.cardText}>📱</Text>
        </Animated.View>

        {/* Rotating Chain */}
        <Animated.View style={[styles.chain, chainStyle]}>
          <Text style={styles.chainText}>⚙️</Text>
        </Animated.View>

        {/* Elastic Element */}
        <Animated.View style={[styles.elastic, elasticStyle]}>
          <Text style={styles.elasticText}>🎯</Text>
        </Animated.View>

        {/* Bounce Element */}
        <Animated.View style={[styles.bounceElement, bounceStyle]}>
          <Text style={styles.bounceText}>🚀</Text>
        </Animated.View>
      </View>

      {/* Control Buttons */}
      <View style={styles.controlsContainer}>
        <Pressable
          style={[styles.button, { backgroundColor: '#3498db' }]}
          onPress={handleGentleSpring}
        >
          <Text style={styles.buttonText}>Gentle Spring</Text>
          <Text style={styles.buttonSubtext}>damping: 15, stiffness: 200</Text>
        </Pressable>

        <Pressable
          style={[styles.button, { backgroundColor: '#e74c3c' }]}
          onPress={handleBouncySpring}
        >
          <Text style={styles.buttonText}>Bouncy Spring</Text>
          <Text style={styles.buttonSubtext}>damping: 2, stiffness: 300</Text>
        </Pressable>

        <Pressable
          style={[styles.button, { backgroundColor: '#f39c12' }]}
          onPress={handleStiffSpring}
        >
          <Text style={styles.buttonText}>Stiff Spring</Text>
          <Text style={styles.buttonSubtext}>damping: 5, stiffness: 500</Text>
        </Pressable>

        <Pressable
          style={[styles.button, { backgroundColor: '#9b59b6' }]}
          onPress={handleChainReaction}
        >
          <Text style={styles.buttonText}>Chain Reaction</Text>
          <Text style={styles.buttonSubtext}>Sequential springs</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.resetButton]}
          onPress={resetAllAnimations}
        >
          <Text style={[styles.buttonText, { color: Colors[colorScheme ?? 'light'].text }]}>
            Reset All
          </Text>
        </Pressable>
      </View>

      {/* Code Example */}
      <View style={styles.codeContainer}>
        <Text style={styles.codeTitle}>Spring Configuration:</Text>
        <Text style={styles.codeText}>
          • damping: Controls bounce (lower = more bouncy){'\n'}
          • stiffness: Controls speed (higher = faster){'\n'}
          • mass: Controls weight (default: 1){'\n'}
          • overshootClamping: Prevents overshooting{'\n'}
          • restDisplacementThreshold: When to stop{'\n'}
          • restSpeedThreshold: Minimum speed to stop
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
    height: 200,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 30,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    paddingVertical: 20,
  },
  ball: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ballText: {
    fontSize: 20,
  },
  card: {
    width: 50,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#27ae60',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 24,
  },
  chain: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f39c12',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chainText: {
    fontSize: 20,
  },
  elastic: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  elasticText: {
    fontSize: 22,
  },
  bounceElement: {
    width: 40,
    height: 50,
    borderRadius: 20,
    backgroundColor: '#9b59b6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bounceText: {
    fontSize: 20,
  },
  controlsContainer: {
    marginBottom: 20,
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
  buttonSubtext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    marginTop: 2,
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
    fontSize: 12,
    fontFamily: 'monospace',
    lineHeight: 18,
  },
});
