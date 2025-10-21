import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const UseStateExample: React.FC = () => {
  const [color, setColor] = useState("#FF69B4"); // pink
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleChangeColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const newColor = `#${randomColor}`;

  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: color }]}
        onPress={handleChangeColor}
      >
        <Text style={styles.buttonText}>
          Change color {counter} times
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  button: {
    padding: 30,
    borderRadius: 10,
    minWidth: 200,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});

export default UseStateExample;
