import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions,
  Animated 
} from "react-native";

const { width } = Dimensions.get("window");

const UseLayoutEffectExample: React.FC = () => {
  const [measurements, setMeasurements] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  
  // States for flicker demo
  const [useLayoutEffectDemo, setUseLayoutEffectDemo] = useState(true);
  const [boxPosition, setBoxPosition] = useState({ x: 0, y: 0 });
  const [shouldAnimate, setShouldAnimate] = useState(false);
  
  const viewRef = useRef<View>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const animatedBoxRef = useRef<View>(null);
  const animatedValue = useRef(new Animated.Value(0)).current;

  // useLayoutEffect runs synchronously after all DOM mutations
  // but before the browser paints - perfect for measurements
  useLayoutEffect(() => {
    console.log("useLayoutEffect: Measuring component...");
    
    if (viewRef.current) {
      // Measure the component dimensions
      viewRef.current.measure((x, y, width, height) => {
        console.log("Measured dimensions:", { width, height });
        setMeasurements({ width, height });
        setIsLayoutReady(true);
      });
    }
  }, []); // Only run once after mount

  // Demonstrate difference: useEffect would run after paint
  React.useEffect(() => {
    console.log("useEffect: This runs after useLayoutEffect and paint");
  }, []);

  // Flicker demo with useLayoutEffect (no flicker)
  useLayoutEffect(() => {
    if (useLayoutEffectDemo && animatedBoxRef.current && shouldAnimate) {
      console.log("useLayoutEffect: Measuring and positioning BEFORE paint");
      animatedBoxRef.current.measure((x, y, width, height, pageX, pageY) => {
        // Calculate new position instantly before paint
        const newX = Math.random() * (Dimensions.get('window').width - 100 - 40);
        const newY = pageY + height + 10;
        setBoxPosition({ x: newX, y: newY });
        
        // Start animation immediately
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }).start();
      });
    }
  }, [shouldAnimate, useLayoutEffectDemo]);

  // Flicker demo with useEffect (causes flicker)
  useEffect(() => {
    if (!useLayoutEffectDemo && animatedBoxRef.current && shouldAnimate) {
      console.log("useEffect: Measuring and positioning AFTER paint (causes flicker)");
      // This runs after paint, causing visible flicker
      setTimeout(() => {
        animatedBoxRef.current?.measure((x, y, width, height, pageX, pageY) => {
          const newX = Math.random() * (Dimensions.get('window').width - 100 - 40);
          const newY = pageY + height + 10;
          setBoxPosition({ x: newX, y: newY });
          
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
          }).start();
        });
      }, 0); // Even with 0 timeout, this creates flicker
    }
  }, [shouldAnimate, useLayoutEffectDemo]);

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  const triggerAnimation = () => {
    // Reset animation
    animatedValue.setValue(0);
    setShouldAnimate(false);
    
    // Trigger new animation
    setTimeout(() => {
      setShouldAnimate(true);
    }, 100);
  };

  const toggleEffectType = () => {
    setUseLayoutEffectDemo(!useLayoutEffectDemo);
    // Reset animation state
    animatedValue.setValue(0);
    setShouldAnimate(false);
  };

  const generateContent = () => {
    const items: React.ReactElement[] = [];
    for (let i = 0; i < 50; i++) {
      items.push(
        <View key={i} style={styles.contentItem}>
          <Text style={styles.contentText}>Item {i + 1}</Text>
          <Text style={styles.contentSubtext}>
            This is some content to make the scroll view scrollable
          </Text>
        </View>
      );
    }
    return items;
  };

  return (
    <ScrollView style={styles.outerContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>useLayoutEffect Example</Text>
        
        <Text style={styles.explanation}>
          useLayoutEffect runs synchronously before paint, perfect for measurements
        </Text>

        {/* Measured component */}
        <View 
          ref={viewRef}
          style={styles.measuredContainer}
        >
          <Text style={styles.measuredTitle}>Measured Component</Text>
          {measurements ? (
            <View>
              <Text style={styles.measurementText}>
                Width: {Math.round(measurements.width)}px
              </Text>
              <Text style={styles.measurementText}>
                Height: {Math.round(measurements.height)}px
              </Text>
              <Text style={styles.statusText}>
                ✅ Layout measurement complete!
              </Text>
            </View>
          ) : (
            <Text style={styles.statusText}>
              📏 Measuring dimensions...
            </Text>
          )}
        </View>

        {/* Layout readiness indicator */}
        <View style={styles.readinessContainer}>
          <Text style={styles.readinessText}>
            Layout Ready: {isLayoutReady ? "✅ Yes" : "⏳ No"}
          </Text>
        </View>

        {/* Flicker Demonstration */}
        <View style={styles.flickerDemoContainer}>
          <Text style={styles.flickerDemoTitle}>Layout Flicker Demonstration</Text>
          <Text style={styles.flickerDemoDescription}>
            This demo shows the difference between useLayoutEffect and useEffect for layout operations
          </Text>
          
          <View style={styles.flickerControls}>
            <TouchableOpacity 
              style={[
                styles.effectToggle, 
                useLayoutEffectDemo ? styles.effectToggleActive : styles.effectToggleInactive
              ]}
              onPress={toggleEffectType}
            >
              <Text style={[
                styles.effectToggleText,
                useLayoutEffectDemo ? styles.effectToggleTextActive : styles.effectToggleTextInactive
              ]}>
                {useLayoutEffectDemo ? "useLayoutEffect" : "useEffect"}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.animateButton} onPress={triggerAnimation}>
              <Text style={styles.animateButtonText}>Trigger Animation</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.animationContainer}>
            <View 
              ref={animatedBoxRef}
              style={styles.referenceBox}
            >
              <Text style={styles.referenceBoxText}>Reference Box</Text>
              <Text style={styles.referenceBoxSubtext}>
                {useLayoutEffectDemo ? "No Flicker ✅" : "May Flicker ⚠️"}
              </Text>
            </View>
            
            {shouldAnimate && (
              <Animated.View
                style={[
                  styles.animatedBox,
                  {
                    left: animatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [boxPosition.x, boxPosition.x],
                    }),
                    top: animatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 100],
                    }),
                    opacity: animatedValue.interpolate({
                      inputRange: [0, 0.1, 1],
                      outputRange: [0, 1, 1],
                    }),
                    transform: [{
                      scale: animatedValue.interpolate({
                        inputRange: [0, 0.5, 1],
                        outputRange: [0.5, 1.2, 1],
                      })
                    }]
                  }
                ]}
              >
                <Text style={styles.animatedBoxText}>Animated</Text>
              </Animated.View>
            )}
          </View>

          <View style={styles.flickerExplanation}>
            <Text style={styles.flickerExplanationTitle}>What's happening:</Text>
            <Text style={styles.flickerExplanationText}>
              • <Text style={styles.greenText}>useLayoutEffect</Text>: Measures and positions elements BEFORE paint (no flicker)
            </Text>
            <Text style={styles.flickerExplanationText}>
              • <Text style={styles.redText}>useEffect</Text>: Measures and positions elements AFTER paint (causes flicker)
            </Text>
            <Text style={styles.flickerExplanationText}>
              • Toggle between them and trigger animations to see the difference
            </Text>
          </View>
        </View>

        {/* Scroll position tracker */}
        <View style={styles.scrollControls}>
          <Text style={styles.scrollPosition}>
            Scroll Position: {Math.round(scrollPosition)}px
          </Text>
          <View style={styles.scrollButtons}>
            <TouchableOpacity style={styles.scrollButton} onPress={scrollToTop}>
              <Text style={styles.buttonText}>Top</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.scrollButton} onPress={scrollToBottom}>
              <Text style={styles.buttonText}>Bottom</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Scrollable content section */}
        <View style={styles.scrollSection}>
          <Text style={styles.scrollSectionTitle}>Scrollable Content Demo:</Text>
          <ScrollView
            ref={scrollViewRef}
            style={styles.scrollView}
            onScroll={(event) => {
              setScrollPosition(event.nativeEvent.contentOffset.y);
            }}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={true}
          >
            {generateContent()}
          </ScrollView>
        </View>

        {/* Information section */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>useLayoutEffect vs useEffect:</Text>
          <Text style={styles.infoText}>
            • useLayoutEffect: Runs synchronously before paint
          </Text>
          <Text style={styles.infoText}>
            • useEffect: Runs asynchronously after paint
          </Text>
          <Text style={styles.infoText}>
            • Use useLayoutEffect for DOM measurements
          </Text>
          <Text style={styles.infoText}>
            • Use useLayoutEffect to prevent visual flicker
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
  explanation: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
    fontStyle: "italic",
  },
  measuredContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 100,
  },
  measuredTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  measurementText: {
    fontSize: 14,
    color: "#007AFF",
    marginBottom: 5,
  },
  statusText: {
    fontSize: 14,
    color: "#34C759",
    fontWeight: "500",
    marginTop: 5,
  },
  readinessContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 6,
    marginBottom: 15,
    alignItems: "center",
  },
  readinessText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  scrollControls: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  scrollPosition: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  scrollButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  scrollButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 6,
    minWidth: 60,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  scrollSection: {
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 15,
  },
  scrollSectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  scrollView: {
    height: 300,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  contentItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  contentText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  contentSubtext: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  infoContainer: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  infoText: {
    fontSize: 12,
    color: "#666",
    marginBottom: 3,
  },
  // Flicker demonstration styles
  flickerDemoContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  flickerDemoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
    textAlign: "center",
  },
  flickerDemoDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
    lineHeight: 20,
  },
  flickerControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  effectToggle: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 2,
  },
  effectToggleActive: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  effectToggleInactive: {
    backgroundColor: "transparent",
    borderColor: "#FF3B30",
  },
  effectToggleText: {
    fontSize: 14,
    fontWeight: "600",
  },
  effectToggleTextActive: {
    color: "white",
  },
  effectToggleTextInactive: {
    color: "#FF3B30",
  },
  animateButton: {
    backgroundColor: "#34C759",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  animateButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  animationContainer: {
    height: 200,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 15,
    position: "relative",
    marginBottom: 20,
  },
  referenceBox: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  referenceBoxText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  referenceBoxSubtext: {
    color: "white",
    fontSize: 12,
    marginTop: 2,
  },
  animatedBox: {
    position: "absolute",
    width: 80,
    height: 80,
    backgroundColor: "#FF9500",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  animatedBoxText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  flickerExplanation: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 8,
  },
  flickerExplanationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  flickerExplanationText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    lineHeight: 20,
  },
  greenText: {
    color: "#34C759",
    fontWeight: "bold",
  },
  redText: {
    color: "#FF3B30",
    fontWeight: "bold",
  },
});

export default UseLayoutEffectExample;
