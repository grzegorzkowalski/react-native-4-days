import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Context
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Auth screens
import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';

// Main screens
import DashboardScreen from './screens/main/DashboardScreen';
import ProfileScreen from './screens/main/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import CameraScreen from './screens/camera/CameraScreen';

// Users screens
import UsersListScreen from './screens/users/UsersListScreen';
import UserDetailScreen from './screens/users/UserDetailScreen';

// Jokes screens
import JokesListScreen from './screens/jokes/JokesListScreen';
import JokeDetailScreen from './screens/jokes/JokeDetailScreen';
import CreateJokeScreen from './screens/jokes/CreateJokeScreen';
import EditJokeScreen from './screens/jokes/EditJokeScreen';

// Types
import { 
  RootStackParamList, 
  AuthStackParamList, 
  DrawerParamList,
  UsersStackParamList,
  JokesStackParamList 
} from './types/navigation';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();
const UsersStack = createNativeStackNavigator<UsersStackParamList>();
const JokesStack = createNativeStackNavigator<JokesStackParamList>();

// Auth Navigator
function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
}

// Users Stack Navigator
function UsersNavigator() {
  return (
    <UsersStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#007bff' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <UsersStack.Screen 
        name="UsersList" 
        component={UsersListScreen}
        options={{ title: 'Users' }}
      />
      <UsersStack.Screen 
        name="UserDetail" 
        component={UserDetailScreen}
        options={{ title: 'User Details' }}
      />
    </UsersStack.Navigator>
  );
}

// Jokes Stack Navigator
function JokesNavigator() {
  return (
    <JokesStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#28a745' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <JokesStack.Screen 
        name="JokesList" 
        component={JokesListScreen}
        options={{ title: 'Jokes' }}
      />
      <JokesStack.Screen 
        name="JokeDetail" 
        component={JokeDetailScreen}
        options={{ title: 'Joke Details' }}
      />
      <JokesStack.Screen 
        name="CreateJoke" 
        component={CreateJokeScreen}
        options={{ title: 'Create Joke' }}
      />
      <JokesStack.Screen 
        name="EditJoke" 
        component={EditJokeScreen}
        options={{ title: 'Edit Joke' }}
      />
    </JokesStack.Navigator>
  );
}

// Main Drawer Navigator
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: '#007bff' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        drawerActiveTintColor: '#007bff',
        drawerInactiveTintColor: '#666',
      }}
    >
      <Drawer.Screen 
        name="Home" 
        component={DashboardScreen}
        options={{ 
          title: 'Dashboard',
          drawerIcon: () => '🏠'
        }}
      />
      <Drawer.Screen 
        name="UsersList" 
        component={UsersNavigator}
        options={{ 
          title: 'Users',
          drawerIcon: () => '👥',
          headerShown: false
        }}
      />
      <Drawer.Screen 
        name="JokesList" 
        component={JokesNavigator}
        options={{ 
          title: 'Jokes',
          drawerIcon: () => '😂',
          headerShown: false
        }}
      />
      <Drawer.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ 
          title: 'Profile',
          drawerIcon: () => '👤'
        }}
      />
      <Drawer.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ 
          title: 'Settings',
          drawerIcon: () => '⚙️'
        }}
      />
      <Drawer.Screen 
        name="Camera" 
        component={CameraScreen}
        options={{ 
          title: 'Camera',
          drawerIcon: () => '📷',
          drawerItemStyle: { display: 'none' } // Hide from drawer menu
        }}
      />
    </Drawer.Navigator>
  );
}

// App Content (inside AuthProvider)
function AppContent() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null; // You could show a loading screen here
  }

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <RootStack.Screen name="Main" component={DrawerNavigator} />
      ) : (
        <RootStack.Screen name="Auth" component={AuthNavigator} />
      )}
    </RootStack.Navigator>
  );
}

// Main App Component
export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppContent />
        <StatusBar style="light" />
      </NavigationContainer>
    </AuthProvider>
  );
}
