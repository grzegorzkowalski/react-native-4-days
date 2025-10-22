import React, { forwardRef, useRef } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";

const Parent: React.FC = () => {
  const inputRef = useRef<TextInput>(null);
  
  const focusChildInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ForwardRef Example</Text>
      
      <Text style={styles.explanation}>
        Click the button below to focus the input in the child component using forwardRef
      </Text>
      
      <Child ref={inputRef} />
      
      <TouchableOpacity style={styles.button} onPress={focusChildInput}>
        <Text style={styles.buttonText}>Focus Child Input</Text>
      </TouchableOpacity>
    </View>
  );
};

const Child = forwardRef<TextInput, {}>((props, ref) => {
  return (
    <View style={styles.childContainer}>
      <Text style={styles.childTitle}>Child Component</Text>
      <TextInput
        ref={ref}
        style={styles.input}
        placeholder="I can be focused from parent!"
        multiline={false}
      />
      <Text style={styles.childNote}>
        This input is controlled by the parent component through forwardRef
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  explanation: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#666",
    lineHeight: 22,
  },
  childContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  childTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  childNote: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    fontStyle: "italic",
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

export default Parent;
