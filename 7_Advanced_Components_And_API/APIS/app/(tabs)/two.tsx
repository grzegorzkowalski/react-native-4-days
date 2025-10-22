import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  ScrollView,
  Animated,
  Easing,
  LayoutAnimation,
  Platform,
  UIManager,
  PanResponder,
  TouchableOpacity,
} from 'react-native';
import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function AnimationScreen() {
  const colorScheme = useColorScheme();
  
  // Animated Values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const colorAnim = useRef(new Animated.Value(0)).current;
  
  // State for layout animation and tracking values
  const [expanded, setExpanded] = useState(false);
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);
  const [rotateValue, setRotateValue] = useState(0);
  const [colorValue, setColorValue] = useState(0);
  const [fadeValue, setFadeValue] = useState(0);
  const [scaleValue, setScaleValue] = useState(1);

  // PanResponder for dragging
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        // Get current values and set offset
        const currentX = (translateAnim.x as any)._value || 0;
        const currentY = (translateAnim.y as any)._value || 0;
        translateAnim.setOffset({ x: currentX, y: currentY });
      },
      onPanResponderMove: Animated.event(
        [null, { dx: translateAnim.x, dy: translateAnim.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        translateAnim.flattenOffset();
        // Spring back to center
        Animated.spring(translateAnim, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  // Animation functions
  const fadeIn = () => {
    setFadeValue(1);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const fadeOut = () => {
    setFadeValue(0);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const scaleUp = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.5,
        duration: 500,
        easing: Easing.out(Easing.quad),
        useNativeDriver: false,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.bounce,
        useNativeDriver: false,
      }),
    ]).start(() => setScaleValue(1));
  };

  const rotate = () => {
    const newValue = rotateValue === 0 ? 1 : 0;
    setRotateValue(newValue);
    Animated.timing(rotateAnim, {
      toValue: newValue,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const animateColor = () => {
    const newValue = colorValue === 0 ? 1 : 0;
    setColorValue(newValue);
    Animated.timing(colorAnim, {
      toValue: newValue,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const parallelAnimation = () => {
    const newFade = fadeValue === 0 ? 1 : 0;
    const newScale = scaleValue === 1 ? 1.5 : 1;
    const newRotate = rotateValue === 0 ? 1 : 0;
    
    setFadeValue(newFade);
    setScaleValue(newScale);
    setRotateValue(newRotate);
    
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: newFade,
        duration: 1000,
        useNativeDriver: false,
      }),
      Animated.timing(scaleAnim, {
        toValue: newScale,
        duration: 1000,
        useNativeDriver: false,
      }),
      Animated.timing(rotateAnim, {
        toValue: newRotate,
        duration: 1000,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const layoutAnimation = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const addItem = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setItems([...items, `Item ${items.length + 1}`]);
  };

  const removeItem = () => {
    if (items.length > 1) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setItems(items.slice(0, -1));
    }
  };

  // Interpolated values
  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const backgroundColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#3498db', '#e74c3c'],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Animation APIs</Text>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* Animated.Value Examples */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Animated.Value Examples</Text>
          
          <View style={styles.animationContainer}>
            <Animated.View
              style={[
                styles.animatedBox,
                {
                  opacity: fadeAnim,
                  transform: [
                    { scale: scaleAnim },
                    { rotate: rotation },
                  ],
                  backgroundColor: backgroundColor,
                },
              ]}
            >
              <Text style={styles.boxText}>🎭</Text>
            </Animated.View>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={[styles.smallButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]} 
              onPress={fadeIn}
            >
              <Text style={styles.buttonText}>Fade In</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.smallButton, { backgroundColor: '#e74c3c' }]} 
              onPress={fadeOut}
            >
              <Text style={styles.buttonText}>Fade Out</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={[styles.smallButton, { backgroundColor: '#2ecc71' }]} 
              onPress={scaleUp}
            >
              <Text style={styles.buttonText}>Scale</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.smallButton, { backgroundColor: '#f39c12' }]} 
              onPress={rotate}
            >
              <Text style={styles.buttonText}>Rotate</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.button, { backgroundColor: '#9b59b6' }]} 
            onPress={animateColor}
          >
            <Text style={styles.buttonText}>Animate Color</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, { backgroundColor: '#34495e' }]} 
            onPress={parallelAnimation}
          >
            <Text style={styles.buttonText}>Parallel Animation</Text>
          </TouchableOpacity>
        </View>

        {/* Animated.ValueXY with PanResponder */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Animated.ValueXY + PanResponder</Text>
          <Text style={styles.description}>Drag the box around!</Text>
          
          <View style={styles.panContainer}>
            <Animated.View
              style={[
                styles.draggableBox,
                {
                  transform: translateAnim.getTranslateTransform(),
                },
              ]}
              {...panResponder.panHandlers}
            >
              <Text style={styles.boxText}>👆</Text>
            </Animated.View>
          </View>
        </View>

        {/* Layout Animation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>LayoutAnimation</Text>
          
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]} 
            onPress={layoutAnimation}
          >
            <Text style={styles.buttonText}>Toggle Layout</Text>
          </TouchableOpacity>

          <View style={[styles.expandableContainer, expanded && styles.expanded]}>
            <Text style={styles.expandableText}>
              {expanded 
                ? 'This container expanded with LayoutAnimation! LayoutAnimation provides smooth transitions when layout properties change.'
                : 'Tap to expand'
              }
            </Text>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={[styles.smallButton, { backgroundColor: '#2ecc71' }]} 
              onPress={addItem}
            >
              <Text style={styles.buttonText}>Add Item</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.smallButton, { backgroundColor: '#e74c3c' }]} 
              onPress={removeItem}
            >
              <Text style={styles.buttonText}>Remove Item</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.itemsContainer}>
            {items.map((item, index) => (
              <View key={item} style={styles.listItem}>
                <Text style={styles.itemText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Easing Examples */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Easing Functions</Text>
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>• Easing.linear - Constant speed</Text>
            <Text style={styles.infoText}>• Easing.ease - Default easing</Text>
            <Text style={styles.infoText}>• Easing.quad - Quadratic</Text>
            <Text style={styles.infoText}>• Easing.cubic - Cubic</Text>
            <Text style={styles.infoText}>• Easing.bounce - Bouncy effect</Text>
            <Text style={styles.infoText}>• Easing.back - Overshoot</Text>
            <Text style={styles.infoText}>• Easing.elastic - Spring-like</Text>
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
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 15,
    textAlign: 'center',
  },
  animationContainer: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  animatedBox: {
    width: 80,
    height: 80,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    fontSize: 32,
  },
  panContainer: {
    height: 200,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  draggableBox: {
    width: 60,
    height: 60,
    backgroundColor: '#3498db',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  expandableContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    padding: 15,
    borderRadius: 10,
    marginVertical: 15,
    minHeight: 50,
  },
  expanded: {
    minHeight: 120,
  },
  expandableText: {
    fontSize: 14,
    textAlign: 'center',
  },
  itemsContainer: {
    marginTop: 15,
  },
  listItem: {
    backgroundColor: 'rgba(52, 152, 219, 0.1)',
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 14,
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    padding: 15,
    borderRadius: 10,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 5,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
});
