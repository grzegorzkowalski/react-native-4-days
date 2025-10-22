import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>React Native Core Components</Text>
        <Text style={styles.subtitle}>Interactive Examples and Learning Guide</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What's Included:</Text>
          <Text style={styles.listItem}>• View - Basic container component</Text>
          <Text style={styles.listItem}>• Text - Text display with styling</Text>
          <Text style={styles.listItem}>• ScrollView - Scrollable content</Text>
          <Text style={styles.listItem}>• FlatList - Performance list rendering</Text>
          <Text style={styles.listItem}>• SectionList - Sectioned lists</Text>
          <Text style={styles.listItem}>• TouchableOpacity - Touch interactions</Text>
          <Text style={styles.listItem}>• Image - Image display and handling</Text>
          <Text style={styles.listItem}>• TextInput - Text input fields</Text>
          <Text style={styles.listItem}>• Modal - Overlay dialogs</Text>
          <Text style={styles.listItem}>• ActivityIndicator - Loading spinners</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Purpose:</Text>
          <Text style={styles.description}>
            This application demonstrates the core React Native components with
            interactive examples, showing different props, styling options, and
            use cases for each component.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How to Use:</Text>
          <Text style={styles.description}>
            Navigate through the main tab to explore each component. Each example
            includes live demonstrations, code explanations, and best practices
            for React Native development.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
    opacity: 0.7,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  listItem: {
    fontSize: 16,
    marginBottom: 8,
    lineHeight: 22,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.8,
  },
});
