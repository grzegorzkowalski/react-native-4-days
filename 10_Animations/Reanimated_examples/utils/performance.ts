/**
 * Animation Performance Configuration
 * 
 * Optimized configurations for React Native Reanimated animations
 * focusing on 60fps performance and smooth user interactions.
 */

import {
  withTiming,
  withSpring,
  WithTimingConfig,
  WithSpringConfig,
} from 'react-native-reanimated';

// High-performance timing configurations
export const PERFORMANCE_TIMING = {
  instant: { duration: 100 } as WithTimingConfig,
  fast: { duration: 200 } as WithTimingConfig,
  normal: { duration: 350 } as WithTimingConfig,
  slow: { duration: 500 } as WithTimingConfig,
  lazy: { duration: 800 } as WithTimingConfig,
} as const;

// High-performance spring configurations
export const PERFORMANCE_SPRING = {
  // Ultra responsive for micro-interactions
  snappy: { damping: 20, stiffness: 400 } as WithSpringConfig,
  
  // Standard responsive feel
  responsive: { damping: 15, stiffness: 300 } as WithSpringConfig,
  
  // Gentle bouncy feel
  gentle: { damping: 12, stiffness: 200 } as WithSpringConfig,
  
  // Slow bouncy for emphasis
  bouncy: { damping: 8, stiffness: 150 } as WithSpringConfig,
  
  // Very bouncy for playful interactions
  wobbly: { damping: 5, stiffness: 100 } as WithSpringConfig,
} as const;

// Animation presets for common patterns
export const ANIMATION_PRESETS = {
  // Button press feedback
  buttonPress: {
    scale: withTiming(0.95, PERFORMANCE_TIMING.fast),
    opacity: withTiming(0.8, PERFORMANCE_TIMING.fast),
  },
  
  buttonRelease: {
    scale: withSpring(1, PERFORMANCE_SPRING.snappy),
    opacity: withTiming(1, PERFORMANCE_TIMING.normal),
  },
  
  // Card entrance animations
  cardEnter: {
    opacity: withTiming(1, PERFORMANCE_TIMING.normal),
    scale: withSpring(1, PERFORMANCE_SPRING.gentle),
    translateY: withSpring(0, PERFORMANCE_SPRING.responsive),
  },
  
  // Loading states
  loadingPulse: {
    scale: withSpring(1.05, PERFORMANCE_SPRING.gentle),
    opacity: withTiming(0.7, PERFORMANCE_TIMING.normal),
  },
  
  // Success feedback
  successBounce: {
    scale: withSpring(1.1, PERFORMANCE_SPRING.bouncy),
  },
  
  // Error shake
  errorShake: {
    translateX: withSpring(10, { damping: 5, stiffness: 500 }),
  },
};

// Performance optimization helpers
export const createStaggeredAnimation = (
  delay: number,
  animation: () => void,
  index: number
) => {
  setTimeout(animation, delay * index);
};

export const createOptimizedSequence = (
  animations: Array<() => void>,
  baseDelay = 100
) => {
  animations.forEach((animation, index) => {
    setTimeout(animation, baseDelay * index);
  });
};

// Memory-efficient animation utilities
export const createReusableAnimation = (
  animationFunction: (value: any) => any
) => {
  let cachedAnimation: any = null;
  
  return (value: any) => {
    if (!cachedAnimation) {
      cachedAnimation = animationFunction(value);
    }
    return cachedAnimation;
  };
};

export default {
  PERFORMANCE_TIMING,
  PERFORMANCE_SPRING,
  ANIMATION_PRESETS,
  createStaggeredAnimation,
  createOptimizedSequence,
  createReusableAnimation,
};
