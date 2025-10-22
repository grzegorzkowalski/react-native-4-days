import React, { createContext, useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

// Create contexts
const ThemeContext = createContext<{
  theme: 'light' | 'dark';
  toggleTheme: () => void;
} | null>(null);

const UserContext = createContext<{
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
} | null>(null);

// Theme Provider Component
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// User Provider Component
const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);

  const login = (username: string) => {
    setUser(username);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hooks
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// Child components that consume context
const Header: React.FC = () => {
  const { theme } = useTheme();
  const { user, logout } = useUser();

  return (
    <View style={[styles.header, theme === 'dark' && styles.headerDark]}>
      <Text style={[styles.headerText, theme === 'dark' && styles.textDark]}>
        Welcome {user || 'Guest'}!
      </Text>
      {user && (
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <TouchableOpacity 
      style={[styles.themeButton, theme === 'dark' && styles.themeButtonDark]} 
      onPress={toggleTheme}
    >
      <Text style={[styles.buttonText, theme === 'dark' && styles.textDark]}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </Text>
    </TouchableOpacity>
  );
};

const LoginForm: React.FC = () => {
  const { user, login } = useUser();
  const { theme } = useTheme();

  if (user) return null;

  const handleLogin = (username: string) => {
    login(username);
  };

  return (
    <View style={styles.loginContainer}>
      <Text style={[styles.loginTitle, theme === 'dark' && styles.textDark]}>
        Please log in:
      </Text>
      <View style={styles.loginButtons}>
        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={() => handleLogin('John Doe')}
        >
          <Text style={styles.buttonText}>Login as John</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={() => handleLogin('Jane Smith')}
        >
          <Text style={styles.buttonText}>Login as Jane</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Main component
const UseContextExample: React.FC = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, theme === 'dark' && styles.containerDark]}>
      <Text style={[styles.title, theme === 'dark' && styles.textDark]}>
        useContext Example
      </Text>
      
      <Text style={[styles.explanation, theme === 'dark' && styles.textDark]}>
        This demonstrates sharing state across components without prop drilling
      </Text>

      <Header />
      <LoginForm />
      <ThemeToggle />

      <View style={styles.infoContainer}>
        <Text style={[styles.infoTitle, theme === 'dark' && styles.textDark]}>
          Context Benefits:
        </Text>
        <Text style={[styles.infoText, theme === 'dark' && styles.textDark]}>
          • Avoid prop drilling through multiple levels
        </Text>
        <Text style={[styles.infoText, theme === 'dark' && styles.textDark]}>
          • Share global state (theme, auth, language)
        </Text>
        <Text style={[styles.infoText, theme === 'dark' && styles.textDark]}>
          • Create reusable custom hooks
        </Text>
      </View>
    </View>
  );
};

// Wrapper with providers
const UseContextExampleWithProviders: React.FC = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <UseContextExample />
      </UserProvider>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  containerDark: {
    backgroundColor: "#1a1a1a",
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
    marginBottom: 20,
    color: "#666",
    fontStyle: "italic",
  },
  header: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerDark: {
    backgroundColor: "#333",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  textDark: {
    color: "#fff",
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
    padding: 8,
    borderRadius: 4,
  },
  themeButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  themeButtonDark: {
    backgroundColor: "#0066CC",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginContainer: {
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
  loginTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  loginButtons: {
    flexDirection: "row",
    gap: 10,
  },
  loginButton: {
    backgroundColor: "#34C759",
    padding: 10,
    borderRadius: 6,
    flex: 1,
    alignItems: "center",
  },
  infoContainer: {
    backgroundColor: "white",
    padding: 15,
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
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
});

export default UseContextExampleWithProviders;
