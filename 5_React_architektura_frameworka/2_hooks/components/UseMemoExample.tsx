import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";

const Child = ({ name }: { name: string }) => {
  const count = useRef(0);

  useEffect(() => {
    count.current += 1;
    console.log("Child rendered", count.current, "times");
  });

  return (
    <View style={styles.childContainer}>
      <Text style={styles.childText}>I'm a child, and my name is {name}</Text>
      <Text style={styles.renderCount}>Rendered: {count.current} times</Text>
    </View>
  );
};

const factorial = (n: number): number => {
  console.log("Calculating factorial for", n);
  if (n <= 1) return 1;
  return n * factorial(n - 1);
};

const UseMemoExample: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [name, setName] = useState("Marcin");
  const [number, setNumber] = useState(5);
  const [color, setColor] = useState("#007AFF");

  // Memoize factorial calculation - only recalculates when number changes
  const factorialResult = factorial(number);


  // Memoize color calculation - only recalculates when color state changes
  const processedColor = useMemo(() => {
    console.log("Processing color...");
    return color;
  }, [color]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const colors = ["#007AFF", "#FF3B30", "#34C759", "#FF9500", "#AF52DE"];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>UseMemo Example</Text>
      
      {/* Time display - updates every second */}
      <Text style={styles.time}>{time.toLocaleTimeString()}</Text>
      
      {/* Child component */}
      <Child name={name} />
      
      {/* Factorial calculation */}
      <View style={styles.factorialSection}>
        <Text style={styles.sectionTitle}>Factorial Calculator</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Number:</Text>
          <TextInput
            style={styles.input}
            value={number.toString()}
            onChangeText={(text) => {
              const num = parseInt(text) || 0;
              if (num >= 0 && num <= 10) { // Limit to prevent overflow
                setNumber(num);
              }
            }}
            keyboardType="numeric"
            maxLength={2}
          />
        </View>
        <Text style={styles.result}>
          Factorial of {number} = {factorialResult}
        </Text>
      </View>
      
      {/* Color section */}
      <View style={styles.colorSection}>
        <Text style={styles.sectionTitle}>Color Picker</Text>
        <View style={[styles.colorDisplay, { backgroundColor: processedColor }]} />
        <View style={styles.colorButtons}>
          {colors.map((c, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.colorButton, { backgroundColor: c }]}
              onPress={() => setColor(c)}
            />
          ))}
        </View>
      </View>
      
      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => setName(name === "Marcin" ? "Adam Małysz" : "Marcin")}
        >
          <Text style={styles.buttonText}>Change Name</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  time: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
  },
  childContainer: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  childText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  renderCount: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },
  factorialSection: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
    width: 60,
    textAlign: "center",
  },
  result: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
  },
  colorSection: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  colorDisplay: {
    width: "100%",
    height: 50,
    borderRadius: 8,
    marginBottom: 10,
  },
  colorButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 5,
  },
  controls: {
    gap: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default UseMemoExample;
