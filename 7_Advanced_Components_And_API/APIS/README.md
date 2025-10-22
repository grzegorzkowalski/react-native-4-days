# React Native APIs Showcase

A comprehensive React Native application demonstrating all major React Native APIs with interactive examples and code samples. Built with Expo and TypeScript for cross-platform compatibility.

## 🚀 Features

### Core APIs Tab
- **Platform Information**: OS detection, version info, device capabilities
- **Dimensions**: Screen dimensions, pixel density, responsive design
- **App State Management**: App lifecycle, keyboard events, background/foreground states
- **User Interactions**: Alert dialogs, Share functionality, Vibration patterns
- **Accessibility**: Screen reader support, accessibility preferences
- **Navigation**: Deep linking, URL handling, Inter-app communication
- **Internationalization**: RTL support, localization utilities

### Animation Tab
- **Animated.Value**: Fade, scale, rotation, color interpolation
- **Animated.ValueXY**: 2D transformations with PanResponder
- **Easing Functions**: Various timing curves and animation styles
- **Layout Animations**: Automatic transitions for layout changes
- **Interactive Demos**: Touch-driven animations with real-time feedback
- **Parallel & Sequence**: Complex animation combinations

### Platform-Specific APIs Tab
#### Android APIs
- **ToastAndroid**: Native Android toast messages
- **BackHandler**: Hardware back button handling
- **PermissionsAndroid**: Runtime permission requests

#### iOS APIs  
- **ActionSheetIOS**: Native iOS action sheets
- **Settings**: iOS Settings app integration
- **Platform Colors**: Dynamic color system support

#### Cross-Platform
- **Platform.select()**: Platform-specific implementations
- **PlatformColor**: Adaptive color schemes

### React Hooks Tab
- **useState**: State management with counters and toggles
- **useEffect**: Lifecycle management, timers, event listeners
- **useWindowDimensions**: Responsive design and orientation handling
- **useColorScheme**: Dark/light mode detection and theming
- **useMemo**: Performance optimization for expensive calculations
- **useCallback**: Event handler optimization
- **Custom Hooks**: Reusable timer logic example

## 📱 Getting Started

### Prerequisites
- Node.js 18+ 
- Expo CLI
- Expo Go app on your mobile device

### Installation

1. **Clone and navigate to the project**:
   ```bash
   cd rn_apis
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   # or
   npx expo start
   ```

3. **Run on device**:
   - Scan the QR code with Expo Go app
   - Or press `a` for Android emulator
   - Or press `i` for iOS simulator

## 🏗️ Project Structure

```
rn_apis/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx        # Core APIs
│   │   ├── animation.tsx    # Animation examples
│   │   ├── platform.tsx     # Platform-specific APIs
│   │   ├── hooks.tsx        # React Native hooks
│   │   └── _layout.tsx      # Tab navigation
│   ├── _layout.tsx          # Root layout
│   └── modal.tsx            # Modal example
├── components/              # Reusable components
├── constants/              # App constants and colors
└── assets/                # Images and static files
```

## 🔧 Technologies Used

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **TypeScript**: Type-safe JavaScript
- **Expo Router**: File-based navigation
- **React Native Reanimated**: High-performance animations (ready for integration)

## 📖 API Coverage

### Core React Native APIs
- AccessibilityInfo
- Alert
- Animated & Animated.Value/ValueXY
- Appearance  
- AppRegistry
- AppState
- DevSettings
- Dimensions
- Easing
- I18nManager
- InteractionManager
- Keyboard
- LayoutAnimation
- Linking
- PanResponder
- PixelRatio
- Platform & PlatformColor
- Share
- StyleSheet
- Systrace
- Transforms
- Vibration

### Platform-Specific APIs
#### Android
- BackHandler
- PermissionsAndroid
- ToastAndroid

#### iOS
- ActionSheetIOS
- DynamicColorIOS (planned)
- Settings

### React Hooks
- useColorScheme
- useWindowDimensions
- useState, useEffect, useMemo, useCallback
- Custom hooks examples

## 🎯 Learning Objectives

This app serves as a comprehensive reference for:

1. **Understanding React Native APIs**: See practical implementations of all major APIs
2. **Cross-platform Development**: Learn platform-specific API usage patterns
3. **Animation Techniques**: Master different animation approaches
4. **Hook Patterns**: Understand React Native hook usage and custom hook creation
5. **TypeScript Integration**: See proper typing for React Native APIs
6. **Responsive Design**: Learn dimension handling and adaptive layouts
7. **Performance Optimization**: Understand memoization and callback patterns

## 🔄 Development

### Adding New Examples

1. Choose the appropriate tab (Core APIs, Animation, Platform, or Hooks)
2. Add your example component following the existing patterns
3. Include:
   - Clear documentation and comments
   - Error handling
   - Platform compatibility checks
   - TypeScript types
   - Interactive demonstrations

### Code Style

- Use TypeScript for all new code
- Follow React Native best practices
- Include comprehensive error handling
- Add explanatory comments for educational value
- Test on both platforms when using platform-specific APIs

## 🚀 Deployment

For production deployment:

```bash
# Build for production
npx expo build:android
npx expo build:ios

# Or use EAS Build (recommended)
npx eas build --platform all
```

## 📚 Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev/)
- [React Native APIs Reference](https://reactnative.dev/docs/accessibilityinfo)
- [Expo Go App](https://expo.dev/client)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add your API examples
4. Test on multiple platforms
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Note**: This is an educational project designed to demonstrate React Native API usage patterns. Some APIs may have platform limitations or require specific permissions in production applications.
