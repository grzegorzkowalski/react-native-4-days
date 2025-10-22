import React, { useState, useRef } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform
} from "react-native";

const TextInputExample: React.FC = () => {
  const [basicText, setBasicText] = useState<string>("");
  const [emailText, setEmailText] = useState<string>("");
  const [passwordText, setPasswordText] = useState<string>("");
  const [multilineText, setMultilineText] = useState<string>("");
  const [numberText, setNumberText] = useState<string>("");
  const [phoneText, setPhoneText] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [maxLengthText, setMaxLengthText] = useState<string>("");
  const [focusedInput, setFocusedInput] = useState<string>("");

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const multilineRef = useRef<TextInput>(null);

  const handleSubmit = () => {
    Alert.alert(
      "Form Data",
      `Email: ${emailText}\nPassword: ${passwordText}\nComments: ${multilineText}`
    );
  };

  const clearAll = () => {
    setBasicText("");
    setEmailText("");
    setPasswordText("");
    setMultilineText("");
    setNumberText("");
    setPhoneText("");
    setSearchText("");
    setMaxLengthText("");
  };

  const focusNextInput = (ref: React.RefObject<TextInput | null>) => {
    ref.current?.focus();
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>TextInput Component Example</Text>
        
        {/* Basic TextInput */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic TextInput</Text>
          <TextInput
            style={styles.basicInput}
            value={basicText}
            onChangeText={setBasicText}
            placeholder="Enter text here..."
            placeholderTextColor="#999"
            onFocus={() => setFocusedInput("basic")}
            onBlur={() => setFocusedInput("")}
          />
          <Text style={styles.inputValue}>Value: "{basicText}"</Text>
        </View>

        {/* Email Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Email Input</Text>
          <TextInput
            ref={emailRef}
            style={[
              styles.styledInput,
              focusedInput === "email" && styles.focusedInput
            ]}
            value={emailText}
            onChangeText={setEmailText}
            placeholder="email@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="emailAddress"
            returnKeyType="next"
            onSubmitEditing={() => focusNextInput(passwordRef)}
            onFocus={() => setFocusedInput("email")}
            onBlur={() => setFocusedInput("")}
          />
        </View>

        {/* Password Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Password Input</Text>
          <TextInput
            ref={passwordRef}
            style={[
              styles.styledInput,
              focusedInput === "password" && styles.focusedInput
            ]}
            value={passwordText}
            onChangeText={setPasswordText}
            placeholder="Enter password"
            secureTextEntry
            textContentType="password"
            returnKeyType="next"
            onSubmitEditing={() => focusNextInput(multilineRef)}
            onFocus={() => setFocusedInput("password")}
            onBlur={() => setFocusedInput("")}
          />
        </View>

        {/* Multiline TextInput */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Multiline TextInput</Text>
          <TextInput
            ref={multilineRef}
            style={[
              styles.multilineInput,
              focusedInput === "multiline" && styles.focusedInput
            ]}
            value={multilineText}
            onChangeText={setMultilineText}
            placeholder="Enter multiple lines of text here..."
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            onFocus={() => setFocusedInput("multiline")}
            onBlur={() => setFocusedInput("")}
          />
          <Text style={styles.characterCount}>
            Characters: {multilineText.length}
          </Text>
        </View>

        {/* Number Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Number Input</Text>
          <TextInput
            style={[
              styles.styledInput,
              focusedInput === "number" && styles.focusedInput
            ]}
            value={numberText}
            onChangeText={(text) => {
              // Only allow numbers
              const numericText = text.replace(/[^0-9]/g, '');
              setNumberText(numericText);
            }}
            placeholder="Enter numbers only"
            keyboardType="numeric"
            onFocus={() => setFocusedInput("number")}
            onBlur={() => setFocusedInput("")}
          />
        </View>

        {/* Phone Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Phone Input</Text>
          <TextInput
            style={[
              styles.styledInput,
              focusedInput === "phone" && styles.focusedInput
            ]}
            value={phoneText}
            onChangeText={setPhoneText}
            placeholder="(123) 456-7890"
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            dataDetectorTypes="phoneNumber"
            onFocus={() => setFocusedInput("phone")}
            onBlur={() => setFocusedInput("")}
          />
        </View>

        {/* Search Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Search Input</Text>
          <View style={styles.searchContainer}>
            <TextInput
              style={[
                styles.searchInput,
                focusedInput === "search" && styles.focusedInput
              ]}
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Search..."
              returnKeyType="search"
              clearButtonMode="while-editing"
              onFocus={() => setFocusedInput("search")}
              onBlur={() => setFocusedInput("")}
            />
            {searchText.length > 0 && (
              <TouchableOpacity 
                style={styles.clearButton}
                onPress={() => setSearchText("")}
              >
                <Text style={styles.clearButtonText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Max Length Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Character Limited Input</Text>
          <TextInput
            style={[
              styles.styledInput,
              focusedInput === "maxLength" && styles.focusedInput
            ]}
            value={maxLengthText}
            onChangeText={setMaxLengthText}
            placeholder="Max 20 characters"
            maxLength={20}
            onFocus={() => setFocusedInput("maxLength")}
            onBlur={() => setFocusedInput("")}
          />
          <Text style={styles.characterCount}>
            {maxLengthText.length}/20 characters
          </Text>
        </View>

        {/* Styled Inputs Variations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Styled Input Variations</Text>
          
          <TextInput
            style={styles.roundedInput}
            placeholder="Rounded corners"
          />
          
          <TextInput
            style={styles.borderedInput}
            placeholder="Bordered input"
          />
          
          <TextInput
            style={styles.filledInput}
            placeholder="Filled background"
            placeholderTextColor="#666"
          />
          
          <View style={styles.iconInputContainer}>
            <Text style={styles.inputIcon}>📧</Text>
            <TextInput
              style={styles.iconInput}
              placeholder="Input with icon"
            />
          </View>
        </View>

        {/* Form Example */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Complete Form</Text>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.formInput}
              value={emailText}
              onChangeText={setEmailText}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.formInput}
              value={passwordText}
              onChangeText={setPasswordText}
              placeholder="Enter your password"
              secureTextEntry
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Comments</Text>
            <TextInput
              style={styles.formMultilineInput}
              value={multilineText}
              onChangeText={setMultilineText}
              placeholder="Enter your comments..."
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>
          
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.clearButton2} onPress={clearAll}>
              <Text style={styles.clearButtonText2}>Clear All</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Info Section */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>TextInput Key Props:</Text>
          <Text style={styles.infoText}>• value - The controlled value</Text>
          <Text style={styles.infoText}>• onChangeText - Function called when text changes</Text>
          <Text style={styles.infoText}>• placeholder - Placeholder text</Text>
          <Text style={styles.infoText}>• keyboardType - Type of keyboard to show</Text>
          <Text style={styles.infoText}>• secureTextEntry - Hide text for passwords</Text>
          <Text style={styles.infoText}>• multiline - Allow multiple lines</Text>
          <Text style={styles.infoText}>• maxLength - Maximum character limit</Text>
          <Text style={styles.infoText}>• autoCapitalize - Auto capitalization behavior</Text>
          <Text style={styles.infoText}>• returnKeyType - Return key label</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
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
    marginBottom: 10,
    color: "#333",
  },
  basicInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  styledInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  focusedInput: {
    borderColor: "#007AFF",
    borderWidth: 2,
  },
  multilineInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    height: 100,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    padding: 12,
    paddingRight: 40,
    fontSize: 16,
    backgroundColor: "#f8f9fa",
  },
  clearButton: {
    position: "absolute",
    right: 10,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  clearButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  roundedInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 25,
    padding: 15,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  borderedInput: {
    borderWidth: 2,
    borderColor: "#007AFF",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  filledInput: {
    borderWidth: 0,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f0f0f0",
    marginBottom: 10,
  },
  iconInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
    paddingLeft: 12,
  },
  inputIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  iconInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  formInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  formMultilineInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    height: 80,
    textAlignVertical: "top",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  submitButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 6,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  clearButton2: {
    backgroundColor: "#6c757d",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 6,
    flex: 1,
    marginLeft: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  clearButtonText2: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  inputValue: {
    marginTop: 8,
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
  },
  characterCount: {
    marginTop: 5,
    fontSize: 12,
    color: "#666",
    textAlign: "right",
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

export default TextInputExample;
