import React, { useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView 
} from "react-native";

// Import all component examples
import ViewExample from './ViewExample';
import TextExample from './TextExample';
import ScrollViewExample from './ScrollViewExample';
import FlatListExample from './FlatListExample';
import SectionListExample from './SectionListExample';
import TouchableExample from './TouchableExample';
import ImageExample from './ImageExample';
import TextInputExample from './TextInputExample';
import ModalExample from './ModalExample';
import ActivityIndicatorExample from './ActivityIndicatorExample';
import SwitchExample from './SwitchExample';
import RefreshControlExample from './RefreshControlExample';

type ComponentExample = {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType;
};

const componentExamples: ComponentExample[] = [
  {
    id: "view",
    title: "View",
    description: "Basic container component - equivalent to HTML div",
    component: ViewExample,
  },
  {
    id: "text",
    title: "Text", 
    description: "Display text with various styles and properties",
    component: TextExample,
  },
  {
    id: "scrollview",
    title: "ScrollView",
    description: "Scrollable container for content that exceeds screen size",
    component: ScrollViewExample,
  },
  {
    id: "flatlist",
    title: "FlatList",
    description: "Performant list component for large datasets",
    component: FlatListExample,
  },
  {
    id: "sectionlist",
    title: "SectionList",
    description: "List with sections and headers",
    component: SectionListExample,
  },
  {
    id: "touchable",
    title: "Touchable Components",
    description: "TouchableOpacity, TouchableHighlight, Pressable",
    component: TouchableExample,
  },
  {
    id: "image",
    title: "Image",
    description: "Display images from various sources",
    component: ImageExample,
  },
  {
    id: "textinput",
    title: "TextInput",
    description: "Text input field with various configurations",
    component: TextInputExample,
  },
  {
    id: "modal",
    title: "Modal",
    description: "Overlay component for dialogs and popups",
    component: ModalExample,
  },
  {
    id: "activityindicator",
    title: "ActivityIndicator",
    description: "Loading spinner component",
    component: ActivityIndicatorExample,
  },
  {
    id: "switch",
    title: "Switch",
    description: "Toggle switch for boolean values",
    component: SwitchExample,
  },
  {
    id: "refreshcontrol",
    title: "RefreshControl",
    description: "Pull-to-refresh functionality for ScrollView and FlatList",
    component: RefreshControlExample,
  },
];

const CoreComponentsExamples: React.FC = () => {
  const [currentExample, setCurrentExample] = React.useState<string | null>(null);

  if (currentExample) {
    const example = componentExamples.find(ex => ex.id === currentExample);
    if (example) {
      const Component = example.component;
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => setCurrentExample(null)}
            >
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{example.title}</Text>
          </View>
          <Component />
        </SafeAreaView>
      );
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Core React Native Components</Text>
        <Text style={styles.subtitle}>
          Interactive examples of essential React Native components
        </Text>
        
        {componentExamples.map((example) => (
          <TouchableOpacity
            key={example.id}
            style={styles.exampleCard}
            onPress={() => setCurrentExample(example.id)}
          >
            <Text style={styles.exampleTitle}>{example.title}</Text>
            <Text style={styles.exampleDescription}>{example.description}</Text>
            <Text style={styles.tapHint}>Tap to explore →</Text>
          </TouchableOpacity>
        ))}
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Learn the building blocks of React Native UI
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    marginRight: 15,
  },
  backButtonText: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "500",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#666",
    fontStyle: "italic",
  },
  exampleCard: {
    backgroundColor: "white",
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exampleTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#007AFF",
  },
  exampleDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 8,
  },
  tapHint: {
    fontSize: 12,
    color: "#007AFF",
    fontWeight: "500",
  },
  footer: {
    padding: 20,
    marginTop: 20,
  },
  footerText: {
    fontSize: 12,
    textAlign: "center",
    color: "#999",
    fontStyle: "italic",
  },
});

export default CoreComponentsExamples;
