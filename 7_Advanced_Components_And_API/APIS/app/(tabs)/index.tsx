import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  Alert,
  Share,
  Vibration,
  AccessibilityInfo,
  AppState,
  DevSettings,
  Dimensions,
  I18nManager,
  InteractionManager,
  Keyboard,
  Linking,
  PixelRatio,
  Platform,
  PlatformColor,
  Systrace,
  TouchableOpacity,
} from 'react-native';
import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

export default function CoreAPIsScreen() {
  const colorScheme = useColorScheme();
  const [appState, setAppState] = useState(AppState.currentState);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  React.useEffect(() => {
    // App State listener
    const appStateSubscription = AppState.addEventListener('change', setAppState);

    // Keyboard listeners
    const keyboardDidShow = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHide = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    // Dimensions listener
    const dimensionsSubscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });

    return () => {
      appStateSubscription?.remove();
      keyboardDidShow.remove();
      keyboardDidHide.remove();
      dimensionsSubscription?.remove();
    };
  }, []);

  const showAlert = () => {
    Alert.alert(
      'Alert Title',
      'This is an alert message',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', style: 'default' },
      ]
    );
  };

  const shareContent = async () => {
    try {
      await Share.share({
        message: 'Check out this React Native app!',
        url: 'https://reactnative.dev',
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share');
    }
  };

  const vibratePhone = () => {
    if (Platform.OS === 'ios') {
      Vibration.vibrate();
    } else {
      Vibration.vibrate([100, 200, 100]);
    }
  };

  const openLink = async () => {
    const url = 'https://reactnative.dev';
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      Linking.openURL(url);
    } else {
      Alert.alert('Error', 'Cannot open URL');
    }
  };

  const checkAccessibility = async () => {
    try {
      const isScreenReaderEnabled = await AccessibilityInfo.isScreenReaderEnabled();
      const isReduceMotionEnabled = await AccessibilityInfo.isReduceMotionEnabled();
      
      Alert.alert(
        'Accessibility Info',
        `Screen Reader: ${isScreenReaderEnabled ? 'Enabled' : 'Disabled'}\nReduce Motion: ${isReduceMotionEnabled ? 'Enabled' : 'Disabled'}`
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to get accessibility info');
    }
  };

  const testInteractionManager = () => {
    InteractionManager.runAfterInteractions(() => {
      Alert.alert('Interaction Manager', 'This runs after all interactions are complete');
    });
  };

  const toggleRTL = () => {
    I18nManager.forceRTL(!I18nManager.isRTL);
    Alert.alert('RTL Toggle', 'App needs to reload to see changes');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Core React Native APIs</Text>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* Platform Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Platform Information</Text>
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>Platform: {Platform.OS}</Text>
            <Text style={styles.infoText}>Version: {Platform.Version}</Text>
            <Text style={styles.infoText}>Is TV: {Platform.isTV ? 'Yes' : 'No'}</Text>
            <Text style={styles.infoText}>Is Testing: {Platform.isTesting ? 'Yes' : 'No'}</Text>
          </View>
        </View>

        {/* Dimensions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dimensions</Text>
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>Width: {dimensions.width.toFixed(0)}px</Text>
            <Text style={styles.infoText}>Height: {dimensions.height.toFixed(0)}px</Text>
            <Text style={styles.infoText}>Scale: {dimensions.scale}</Text>
            <Text style={styles.infoText}>Font Scale: {dimensions.fontScale}</Text>
            <Text style={styles.infoText}>Pixel Ratio: {PixelRatio.get()}</Text>
          </View>
        </View>

        {/* App State Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App State</Text>
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>Current State: {appState}</Text>
            <Text style={styles.infoText}>Keyboard Visible: {keyboardVisible ? 'Yes' : 'No'}</Text>
            <Text style={styles.infoText}>RTL Layout: {I18nManager.isRTL ? 'Yes' : 'No'}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interactive APIs</Text>
          
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]} 
            onPress={showAlert}
          >
            <Text style={styles.buttonText}>Show Alert</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, { backgroundColor: '#4CAF50' }]} 
            onPress={shareContent}
          >
            <Text style={styles.buttonText}>Share Content</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, { backgroundColor: '#FF9800' }]} 
            onPress={vibratePhone}
          >
            <Text style={styles.buttonText}>Vibrate Device</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, { backgroundColor: '#2196F3' }]} 
            onPress={openLink}
          >
            <Text style={styles.buttonText}>Open Link</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, { backgroundColor: '#9C27B0' }]} 
            onPress={checkAccessibility}
          >
            <Text style={styles.buttonText}>Check Accessibility</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, { backgroundColor: '#607D8B' }]} 
            onPress={testInteractionManager}
          >
            <Text style={styles.buttonText}>Test InteractionManager</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, { backgroundColor: '#795548' }]} 
            onPress={toggleRTL}
          >
            <Text style={styles.buttonText}>Toggle RTL Layout</Text>
          </TouchableOpacity>

          {__DEV__ && (
            <TouchableOpacity 
              style={[styles.button, { backgroundColor: '#F44336' }]} 
              onPress={() => DevSettings.reload()}
            >
              <Text style={styles.buttonText}>Reload App (Dev Only)</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* StyleSheet and RootTag Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Info</Text>
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>StyleSheet hairlineWidth: {StyleSheet.hairlineWidth}</Text>
            <Text style={styles.infoText}>Systrace available: {typeof Systrace !== 'undefined' ? 'Yes' : 'No'}</Text>
          </View>
        </View>
      </ScrollView>
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
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  infoCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 5,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  button: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
