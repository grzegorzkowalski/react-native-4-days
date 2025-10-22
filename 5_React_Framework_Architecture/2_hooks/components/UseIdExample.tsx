import React, { useId, useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  ScrollView 
} from "react-native";

// Custom hook using useId
const useFormField = (label: string) => {
  const id = useId();
  const labelId = `${id}-label`;
  const inputId = `${id}-input`;
  const errorId = `${id}-error`;

  return {
    labelId,
    inputId,
    errorId,
    labelProps: {
      nativeID: labelId,
    },
    inputProps: {
      nativeID: inputId,
      accessibilityLabelledBy: labelId,
    },
    errorProps: {
      nativeID: errorId,
    },
  };
};

// Form field component
const FormField: React.FC<{
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
}> = ({ label, value, onChangeText, error, placeholder, secureTextEntry }) => {
  const field = useFormField(label);

  return (
    <View style={styles.fieldContainer}>
      <Text {...field.labelProps} style={styles.label}>
        {label}
      </Text>
      <TextInput
        {...field.inputProps}
        style={[styles.input, error && styles.inputError]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        accessibilityLabel={label}
      />
      {error && (
        <Text {...field.errorProps} style={styles.error}>
          {error}
        </Text>
      )}
    </View>
  );
};

// Multiple forms to demonstrate unique IDs
const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const formId = useId();
  const submitButtonId = `${formId}-submit`;

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!email.includes("@")) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      alert(`Login successful for ${email}`);
      setEmail("");
      setPassword("");
      setErrors({});
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Login Form (ID: {formId})</Text>
      
      <FormField
        label="Email"
        value={email}
        onChangeText={setEmail}
        error={errors.email}
        placeholder="Enter your email"
      />
      
      <FormField
        label="Password"
        value={password}
        onChangeText={setPassword}
        error={errors.password}
        placeholder="Enter your password"
        secureTextEntry
      />
      
      <TouchableOpacity 
        style={styles.submitButton} 
        onPress={handleSubmit}
        accessibilityLabel="Login button"
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const RegistrationForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [errors, setErrors] = useState<{ 
    name?: string; 
    email?: string; 
    confirmEmail?: string; 
  }>({});

  const formId = useId();
  const submitButtonId = `${formId}-submit`;

  const validateForm = () => {
    const newErrors: { 
      name?: string; 
      email?: string; 
      confirmEmail?: string; 
    } = {};
    
    if (!name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!email.includes("@")) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!confirmEmail) {
      newErrors.confirmEmail = "Please confirm your email";
    } else if (email !== confirmEmail) {
      newErrors.confirmEmail = "Emails do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      alert(`Registration successful for ${name}`);
      setName("");
      setEmail("");
      setConfirmEmail("");
      setErrors({});
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Registration Form (ID: {formId})</Text>
      
      <FormField
        label="Full Name"
        value={name}
        onChangeText={setName}
        error={errors.name}
        placeholder="Enter your full name"
      />
      
      <FormField
        label="Email Address"
        value={email}
        onChangeText={setEmail}
        error={errors.email}
        placeholder="Enter your email"
      />
      
      <FormField
        label="Confirm Email"
        value={confirmEmail}
        onChangeText={setConfirmEmail}
        error={errors.confirmEmail}
        placeholder="Confirm your email"
      />
      
      <TouchableOpacity 
        style={styles.submitButton} 
        onPress={handleSubmit}
        accessibilityLabel="Register button"
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const UseIdExample: React.FC = () => {
  const mainId = useId();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>useId Example</Text>
      
      <Text style={styles.explanation}>
        useId generates unique IDs for accessibility and form associations.
        Each form and field has its own unique ID.
      </Text>

      <Text style={styles.sectionNote}>
        Main Component ID: {mainId}
      </Text>

      <LoginForm />
      <RegistrationForm />

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>useId Benefits:</Text>
        <Text style={styles.infoText}>
          • Generates stable, unique IDs across renders
        </Text>
        <Text style={styles.infoText}>
          • Essential for accessibility (ARIA labels)
        </Text>
        <Text style={styles.infoText}>
          • Prevents ID collisions in SSR applications
        </Text>
        <Text style={styles.infoText}>
          • Works with form field associations
        </Text>
        <Text style={styles.infoText}>
          • Safe to use with React 18+ concurrent features
        </Text>
      </View>
    </ScrollView>
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
    marginBottom: 10,
    color: "#333",
  },
  explanation: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 15,
    color: "#666",
    fontStyle: "italic",
    lineHeight: 20,
  },
  sectionNote: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 20,
    color: "#999",
    fontFamily: "monospace",
  },
  formContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
    textAlign: "center",
  },
  fieldContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  inputError: {
    borderColor: "#FF3B30",
    backgroundColor: "#FFF5F5",
  },
  error: {
    fontSize: 12,
    color: "#FF3B30",
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  infoContainer: {
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

export default UseIdExample;
