import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
  PixelRatio,
} from 'react-native';
import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import { useWindowDimensions } from 'react-native';
import Colors from '@/constants/Colors';
import { TouchableOpacity } from 'react-native';

export default function HooksScreen() {
  const colorScheme = useColorScheme();
  const windowDimensions = useWindowDimensions();
  
  // useState examples
  const [counter, setCounter] = useState(0);
  const [isToggled, setIsToggled] = useState(false);
  const [textInput, setTextInput] = useState('');
  
  // useRef examples
  const renderCount = useRef(0);
  const previousCounter = useRef(0);
  const intervalRef = useRef<number | null>(null);
  
  // useEffect examples
  const [seconds, setSeconds] = useState(0);
  const [windowEvents, setWindowEvents] = useState<string[]>([]);
  
  useEffect(() => {
    renderCount.current += 1;
  });
  
  useEffect(() => {
    previousCounter.current = counter;
  }, [counter]);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window, screen }) => {
      const event = `Dimensions changed: ${window.width}x${window.height}`;
      setWindowEvents(prev => [event, ...prev].slice(0, 5));
    });
    
    return () => subscription?.remove();
  }, []);
  
  // useCallback example
  const incrementCounter = useCallback(() => {
    setCounter(prev => prev + 1);
  }, []);
  
  const decrementCounter = useCallback(() => {
    setCounter(prev => prev - 1);
  }, []);
  
  const resetCounter = useCallback(() => {
    setCounter(0);
  }, []);
  
  // useMemo examples
  const expensiveCalculation = useMemo(() => {
    console.log('Performing expensive calculation...');
    let result = 0;
    for (let i = 0; i < counter * 1000; i++) {
      result += i;
    }
    return result;
  }, [counter]);
  
  const dimensionInfo = useMemo(() => {
    const { width, height, scale, fontScale } = windowDimensions;
    const pixelRatio = PixelRatio.get();
    const pixelDensity = PixelRatio.getPixelSizeForLayoutSize(1);
    
    return {
      width,
      height,
      scale,
      fontScale,
      pixelRatio,
      pixelDensity,
      aspectRatio: (width / height).toFixed(2),
      isLandscape: width > height,
      isTablet: (width >= 768 && height >= 1024) || (width >= 1024 && height >= 768),
    };
  }, [windowDimensions]);
  
  const colorSchemeInfo = useMemo(() => {
    return {
      current: colorScheme,
      isDark: colorScheme === 'dark',
      isLight: colorScheme === 'light',
      isAuto: colorScheme === null,
      primaryColor: Colors[colorScheme ?? 'light'].tint,
      backgroundColor: Colors[colorScheme ?? 'light'].background,
      textColor: Colors[colorScheme ?? 'light'].text,
    };
  }, [colorScheme]);
  
  // Custom hook simulation
  const useTimer = (initialTime: number = 0) => {
    const [time, setTime] = useState(initialTime);
    const [isRunning, setIsRunning] = useState(false);
    
    useEffect(() => {
      if (isRunning) {
        intervalRef.current = setInterval(() => {
          setTime(prev => prev + 1);
        }, 1000);
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }
      
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }, [isRunning]);
    
    const start = useCallback(() => setIsRunning(true), []);
    const stop = useCallback(() => setIsRunning(false), []);
    const reset = useCallback(() => {
      setTime(0);
      setIsRunning(false);
    }, []);
    
    return { time, isRunning, start, stop, reset };
  };
  
  const timer = useTimer();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native Hooks</Text>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* useState Examples */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>useState Hook</Text>
          
          <View style={styles.counterContainer}>
            <Text style={styles.counterText}>Counter: {counter}</Text>
            <Text style={styles.smallText}>Previous: {previousCounter.current}</Text>
            <Text style={styles.smallText}>Renders: {renderCount.current}</Text>
            
            <View style={styles.buttonRow}>
              <TouchableOpacity 
                style={[styles.smallButton, { backgroundColor: '#e74c3c' }]} 
                onPress={decrementCounter}
              >
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.smallButton, { backgroundColor: '#2ecc71' }]} 
                onPress={incrementCounter}
              >
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.smallButton, { backgroundColor: '#95a5a6' }]} 
                onPress={resetCounter}
              >
                <Text style={styles.buttonText}>Reset</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <TouchableOpacity 
            style={[styles.button, { 
              backgroundColor: isToggled ? '#27ae60' : '#95a5a6' 
            }]} 
            onPress={() => setIsToggled(!isToggled)}
          >
            <Text style={styles.buttonText}>
              Toggle: {isToggled ? 'ON' : 'OFF'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* useEffect Examples */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>useEffect Hook</Text>
          
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>Timer (runs every second): {seconds}s</Text>
            <Text style={styles.infoText}>Component renders: {renderCount.current}</Text>
          </View>
          
          {windowEvents.length > 0 && (
            <View style={styles.infoCard}>
              <Text style={styles.infoText}>Recent window events:</Text>
              {windowEvents.map((event, index) => (
                <Text key={index} style={styles.eventText}>• {event}</Text>
              ))}
            </View>
          )}
        </View>

        {/* useWindowDimensions Hook */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>useWindowDimensions Hook</Text>
          
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>Width: {dimensionInfo.width}px</Text>
            <Text style={styles.infoText}>Height: {dimensionInfo.height}px</Text>
            <Text style={styles.infoText}>Scale: {dimensionInfo.scale}</Text>
            <Text style={styles.infoText}>Font Scale: {dimensionInfo.fontScale}</Text>
            <Text style={styles.infoText}>Pixel Ratio: {dimensionInfo.pixelRatio}</Text>
            <Text style={styles.infoText}>Aspect Ratio: {dimensionInfo.aspectRatio}</Text>
            <Text style={styles.infoText}>Orientation: {dimensionInfo.isLandscape ? 'Landscape' : 'Portrait'}</Text>
            <Text style={styles.infoText}>Device Type: {dimensionInfo.isTablet ? 'Tablet' : 'Phone'}</Text>
          </View>
        </View>

        {/* useColorScheme Hook */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>useColorScheme Hook</Text>
          
          <View style={[styles.colorSchemeDemo, { 
            backgroundColor: colorSchemeInfo.backgroundColor,
            borderColor: colorSchemeInfo.primaryColor 
          }]}>
            <Text style={[styles.colorSchemeText, { color: colorSchemeInfo.textColor }]}>
              Current Scheme: {colorSchemeInfo.current || 'System Default'}
            </Text>
            <Text style={[styles.smallText, { color: colorSchemeInfo.textColor }]}>
              Is Dark: {colorSchemeInfo.isDark ? 'Yes' : 'No'}
            </Text>
            <Text style={[styles.smallText, { color: colorSchemeInfo.textColor }]}>
              Primary Color: {colorSchemeInfo.primaryColor}
            </Text>
          </View>
        </View>

        {/* useMemo Examples */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>useMemo Hook</Text>
          
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>
              Expensive calculation result: {expensiveCalculation.toLocaleString()}
            </Text>
            <Text style={styles.smallText}>
              (This only recalculates when counter changes)
            </Text>
          </View>
        </View>

        {/* Custom Hook Example */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Custom Hook (useTimer)</Text>
          
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>Timer: {timer.time}s</Text>
            <Text style={styles.smallText}>Status: {timer.isRunning ? 'Running' : 'Stopped'}</Text>
            
            <View style={styles.buttonRow}>
              <TouchableOpacity 
                style={[styles.smallButton, { backgroundColor: '#2ecc71' }]} 
                onPress={timer.start}
                disabled={timer.isRunning}
              >
                <Text style={styles.buttonText}>Start</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.smallButton, { backgroundColor: '#e74c3c' }]} 
                onPress={timer.stop}
                disabled={!timer.isRunning}
              >
                <Text style={styles.buttonText}>Stop</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.smallButton, { backgroundColor: '#95a5a6' }]} 
                onPress={timer.reset}
              >
                <Text style={styles.buttonText}>Reset</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Hook Rules and Best Practices */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hook Rules & Best Practices</Text>
          
          <View style={styles.rulesCard}>
            <Text style={styles.ruleTitle}>Rules of Hooks:</Text>
            <Text style={styles.ruleText}>1. Only call hooks at the top level</Text>
            <Text style={styles.ruleText}>2. Only call hooks from React functions</Text>
            <Text style={styles.ruleText}>3. Use dependency arrays correctly</Text>
            
            <Text style={styles.ruleTitle}>Best Practices:</Text>
            <Text style={styles.ruleText}>• Use useCallback for event handlers</Text>
            <Text style={styles.ruleText}>• Use useMemo for expensive calculations</Text>
            <Text style={styles.ruleText}>• Clean up effects to prevent memory leaks</Text>
            <Text style={styles.ruleText}>• Create custom hooks for reusable logic</Text>
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
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 5,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  eventText: {
    fontSize: 12,
    marginLeft: 10,
    marginBottom: 3,
    color: '#666',
  },
  counterContainer: {
    backgroundColor: 'rgba(52, 152, 219, 0.1)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  counterText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  smallText: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 3,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 10,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  smallButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  colorSchemeDemo: {
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    marginVertical: 10,
  },
  colorSchemeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  timerContainer: {
    backgroundColor: 'rgba(155, 89, 182, 0.1)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  rulesCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    padding: 15,
    borderRadius: 10,
  },
  ruleTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 8,
    color: '#333',
  },
  ruleText: {
    fontSize: 14,
    marginBottom: 5,
    marginLeft: 10,
  },
});
