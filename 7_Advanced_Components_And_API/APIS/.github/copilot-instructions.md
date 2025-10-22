# React Native APIs Showcase - Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a React Native application built with Expo that showcases comprehensive examples of React Native APIs, organized into four main categories:

### App Structure
- **Core APIs Tab**: Platform, Dimensions, Alert, Share, Vibration, AccessibilityInfo, AppState, DevSettings, I18nManager, InteractionManager, Keyboard, Linking, PixelRatio, PlatformColor, Systrace, and more
- **Animation Tab**: Animated, Animated.Value, Animated.ValueXY, Easing, LayoutAnimation, PanResponder examples with interactive demos
- **Platform Tab**: Platform-specific APIs including Android (ToastAndroid, BackHandler, PermissionsAndroid) and iOS (ActionSheetIOS, Settings) APIs
- **Hooks Tab**: React Native hooks including useColorScheme, useWindowDimensions, plus standard React hooks with practical examples

### Code Guidelines
- Use TypeScript for all new code
- Follow React Native best practices
- Implement proper error handling for platform-specific APIs
- Include comprehensive examples with interactive demonstrations
- Use proper cleanup in useEffect hooks
- Follow Material Design principles for Android and Human Interface Guidelines for iOS

### API Usage Patterns
- Always check Platform.OS before using platform-specific APIs
- Use proper TypeScript types for all API responses
- Implement fallbacks for unsupported platforms
- Include informative error messages and user feedback
- Demonstrate both basic and advanced usage patterns

### Testing Approach
- Test on both iOS and Android using Expo Go
- Verify platform-specific features work correctly
- Ensure responsive design across different screen sizes
- Test with both light and dark color schemes

When generating code for this project, prioritize:
1. Educational value with clear, commented examples
2. Cross-platform compatibility with proper platform checks
3. Type safety using TypeScript
4. User-friendly interfaces with proper feedback
5. Comprehensive demonstration of API capabilities
