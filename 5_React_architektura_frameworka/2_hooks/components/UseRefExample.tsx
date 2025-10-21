import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");
const BOX_SIZE = 100;
const PADDING = 50;

const UseRefExample: React.FC = () => {
  // Refs for animation and counter
  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const colorAnim = useRef(new Animated.Value(0)).current; // 0 => red, 1 => blue
  const counter = useRef({ number: 0 });

  console.log("render", counter); // shows that the counter “persists” between renders

  useEffect(() => {
    startAnimation();
  }, []);

  // Safe target position (to keep the box inside the screen)
  const targetX = Math.max(0, Math.min(300, width - BOX_SIZE - PADDING));
  const targetY = Math.max(0, Math.min(300, height - BOX_SIZE - PADDING - 140));

  const startAnimation = () => {
    Animated.parallel([
      // transform can use native driver
      Animated.timing(position, {
        toValue: { x: targetX, y: targetY },
        duration: 2000,
        useNativeDriver: true, // ✅
      }),
      // color cannot, so set to false
      Animated.timing(colorAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false, // color animation is not supported by native driver
      }),
    ]).start();
  };

  const resetAnimation = () => {
    Animated.parallel([
      Animated.timing(position, {
        toValue: { x: 0, y: 0 },
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(colorAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const toggleColor = () => {
    colorAnim.stopAnimation((current) => {
      const next = current >= 0.5 ? 0 : 1;
      Animated.timing(colorAnim, {
        toValue: next,
        duration: 400,
        useNativeDriver: false,
      }).start();
    });
  };

  const handleCounterClick = () => {
    counter.current.number++;
    console.log("counter (no rerender):", counter.current.number);
  };

  const interpolatedColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#FF0000", "#0000FF"], // red → blue
  });

  return (
      <View style={styles.container}>
        <Animated.View
            style={[
              styles.animatedBox,
              {
                // getTranslateTransform supports the native driver
                transform: position.getTranslateTransform(),
                backgroundColor: interpolatedColor, // forced to use JS driver
              },
            ]}
        >
          <TouchableOpacity onPress={toggleColor} style={styles.clickArea}>
            <Text style={styles.boxText}>Click me!</Text>
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.controls}>
          <TouchableOpacity style={styles.button} onPress={handleCounterClick}>
            <Text style={styles.buttonText}>Counter Click (ref)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={toggleColor}>
            <Text style={styles.buttonText}>Toggle Color</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={resetAnimation}>
            <Text style={styles.buttonText}>Reset Animation</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={startAnimation}>
            <Text style={styles.buttonText}>Start Animation</Text>
          </TouchableOpacity>

          <Text style={styles.hint}>
            Note: the counter in ref increases without rerender — check the console.
          </Text>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f0f0", position: "relative" },
  animatedBox: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    position: "absolute",
    top: PADDING,
    left: PADDING,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  clickArea: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  boxText: { color: "white", fontWeight: "bold", textAlign: "center" },
  controls: {
    position: "absolute",
    bottom: 100,
    left: 20,
    right: 20,
    gap: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  hint: { marginTop: 8, textAlign: "center", color: "#333" },
});

export default UseRefExample;
