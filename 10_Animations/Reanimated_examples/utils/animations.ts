import {
  withTiming,
  withSpring,
  withSequence,
  withRepeat,
  WithTimingConfig,
  WithSpringConfig,
} from 'react-native-reanimated';

/**
 * Animation Utilities
 * 
 * Common animation patterns and configurations for consistent
 * animation behavior throughout the application.
 */

// Timing Configurations
export const TIMING_CONFIGS = {
  fast: { duration: 200 } as WithTimingConfig,
  normal: { duration: 500 } as WithTimingConfig,
  slow: { duration: 800 } as WithTimingConfig,
  smooth: { duration: 300 } as WithTimingConfig,
} as const;

// Spring Configurations
export const SPRING_CONFIGS = {
  gentle: { damping: 15, stiffness: 200 } as WithSpringConfig,
  bouncy: { damping: 2, stiffness: 300 } as WithSpringConfig,
  stiff: { damping: 5, stiffness: 500 } as WithSpringConfig,
  wobbly: { damping: 8, stiffness: 100 } as WithSpringConfig,
} as const;

// Common Animation Patterns
export const createFadeIn = (duration = 500) => {
  return withTiming(1, { duration });
};

export const createFadeOut = (duration = 500) => {
  return withTiming(0, { duration });
};

export const createScaleBounce = (scale = 1.2) => {
  return withSequence(
    withTiming(scale, TIMING_CONFIGS.fast),
    withSpring(1, SPRING_CONFIGS.gentle)
  );
};

export const createShake = (intensity = 10) => {
  return withSequence(
    withTiming(intensity, { duration: 50 }),
    withTiming(-intensity, { duration: 50 }),
    withTiming(intensity, { duration: 50 }),
    withTiming(-intensity, { duration: 50 }),
    withTiming(0, { duration: 50 })
  );
};

export const createPulse = (scale = 1.1) => {
  return withRepeat(
    withSequence(
      withTiming(scale, TIMING_CONFIGS.normal),
      withTiming(1, TIMING_CONFIGS.normal)
    ),
    -1,
    false
  );
};

export const createSlideInFromRight = (distance = 100) => {
  return withSpring(0, SPRING_CONFIGS.gentle);
};

export const createSlideOutToLeft = (distance = -100) => {
  return withTiming(distance, TIMING_CONFIGS.fast);
};

// Color animation helpers
export const ANIMATION_COLORS = {
  primary: '#007AFF',
  success: '#27ae60',
  warning: '#f39c12',
  error: '#e74c3c',
  info: '#3498db',
} as const;

// Easing curves (for custom timing configs)
export const EASING_CURVES = {
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  linear: 'cubic-bezier(0, 0, 1, 1)',
} as const;

// Animation state helpers
export const createToggleAnimation = (
  currentValue: number,
  targetA: number,
  targetB: number,
  config: WithTimingConfig | WithSpringConfig = TIMING_CONFIGS.normal
) => {
  const isSpring = 'damping' in config;
  const target = currentValue === targetA ? targetB : targetA;
  
  return isSpring 
    ? withSpring(target, config as WithSpringConfig)
    : withTiming(target, config as WithTimingConfig);
};

// Gesture animation helpers
export const createSnapToGrid = (
  value: number,
  gridSize: number,
  config: WithSpringConfig = SPRING_CONFIGS.gentle
) => {
  const snappedValue = Math.round(value / gridSize) * gridSize;
  return withSpring(snappedValue, config);
};

export const createConstrainedValue = (
  value: number,
  min: number,
  max: number
) => {
  return Math.min(Math.max(value, min), max);
};

// Performance optimization helpers
export const createBatchedAnimation = (animations: Array<() => void>) => {
  // Execute multiple animations in the same frame
  animations.forEach(animation => animation());
};

// Animation sequence builder
export class AnimationSequence {
  private steps: Array<() => void> = [];
  
  add(animation: () => void, delay = 0) {
    if (delay > 0) {
      this.steps.push(() => {
        setTimeout(animation, delay);
      });
    } else {
      this.steps.push(animation);
    }
    return this;
  }
  
  play() {
    this.steps.forEach((step, index) => {
      if (index === 0) {
        step();
      } else {
        setTimeout(step, index * 100); // Default stagger
      }
    });
  }
  
  clear() {
    this.steps = [];
    return this;
  }
}

export default {
  TIMING_CONFIGS,
  SPRING_CONFIGS,
  createFadeIn,
  createFadeOut,
  createScaleBounce,
  createShake,
  createPulse,
  createSlideInFromRight,
  createSlideOutToLeft,
  ANIMATION_COLORS,
  EASING_CURVES,
  createToggleAnimation,
  createSnapToGrid,
  createConstrainedValue,
  createBatchedAnimation,
  AnimationSequence,
};
