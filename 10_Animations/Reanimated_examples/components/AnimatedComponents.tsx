import React from 'react';
import { Pressable, PressableProps, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

/**
 * Optimized Animated Components
 * 
 * Reusable animated components with performance optimizations
 * and consistent micro-interactions throughout the app.
 */

const triggerHaptic = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
};

interface AnimatedPressableProps extends Omit<PressableProps, 'children'> {
  children: React.ReactNode;
  scaleValue?: number;
  hapticFeedback?: boolean;
  springConfig?: {
    damping: number;
    stiffness: number;
  };
}

export const AnimatedPressable: React.FC<AnimatedPressableProps> = ({
  children,
  scaleValue = 0.95,
  hapticFeedback = true,
  springConfig = { damping: 15, stiffness: 300 },
  onPress,
  ...props
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = () => {
    scale.value = withTiming(scaleValue, { duration: 150 });
    opacity.value = withTiming(0.8, { duration: 150 });
    
    if (hapticFeedback) {
      runOnJS(triggerHaptic)();
    }
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, springConfig);
    opacity.value = withTiming(1, { duration: 200 });
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      {...props}
    >
      <Animated.View style={animatedStyle}>
        {children}
      </Animated.View>
    </Pressable>
  );
};

interface FadeInViewProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  style?: any;
}

export const FadeInView: React.FC<FadeInViewProps> = ({
  children,
  delay = 0,
  duration = 600,
  style,
}) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  React.useEffect(() => {
    setTimeout(() => {
      opacity.value = withTiming(1, { duration });
      translateY.value = withSpring(0, { damping: 15, stiffness: 200 });
    }, delay);
  }, [delay, duration]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[animatedStyle, style]}>
      {children}
    </Animated.View>
  );
};

interface ScaleInViewProps {
  children: React.ReactNode;
  delay?: number;
  style?: any;
}

export const ScaleInView: React.FC<ScaleInViewProps> = ({
  children,
  delay = 0,
  style,
}) => {
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);

  React.useEffect(() => {
    setTimeout(() => {
      scale.value = withSpring(1, { damping: 15, stiffness: 300 });
      opacity.value = withTiming(1, { duration: 400 });
    }, delay);
  }, [delay]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[animatedStyle, style]}>
      {children}
    </Animated.View>
  );
};

interface PulseViewProps {
  children: React.ReactNode;
  scale?: number;
  duration?: number;
  style?: any;
}

export const PulseView: React.FC<PulseViewProps> = ({
  children,
  scale = 1.05,
  duration = 1000,
  style,
}) => {
  const pulseScale = useSharedValue(1);

  React.useEffect(() => {
    const startPulse = () => {
      pulseScale.value = withTiming(scale, { duration: duration / 2 }, () => {
        pulseScale.value = withTiming(1, { duration: duration / 2 }, startPulse);
      });
    };
    startPulse();
  }, [scale, duration]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  return (
    <Animated.View style={[animatedStyle, style]}>
      {children}
    </Animated.View>
  );
};

export default {
  AnimatedPressable,
  FadeInView,
  ScaleInView,
  PulseView,
};
