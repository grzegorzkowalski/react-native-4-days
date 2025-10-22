import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
  ToastAndroid,
  BackHandler,
  PermissionsAndroid,
  ActionSheetIOS,
  Settings,
} from 'react-native';
import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { TouchableOpacity } from 'react-native';

export default function PlatformScreen() {
  const colorScheme = useColorScheme();
  const [backHandlerEnabled, setBackHandlerEnabled] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState<string>('Not checked');

  React.useEffect(() => {
    let backHandler: any;
    
    if (Platform.OS === 'android' && backHandlerEnabled) {
      backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        Alert.alert('Back Handler', 'Back button was pressed!');
        return true; // Prevent default behavior
      });
    }

    return () => {
      if (backHandler) {
        backHandler.remove();
      }
    };
  }, [backHandlerEnabled]);

  // Android-specific functions
  const showToast = () => {
    if (Platform.OS === 'android') {
      ToastAndroid.show('Hello from Android Toast!', ToastAndroid.SHORT);
    } else {
      Alert.alert('Toast', 'This is an Android-only feature');
    }
  };

  const showLongToast = () => {
    if (Platform.OS === 'android') {
      ToastAndroid.showWithGravity(
        'Long toast with gravity!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
    } else {
      Alert.alert('Toast', 'This is an Android-only feature');
    }
  };

  const toggleBackHandler = () => {
    if (Platform.OS === 'android') {
      setBackHandlerEnabled(!backHandlerEnabled);
    } else {
      Alert.alert('Back Handler', 'This is an Android-only feature');
    }
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to your camera',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setPermissionStatus('Camera permission granted');
        } else {
          setPermissionStatus('Camera permission denied');
        }
      } catch (err) {
        setPermissionStatus('Error requesting permission');
      }
    } else {
      Alert.alert('Permissions', 'PermissionsAndroid is Android-only');
    }
  };

  const checkAllPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const permissions = [
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ];
        
        const results = await PermissionsAndroid.requestMultiple(permissions);
        
        let status = 'Permissions: ';
        Object.entries(results).forEach(([permission, result]) => {
          const permissionName = permission.split('.').pop();
          status += `\n${permissionName}: ${result}`;
        });
        
        setPermissionStatus(status);
      } catch (err) {
        setPermissionStatus('Error checking permissions');
      }
    } else {
      Alert.alert('Permissions', 'PermissionsAndroid is Android-only');
    }
  };

  // iOS-specific functions
  const showActionSheet = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Option 1', 'Option 2', 'Delete'],
          destructiveButtonIndex: 3,
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            Alert.alert('Action Sheet', 'Option 1 selected');
          } else if (buttonIndex === 2) {
            Alert.alert('Action Sheet', 'Option 2 selected');
          } else if (buttonIndex === 3) {
            Alert.alert('Action Sheet', 'Delete selected');
          }
        }
      );
    } else {
      Alert.alert('Action Sheet', 'This is an iOS-only feature');
    }
  };

  const showShareSheet = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showShareActionSheetWithOptions(
        {
          url: 'https://reactnative.dev',
          message: 'Check out React Native!',
        },
        (error) => {
          Alert.alert('Error', error.message);
        },
        (success, method) => {
          if (success) {
            Alert.alert('Success', `Shared via ${method}`);
          }
        }
      );
    } else {
      Alert.alert('Share Sheet', 'This is an iOS-only feature');
    }
  };

  const accessIOSSettings = () => {
    if (Platform.OS === 'ios') {
      try {
        const userDefaults = Settings.get('AppleLanguages');
        Alert.alert('iOS Settings', `Language: ${JSON.stringify(userDefaults)}`);
      } catch (error) {
        Alert.alert('Settings', 'Could not access iOS settings');
      }
    } else {
      Alert.alert('Settings', 'This is an iOS-only feature');
    }
  };

  const setIOSSetting = () => {
    if (Platform.OS === 'ios') {
      Settings.set({
        'MyAppSetting': 'Hello from React Native'
      });
      Alert.alert('Settings', 'Custom setting saved to iOS Settings');
    } else {
      Alert.alert('Settings', 'This is an iOS-only feature');
    }
  };

  // Platform color examples
  const getPlatformColor = () => {
    if (Platform.OS === 'ios') {
      return {
        color: 'systemBlue',
        backgroundColor: 'systemBackground',
      };
    } else {
      return {
        color: '#2196F3',
        backgroundColor: colorScheme === 'dark' ? '#121212' : '#FFFFFF',
      };
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Platform-Specific APIs</Text>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* Platform Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Platform Information</Text>
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>OS: {Platform.OS}</Text>
            <Text style={styles.infoText}>Version: {Platform.Version}</Text>
            <Text style={styles.infoText}>Is TV: {Platform.isTV ? 'Yes' : 'No'}</Text>
            <Text style={styles.infoText}>Is Testing: {Platform.isTesting ? 'Yes' : 'No'}</Text>
            {Platform.OS === 'ios' && (
              <Text style={styles.infoText}>Is Pad: {Platform.isPad ? 'Yes' : 'No'}</Text>
            )}
            {Platform.OS === 'android' && (
              <Text style={styles.infoText}>API Level: {Platform.Version}</Text>
            )}
          </View>
        </View>

        {/* Android APIs */}
        {Platform.OS === 'android' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🤖 Android APIs</Text>
            
            <TouchableOpacity 
              style={[styles.button, { backgroundColor: '#4CAF50' }]} 
              onPress={showToast}
            >
              <Text style={styles.buttonText}>Show Toast (Short)</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, { backgroundColor: '#2196F3' }]} 
              onPress={showLongToast}
            >
              <Text style={styles.buttonText}>Show Toast (Long + Gravity)</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, { 
                backgroundColor: backHandlerEnabled ? '#F44336' : '#FF9800' 
              }]} 
              onPress={toggleBackHandler}
            >
              <Text style={styles.buttonText}>
                {backHandlerEnabled ? 'Disable' : 'Enable'} Back Handler
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, { backgroundColor: '#9C27B0' }]} 
              onPress={requestCameraPermission}
            >
              <Text style={styles.buttonText}>Request Camera Permission</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, { backgroundColor: '#607D8B' }]} 
              onPress={checkAllPermissions}
            >
              <Text style={styles.buttonText}>Check Multiple Permissions</Text>
            </TouchableOpacity>

            <View style={styles.infoCard}>
              <Text style={styles.infoText}>Permission Status:</Text>
              <Text style={styles.statusText}>{permissionStatus}</Text>
            </View>
          </View>
        )}

        {/* iOS APIs */}
        {Platform.OS === 'ios' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🍎 iOS APIs</Text>
            
            <TouchableOpacity 
              style={[styles.button, { backgroundColor: '#007AFF' }]} 
              onPress={showActionSheet}
            >
              <Text style={styles.buttonText}>Show Action Sheet</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, { backgroundColor: '#34C759' }]} 
              onPress={showShareSheet}
            >
              <Text style={styles.buttonText}>Show Share Sheet</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, { backgroundColor: '#FF3B30' }]} 
              onPress={accessIOSSettings}
            >
              <Text style={styles.buttonText}>Access iOS Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, { backgroundColor: '#FF9500' }]} 
              onPress={setIOSSetting}
            >
              <Text style={styles.buttonText}>Set Custom Setting</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Cross-platform APIs with platform differences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cross-Platform with Differences</Text>
          
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>Platform.select() example:</Text>
            <Text style={styles.codeText}>
              {Platform.select({
                ios: 'iOS-specific implementation',
                android: 'Android-specific implementation',
                default: 'Default implementation'
              })}
            </Text>
          </View>

          <View style={[styles.platformColorDemo, getPlatformColor()]}>
            <Text style={[styles.platformColorText, { color: getPlatformColor().color }]}>
              Platform Color Demo
            </Text>
            <Text style={styles.smallText}>
              This uses {Platform.OS === 'ios' ? 'iOS system colors' : 'Material Design colors'}
            </Text>
          </View>
        </View>

        {/* Available APIs by Platform */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available APIs by Platform</Text>
          
          <View style={styles.apiList}>
            <Text style={styles.apiCategory}>Android Only:</Text>
            <Text style={styles.apiItem}>• ToastAndroid</Text>
            <Text style={styles.apiItem}>• BackHandler</Text>
            <Text style={styles.apiItem}>• PermissionsAndroid</Text>
            
            <Text style={styles.apiCategory}>iOS Only:</Text>
            <Text style={styles.apiItem}>• ActionSheetIOS</Text>
            <Text style={styles.apiItem}>• Settings</Text>
            <Text style={styles.apiItem}>• DynamicColorIOS</Text>
            
            <Text style={styles.apiCategory}>Cross-Platform:</Text>
            <Text style={styles.apiItem}>• Platform</Text>
            <Text style={styles.apiItem}>• PlatformColor</Text>
            <Text style={styles.apiItem}>• Alert (with platform differences)</Text>
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
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  infoCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 5,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  statusText: {
    fontSize: 14,
    marginTop: 5,
    fontStyle: 'italic',
    color: '#666',
  },
  codeText: {
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 8,
    borderRadius: 4,
    marginTop: 5,
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
  platformColorDemo: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  platformColorText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  smallText: {
    fontSize: 12,
    opacity: 0.7,
  },
  apiList: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    padding: 15,
    borderRadius: 10,
  },
  apiCategory: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
  },
  apiItem: {
    fontSize: 14,
    marginLeft: 10,
    marginBottom: 3,
  },
});
