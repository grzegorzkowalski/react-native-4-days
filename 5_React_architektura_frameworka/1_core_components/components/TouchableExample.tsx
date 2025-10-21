import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Pressable,
  Alert,
  ScrollView
} from "react-native";

const TouchableExample: React.FC = () => {
  const [touchCount, setTouchCount] = useState<number>(0);
  const [longPressCount, setLongPressCount] = useState<number>(0);
  const [pressedIn, setPressedIn] = useState<boolean>(false);
  const [buttonStates, setButtonStates] = useState({
    button1: false,
    button2: false,
    button3: false,
  });

  const handlePress = () => {
    setTouchCount(prev => prev + 1);
  };

  const handleLongPress = () => {
    setLongPressCount(prev => prev + 1);
    Alert.alert("Long Press", "You performed a long press!");
  };

  const handlePressIn = () => {
    setPressedIn(true);
  };

  const handlePressOut = () => {
    setPressedIn(false);
  };

  const toggleButton = (buttonKey: keyof typeof buttonStates) => {
    setButtonStates(prev => ({
      ...prev,
      [buttonKey]: !prev[buttonKey]
    }));
  };

  const showAlert = (message: string) => {
    Alert.alert("Button Pressed", message);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Touchable Components Example</Text>
      
      {/* TouchableOpacity Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>TouchableOpacity</Text>
        <Text style={styles.sectionDescription}>
          Provides opacity feedback when touched
        </Text>
        
        <TouchableOpacity
          style={styles.basicButton}
          onPress={handlePress}
          onLongPress={handleLongPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.6}
        >
          <Text style={styles.buttonText}>Touch Me!</Text>
        </TouchableOpacity>
        
        <View style={styles.counter}>
          <Text style={styles.counterText}>Taps: {touchCount}</Text>
          <Text style={styles.counterText}>Long Presses: {longPressCount}</Text>
          <Text style={[styles.counterText, { color: pressedIn ? 'red' : 'green' }]}>
            Status: {pressedIn ? 'Pressed In' : 'Released'}
          </Text>
        </View>
      </View>

      {/* TouchableHighlight Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>TouchableHighlight</Text>
        <Text style={styles.sectionDescription}>
          Provides highlight (background color) feedback when touched
        </Text>
        
        <TouchableHighlight
          style={styles.highlightButton}
          onPress={() => showAlert("TouchableHighlight pressed!")}
          underlayColor="#FF6B6B"
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Highlight Button</Text>
        </TouchableHighlight>
      </View>

      {/* TouchableWithoutFeedback Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>TouchableWithoutFeedback</Text>
        <Text style={styles.sectionDescription}>
          No visual feedback, just captures touch events
        </Text>
        
        <TouchableWithoutFeedback
          onPress={() => showAlert("TouchableWithoutFeedback pressed!")}
        >
          <View style={styles.noFeedbackButton}>
            <Text style={styles.buttonText}>No Feedback Button</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>

      {/* Pressable Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pressable (Recommended)</Text>
        <Text style={styles.sectionDescription}>
          Modern replacement for Touchable components with more flexibility
        </Text>
        
        <Pressable
          style={({ pressed }) => [
            styles.pressableButton,
            { 
              backgroundColor: pressed ? '#4CAF50' : '#007AFF',
              transform: [{ scale: pressed ? 0.95 : 1 }]
            }
          ]}
          onPress={() => showAlert("Pressable pressed!")}
          onLongPress={() => Alert.alert("Long Press", "Pressable long pressed!")}
        >
          {({ pressed }) => (
            <Text style={styles.buttonText}>
              {pressed ? 'Pressed!' : 'Press Me!'}
            </Text>
          )}
        </Pressable>
      </View>

      {/* Multiple Button States */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Toggle Buttons</Text>
        <Text style={styles.sectionDescription}>
          Buttons with state management
        </Text>
        
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              { backgroundColor: buttonStates.button1 ? '#4CAF50' : '#757575' }
            ]}
            onPress={() => toggleButton('button1')}
          >
            <Text style={styles.buttonText}>
              Button 1 {buttonStates.button1 ? '✓' : '○'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.toggleButton,
              { backgroundColor: buttonStates.button2 ? '#FF9800' : '#757575' }
            ]}
            onPress={() => toggleButton('button2')}
          >
            <Text style={styles.buttonText}>
              Button 2 {buttonStates.button2 ? '✓' : '○'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.toggleButton,
              { backgroundColor: buttonStates.button3 ? '#E91E63' : '#757575' }
            ]}
            onPress={() => toggleButton('button3')}
          >
            <Text style={styles.buttonText}>
              Button 3 {buttonStates.button3 ? '✓' : '○'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Disabled Button */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Disabled Button</Text>
        
        <TouchableOpacity
          style={[styles.basicButton, styles.disabledButton]}
          onPress={() => {}}
          disabled={true}
        >
          <Text style={[styles.buttonText, styles.disabledText]}>
            Disabled Button
          </Text>
        </TouchableOpacity>
      </View>

      {/* Button Variations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Button Variations</Text>
        
        <TouchableOpacity style={styles.primaryButton} onPress={() => showAlert("Primary")}>
          <Text style={styles.buttonText}>Primary</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.secondaryButton} onPress={() => showAlert("Secondary")}>
          <Text style={styles.secondaryButtonText}>Secondary</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.outlineButton} onPress={() => showAlert("Outline")}>
          <Text style={styles.outlineButtonText}>Outline</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.dangerButton} onPress={() => showAlert("Danger")}>
          <Text style={styles.buttonText}>Danger</Text>
        </TouchableOpacity>
      </View>

      {/* Info Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Touchable Components Key Props:</Text>
        <Text style={styles.infoText}>• onPress - Function called when touch is released</Text>
        <Text style={styles.infoText}>• onLongPress - Function called on long press</Text>
        <Text style={styles.infoText}>• onPressIn - Function called when touch starts</Text>
        <Text style={styles.infoText}>• onPressOut - Function called when touch ends</Text>
        <Text style={styles.infoText}>• disabled - Whether the button is disabled</Text>
        <Text style={styles.infoText}>• activeOpacity - Opacity when pressed (TouchableOpacity)</Text>
        <Text style={styles.infoText}>• underlayColor - Color shown when pressed (TouchableHighlight)</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    margin: 20,
    color: "#333",
  },
  section: {
    margin: 15,
    padding: 15,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  sectionDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
  },
  basicButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 5,
  },
  highlightButton: {
    backgroundColor: "#34C759",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  noFeedbackButton: {
    backgroundColor: "#FF9500",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  pressableButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  counter: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#f8f9fa",
    borderRadius: 6,
  },
  counterText: {
    fontSize: 14,
    marginBottom: 3,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignItems: "center",
    marginHorizontal: 3,
  },
  disabledButton: {
    backgroundColor: "#CCCCCC",
  },
  disabledText: {
    color: "#888888",
  },
  primaryButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 5,
  },
  secondaryButton: {
    backgroundColor: "#6C757D",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 5,
  },
  secondaryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 5,
  },
  outlineButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
  },
  dangerButton: {
    backgroundColor: "#DC3545",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 5,
  },
  infoContainer: {
    margin: 15,
    padding: 15,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  infoText: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
});

export default TouchableExample;
