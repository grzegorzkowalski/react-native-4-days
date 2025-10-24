# React Native Reanimated Professional Course Examples

A comprehensive React Native application demonstrating advanced animation patterns and techniques using React Native Reanimated 3.x. This project serves as a practical learning resource for React Native developers looking to master professional-grade animations.

## 🚀 Features

### Core Functionality
- **Audio Player**: Music player with Expo AV integration
- **Navigation**: File-based routing with Expo Router
- **TypeScript**: Full type safety throughout the application
- **Cross-Platform**: Works on iOS, Android, and Web

### Animation Examples
1. **Basic Animations**: Fundamental animation patterns
2. **Spring Physics**: Bouncy, physics-based animations
3. **Gesture Interactions**: Touch-driven animations
4. **Shared Transitions**: Smooth screen transitions
5. **Advanced Techniques**: Worklets and performance optimization

## 📱 Screenshots & Demos

### Animation Screens
- **Basic Animations**: Fade, scale, translation, and color interpolation
- **Spring Animations**: Different spring configurations with damping and stiffness
- **Gesture Animations**: Pan, pinch, rotation, and tap gestures
- **Shared Element Transitions**: Hero animations and layout transitions
- **Advanced Animations**: Particle systems, worklets, and scroll-driven animations

## 🛠 Technical Stack

- **React Native**: 0.79.5
- **Expo SDK**: 53.x
- **React Native Reanimated**: 3.17.4
- **React Native Gesture Handler**: Latest
- **Expo Router**: File-based navigation
- **TypeScript**: Full type support
- **Expo AV**: Audio playback functionality

## 🏗 Project Structure

```
app/
├── (tabs)/                 # Tab navigation screens
│   ├── index.tsx          # Home screen
│   ├── two.tsx            # Second tab
│   ├── player.tsx         # Music player
│   └── animations.tsx     # Animation examples hub
├── animations/            # Individual animation examples
│   ├── basic.tsx          # Basic animation patterns
│   ├── spring.tsx         # Spring physics examples
│   ├── gesture.tsx        # Gesture-driven animations
│   ├── shared.tsx         # Shared element transitions
│   └── advanced.tsx       # Advanced techniques
├── _layout.tsx           # Root layout configuration
└── modal.tsx             # Modal screen example

components/               # Reusable components
constants/               # App constants (colors, etc.)
assets/                  # Images, fonts, and media files
```

## 🎯 Learning Objectives

### Basic Animations
- **Shared Values**: Understanding `useSharedValue()`
- **Animated Styles**: Creating responsive UI with `useAnimatedStyle()`
- **Timing Functions**: `withTiming()`, `withSpring()`, `withSequence()`
- **Interpolation**: Smooth value mapping and color transitions

### Spring Physics
- **Spring Configuration**: Damping, stiffness, and mass parameters
- **Bounce Effects**: Creating natural, physics-based movements
- **Chain Reactions**: Sequential spring animations
- **Performance**: Optimizing spring animations for 60fps

### Gesture Interactions
- **Pan Gestures**: Drag and drop functionality
- **Pinch Gestures**: Scale interactions with constraints
- **Rotation Gestures**: Multi-touch rotation with snap-to-angle
- **Tap Gestures**: Immediate feedback and state changes
- **Combined Gestures**: Simultaneous gesture handling

### Shared Element Transitions
- **Layout Animations**: Automatic layout change animations
- **Hero Transitions**: Focus element scaling and positioning
- **Staggered Animations**: Sequential animations with delays
- **Enter/Exit Animations**: Built-in transition patterns

### Advanced Techniques
- **Worklets**: UI thread execution for optimal performance
- **Derived Values**: Automatic dependency-based updates
- **Scroll-Driven Animations**: Parallax and scroll-responsive effects
- **Performance Optimization**: `runOnUI()` and `runOnJS()` usage
- **Complex Interpolations**: Multi-stage value mapping

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or later)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MyReactNativeApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on specific platforms**
   ```bash
   # iOS (requires macOS)
   npm run ios
   
   # Android
   npm run android
   
   # Web
   npm run web
   ```

## 📚 Animation Concepts Explained

