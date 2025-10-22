import React, { useDeferredValue, useEffect, useState, useTransition } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator 
} from "react-native";

const UseDeferredValueExample: React.FC = () => {
  const [input, setInput] = useState<number>(100);


  const generateElements = (number: number) => {
    // This is an expensive operation that creates many elements
    const elements = [];
    for (let i = 0; i < number; i++) {
      elements.push(
        <View key={i} style={styles.listItem}>
          <Text style={styles.listItemText}>Item #{i + 1}</Text>
          <Text style={styles.listItemSubtext}>
            Generated item with index {i}
          </Text>
        </View>
      );
    }
    return elements;
  };



  return (
    <View style={styles.container}>
      <Text style={styles.title}>UseDeferredValue & UseTransition</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Number of items to generate:</Text>
        <TextInput
          style={styles.input}
          value={input.toString()}
          onChangeText={(text) => {
            const number = parseInt(text) || 0;
            if (number >= 0 && number <= 1000000) {
              setInput(number);
            }
          }}
          keyboardType="numeric"
          placeholder="Enter a number (0-1000)"
        />
      </View>

      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          Input value: {input}
        </Text>
        <Text style={styles.statusText}>
          Deferred value: {input}
        </Text>


      </View>

      <Text style={styles.sectionTitle}>
        Generated List (using useDeferredValue):
      </Text>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={true}>
        {generateElements(input)}
      </ScrollView>

      <Text style={styles.explanation}>
        Try typing quickly in the input above. Notice how the input stays responsive 
        while the list updates are deferred, preventing UI blocking.
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
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "white",
  },
  statusContainer: {
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
  statusText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#007AFF",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 15,
  },
  listItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  listItemText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  listItemSubtext: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  explanation: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    fontStyle: "italic",
    lineHeight: 16,
  },
});

export default UseDeferredValueExample;
