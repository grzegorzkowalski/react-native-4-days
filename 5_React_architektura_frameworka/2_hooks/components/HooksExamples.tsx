import React from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView 
} from "react-native";

import UseStateExample from "./UseStateExample";
import UseEffectExample from "./UseEffectExample";
import UseRefExample from "./UseRefExample";
import UseMemoExample from "./UseMemoExample";
import UseCallbackExample from "./UseCallbackExample";
import UseReducerExample from "./UseReducerExample";
import ForwardRefExample from "./ForwardRefExample";
import UseDeferredValueExample from "./UseDeferredValueExample";
import UseContextExample from "./UseContextExample";
import UseLayoutEffectExample from "./UseLayoutEffectExample";
import UseIdExample from "./UseIdExample";
import UseTransitionExample from "./UseTransitionExample";

type HookExample = {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType;
};

const hookExamples: HookExample[] = [
  {
    id: "useState",
    title: "useState",
    description: "Button color change with state management",
    component: UseStateExample,
  },
  {
    id: "useEffect",
    title: "useEffect",
    description: "Quiz app with effect cleanup and dependencies",
    component: UseEffectExample,
  },
  {
    id: "useRef",
    title: "useRef",
    description: "Animation and DOM reference management",
    component: UseRefExample,
  },
  {
    id: "useMemo",
    title: "useMemo",
    description: "Factorial calculation with memoization",
    component: UseMemoExample,
  },
  {
    id: "useCallback",
    title: "useCallback",
    description: "Prevent unnecessary re-renders with memoized callbacks",
    component: UseCallbackExample,
  },
  {
    id: "useReducer",
    title: "useReducer",
    description: "State management with reducer pattern",
    component: UseReducerExample,
  },
  {
    id: "forwardRef",
    title: "forwardRef",
    description: "Ref forwarding between parent and child components",
    component: ForwardRefExample,
  },
  {
    id: "useDeferredValue",
    title: "useDeferredValue",
    description: "Performance optimization with deferred values",
    component: UseDeferredValueExample,
  },
  {
    id: "useContext",
    title: "useContext",
    description: "Share state across components without prop drilling",
    component: UseContextExample,
  },
  {
    id: "useLayoutEffect",
    title: "useLayoutEffect",
    description: "Synchronous effects for measurements and layout",
    component: UseLayoutEffectExample,
  },
  {
    id: "useId",
    title: "useId",
    description: "Generate unique IDs for accessibility and forms",
    component: UseIdExample,
  },
  {
    id: "useTransition",
    title: "useTransition",
    description: "Handle heavy updates without blocking UI",
    component: UseTransitionExample,
  },
];

const HooksExamples: React.FC = () => {
  const [currentExample, setCurrentExample] = React.useState<string | null>(null);

  if (currentExample) {
    const example = hookExamples.find(ex => ex.id === currentExample);
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
        <Text style={styles.title}>React Hooks Examples</Text>
        <Text style={styles.subtitle}>
          Converted from Next.js to React Native
        </Text>
        
        {hookExamples.map((example) => (
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
            Each example demonstrates different React hooks concepts
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

export default HooksExamples;