### 1. Shared Values
```typescript
const opacity = useSharedValue(0);
const scale = useSharedValue(1);
```
Shared values are the foundation of Reanimated animations, allowing values to be shared between the JS and UI threads.

### 2. Animated Styles
```typescript
const animatedStyle = useAnimatedStyle(() => ({
  opacity: opacity.value,
  transform: [{ scale: scale.value }],
}));
```
Convert shared values into style properties that can be applied to Animated components.

### 3. Animation Functions
```typescript
// Smooth timing animation
opacity.value = withTiming(1, { duration: 500 });

// Spring physics animation
scale.value = withSpring(1.2, { damping: 15, stiffness: 200 });

// Sequential animations
scale.value = withSequence(
  withTiming(1.3, { duration: 200 }),
  withTiming(1, { duration: 200 })
);
```

### 4. Gesture Integration
```typescript
const panGesture = Gesture.Pan()
  .onUpdate((event) => {
    translateX.value = event.translationX;
    translateY.value = event.translationY;
  })
  .onEnd(() => {
    translateX.value = withSpring(0);
    translateY.value = withSpring(0);
  });
```

### 5. Worklets for Performance
```typescript
const updateParticles = () => {
  'worklet';
  // This function runs on the UI thread
  // for optimal 60fps performance
};
```

## 🎨 Animation Best Practices

### Performance Guidelines
1. **Use Worklets**: Mark performance-critical functions with `'worklet'`
2. **Minimize JS Bridge**: Keep animations on the UI thread
3. **Optimize Interpolations**: Use appropriate extrapolation modes
4. **Batch Updates**: Group related animations together

### UX Considerations
1. **Meaningful Motion**: Animations should serve a purpose
2. **Appropriate Duration**: Match timing to user expectations
3. **Easing Functions**: Use natural movement curves
4. **Accessibility**: Respect reduced motion preferences

### Code Organization
1. **Separate Concerns**: Keep animation logic modular
2. **Reusable Hooks**: Create custom hooks for common patterns
3. **Type Safety**: Leverage TypeScript for animation parameters
4. **Documentation**: Comment complex animation sequences

## 🧪 Testing Animations

### Performance Testing
- Use React Native's performance monitoring tools
- Test on lower-end devices
- Monitor frame rates during complex animations
- Profile memory usage with continuous animations

### User Experience Testing
- Test gesture responsiveness
- Verify animations work across different screen sizes
- Check accessibility compliance
- Validate cross-platform consistency

## 📖 Additional Resources

### Documentation
- [React Native Reanimated Docs](https://docs.swmansion.com/react-native-reanimated/)
- [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)
- [Expo Router Documentation](https://expo.github.io/router/)

### Learning Materials
- [Reanimated 3 Migration Guide](https://docs.swmansion.com/react-native-reanimated/docs/guides/migration)
- [Animation Patterns and Best Practices](https://reactnative.dev/docs/animations)
- [Performance Optimization Tips](https://reactnative.dev/docs/performance)

## 🤝 Contributing

Contributions are welcome! Please read the contributing guidelines and submit pull requests for improvements or additional animation examples.

### Areas for Contribution
- New animation patterns
- Performance optimizations
- Cross-platform compatibility improvements
- Documentation enhancements
- Test coverage

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💡 Tips for Professional Development

1. **Start Simple**: Master basic animations before moving to complex patterns
2. **Performance First**: Always consider the performance impact of animations
3. **User-Centric**: Design animations that enhance user experience
4. **Cross-Platform**: Test animations on both iOS and Android
5. **Accessibility**: Implement proper accessibility support for animations

## 🎓 Course Structure

This project is designed as a progressive learning experience:

1. **Foundation** (Basic Animations): Core concepts and simple patterns
2. **Physics** (Spring Animations): Natural movement and physics-based interactions
3. **Interaction** (Gesture Animations): User-driven animations and feedback
4. **Transitions** (Shared Elements): Screen-to-screen animation patterns
5. **Mastery** (Advanced Techniques): Performance optimization and complex patterns

Each section builds upon the previous one, providing a comprehensive understanding of professional React Native animation development.

---

**Happy Animating! 🎭**

For questions or support, please open an issue in the repository.
