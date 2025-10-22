import React, { useReducer } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

function factorialize(num: number): number {
  if (num < 0) return -1;
  else if (num === 0) return 1;
  else {
    return num * factorialize(num - 1);
  }
}

const initialValue = 1;

const init = (val: number) => ({ result: val });

type State = {
  result: number;
};

type Action = 
  | { type: "FACTORIAL" }
  | { type: "SQRT" }
  | { type: "ADD" }
  | { type: "RESET"; payload: number };

const UseReducerExample: React.FC = () => {
  const [state, dispatch] = useReducer(
    (state: State, action: Action): State => {
      if (action.type === "FACTORIAL") {
        console.log("FACTORIAL action", action);
        return { result: factorialize(state.result) };
      }

      if (action.type === "SQRT") {
        console.log("SQRT action", action);
        return { result: Math.sqrt(state.result) };
      }

      if (action.type === "ADD") {
        console.log("ADD action", action);
        return { result: state.result + 1 };
      }

      if (action.type === "RESET") {
        console.log("RESET action", action);
        return init(action.payload);
      }

      return state;
    },
    initialValue,
    init
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>UseReducer Example</Text>
      
      <View style={styles.resultContainer}>
        <Text style={styles.resultLabel}>Current Result:</Text>
        <Text style={styles.result}>{state.result}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.factorialButton]} 
          onPress={() => dispatch({ type: "FACTORIAL" })}
        >
          <Text style={styles.buttonText}>Factorial (!)</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.addButton]} 
          onPress={() => dispatch({ type: "ADD" })}
        >
          <Text style={styles.buttonText}>Add 1 (+1)</Text>
        </TouchableOpacity>

        {/* Fixed: Changed FACTORIAL to SQRT */}
        <TouchableOpacity 
          style={[styles.button, styles.sqrtButton]} 
          onPress={() => dispatch({ type: "SQRT" })}
        >
          <Text style={styles.buttonText}>Square Root (√)</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.resetButton]} 
          onPress={() => dispatch({ type: "RESET", payload: initialValue })}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.explanationContainer}>
        <Text style={styles.explanationTitle}>Operations:</Text>
        <Text style={styles.explanation}>• Factorial: Calculates n!</Text>
        <Text style={styles.explanation}>• Add 1: Increments by 1</Text>
        <Text style={styles.explanation}>• Square Root: Calculates √n</Text>
        <Text style={styles.explanation}>• Reset: Returns to initial value (1)</Text>
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
    marginBottom: 30,
    color: "#333",
  },
  resultContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultLabel: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  result: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#007AFF",
  },
  buttonContainer: {
    gap: 15,
    marginBottom: 30,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  factorialButton: {
    backgroundColor: "#FF3B30",
  },
  addButton: {
    backgroundColor: "#34C759",
  },
  sqrtButton: {
    backgroundColor: "#FF9500",
  },
  resetButton: {
    backgroundColor: "#8E8E93",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  explanationContainer: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  explanation: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
});

export default UseReducerExample;
