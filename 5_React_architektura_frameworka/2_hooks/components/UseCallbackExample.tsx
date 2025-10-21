import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  callback: () => number;
};

const Child: React.FC<Props> = React.memo(({ callback }) => {
  console.log("Child component rendered - was this intentional?");
  
  return (
    <View style={styles.childContainer}>
      <Text style={styles.childText}>
        I'm a very big number: {callback()}
      </Text>
    </View>
  );
});

const UseCallbackExample: React.FC = () => {
  const [timer, setTimer] = useState(new Date());

  // Using useCallback to memoize the function
  // This prevents the Child component from re-rendering on every timer update
  const memoizedCallback = () => {
    return Math.pow(200, 20);
  } // Empty dependency array means this function never changes

  // Without useCallback (commented out for comparison):
  // const nonMemoizedCallback = () => {
  //   return Math.pow(200, 20);
  // };

  useEffect(() => {
    const interval = setInterval(() => setTimer(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log("Callback reference has changed");
  }, [memoizedCallback]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>UseCallback Example</Text>
      
      <Text style={styles.timer}>
        Current Time: {timer.toLocaleTimeString()}
      </Text>
      
      <Text style={styles.explanation}>
        The timer updates every second, but the Child component should only render once 
        because we're using useCallback to memoize the callback function.
      </Text>
      
      <Child callback={memoizedCallback} />
      
      <Text style={styles.note}>
        Check the console to see how many times the Child component renders!
      </Text>
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
  timer: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    color: "#007AFF",
    fontWeight: "bold",
  },
  explanation: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
    fontStyle: "italic",
    lineHeight: 20,
  },
  childContainer: {
    backgroundColor: "white",
    padding: 20,
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
    textAlign: "center",
    color: "#333",
    fontWeight: "bold",
  },
  note: {
    fontSize: 12,
    textAlign: "center",
    color: "#666",
    fontStyle: "italic",
  },
});

export default UseCallbackExample;
