import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CoreComponentsExamples from './components/CoreComponentsExamples';

export default function App() {
  return (
    <SafeAreaProvider>
      <CoreComponentsExamples />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
