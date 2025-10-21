import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

const capitals = [
  {
    country: "France",
    capital: "Paris",
  },
  {
    country: "Poland",
    capital: "Warsaw",
  },
  {
    country: "Italy",
    capital: "Rome",
  },
];

const UseEffectExample: React.FC = () => {
  const [correctAnswer, setCorrectAnswer] = useState<boolean | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [input, setInput] = useState("");
  const [time, setTime] = useState(0);

  // Reset error information when moving to next question


  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const checkAnswer = () => {
    setCorrectAnswer(input.toLowerCase() === capitals[currentQuestion].capital.toLowerCase());
  };

  const nextQuestion = () => {
    setCurrentQuestion((prev) => (prev + 1) % capitals.length);
  };

  const getAnswerFeedback = () => {
    if (correctAnswer === true) return "✅ Correct Answer!";
    if (correctAnswer === false) return "❌ Wrong Answer";
    return "";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>
        The capital of {capitals[currentQuestion].country} is?
      </Text>
      
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Enter capital city..."
        autoCapitalize="words"
      />
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.checkButton} onPress={checkAnswer}>
          <Text style={styles.buttonText}>Check Answer</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.nextButton} onPress={nextQuestion}>
          <Text style={styles.buttonText}>Next Question</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.feedback}>{getAnswerFeedback()}</Text>
      
      <Text style={styles.timer}>Time: {time}s</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  question: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    fontSize: 18,
    width: "100%",
    marginBottom: 20,
    backgroundColor: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 20,
  },
  checkButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    minWidth: 120,
  },
  nextButton: {
    backgroundColor: "#34C759",
    padding: 15,
    borderRadius: 8,
    minWidth: 120,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  feedback: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  timer: {
    fontSize: 16,
    color: "#666",
  },
});

export default UseEffectExample;
