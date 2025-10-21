import React, { useState, useTransition, useMemo } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator,
  Alert 
} from 'react-native';

// Simulate a heavy computation component
const HeavyListComponent: React.FC<{ count: number }> = ({ count }) => {
  const heavyData = useMemo(() => {
    // Simulate heavy computation
    const items = [];
    for (let i = 0; i < count; i++) {
      // Add some computational work to make it actually slow
      let sum = 0;
      for (let j = 0; j < 1000; j++) {
        sum += Math.random();
      }
      items.push({
        id: i,
        value: `Item ${i + 1}`,
        computation: sum.toFixed(2)
      });
    }
    return items;
  }, [count]);

  return (
    <View style={styles.heavyListContainer}>
      <Text style={styles.heavyListTitle}>Heavy Computation Results ({count} items)</Text>
      <ScrollView style={styles.heavyList} nestedScrollEnabled>
        {heavyData.map((item) => (
          <View key={item.id} style={styles.heavyListItem}>
            <Text style={styles.itemText}>{item.value}</Text>
            <Text style={styles.itemComputation}>Sum: {item.computation}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const UseTransitionExample: React.FC = () => {
  const [showHeavyList, setShowHeavyList] = useState(false);
  const [itemCount, setItemCount] = useState(100);
  const [counter, setCounter] = useState(0);
  const [isPending, startTransition] = useTransition();

  // Normal state update (blocking)
  const handleNormalUpdate = () => {
    setShowHeavyList(true);
    setItemCount(itemCount + 500);
  };

  // Transition update (non-blocking)
  const handleTransitionUpdate = () => {
    setShowHeavyList(true);
    startTransition(() => {
      setItemCount(itemCount + 500);
    });
  };

  const resetDemo = () => {
    setShowHeavyList(false);
    setItemCount(100);
  };

  const incrementCounter = () => {
    setCounter(prev => prev + 1);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>useTransition Example</Text>
      
      <Text style={styles.explanation}>
        useTransition allows you to mark state updates as non-urgent, 
        keeping the UI responsive during heavy computations.
      </Text>

      {/* Counter Demo */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Responsive UI Test</Text>
        <Text style={styles.sectionDescription}>
          This counter should remain responsive even during heavy operations
        </Text>
        
        <View style={styles.counterContainer}>
          <Text style={styles.counterText}>Counter: {counter}</Text>
          <TouchableOpacity style={styles.counterButton} onPress={incrementCounter}>
            <Text style={styles.buttonText}>Increment Counter</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Transition Demo Controls */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Heavy Computation Demo</Text>
        <Text style={styles.sectionDescription}>
          Compare normal updates vs transition updates
        </Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.demoButton, styles.normalButton]} 
            onPress={handleNormalUpdate}
            disabled={isPending}
          >
            <Text style={styles.buttonText}>
              Normal Update (Blocking)
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.demoButton, styles.transitionButton]} 
            onPress={handleTransitionUpdate}
            disabled={isPending}
          >
            <Text style={styles.buttonText}>
              Transition Update (Non-blocking)
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.demoButton, styles.resetButton]} 
            onPress={resetDemo}
            disabled={isPending}
          >
            <Text style={styles.buttonText}>Reset Demo</Text>
          </TouchableOpacity>
        </View>

        {/* Pending Indicator */}
        {isPending && (
          <View style={styles.pendingContainer}>
            <ActivityIndicator size="small" color="#007AFF" />
            <Text style={styles.pendingText}>Transition in progress...</Text>
          </View>
        )}

        {/* Current State */}
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>
            Status: {isPending ? "⏳ Transitioning" : "✅ Ready"}
          </Text>
          <Text style={styles.statusText}>
            Item Count: {itemCount}
          </Text>
          <Text style={styles.statusText}>
            Heavy List: {showHeavyList ? "Visible" : "Hidden"}
          </Text>
        </View>
      </View>

      {/* Heavy Component */}
      {showHeavyList && (
        <View style={styles.section}>
          <HeavyListComponent count={itemCount} />
        </View>
      )}

      {/* Information Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>useTransition Key Concepts:</Text>
        <Text style={styles.infoText}>
          • <Text style={styles.highlight}>isPending</Text>: Boolean indicating if transition is in progress
        </Text>
        <Text style={styles.infoText}>
          • <Text style={styles.highlight}>startTransition</Text>: Function to mark updates as non-urgent
        </Text>
        <Text style={styles.infoText}>
          • <Text style={styles.highlight}>Non-blocking</Text>: UI remains responsive during heavy updates
        </Text>
        <Text style={styles.infoText}>
          • <Text style={styles.highlight}>Automatic batching</Text>: React batches transition updates
        </Text>
        <Text style={styles.infoText}>
          • <Text style={styles.highlight}>Interruption</Text>: New urgent updates can interrupt transitions
        </Text>
      </View>

      {/* Usage Tips */}
      <View style={styles.tipsContainer}>
        <Text style={styles.tipsTitle}>When to use useTransition:</Text>
        <Text style={styles.tipText}>✅ Heavy list filtering or sorting</Text>
        <Text style={styles.tipText}>✅ Complex data transformations</Text>
        <Text style={styles.tipText}>✅ Large component tree updates</Text>
        <Text style={styles.tipText}>✅ Non-critical UI updates</Text>
        <Text style={styles.tipText}>❌ Don't use for urgent updates (user input)</Text>
        <Text style={styles.tipText}>❌ Not needed for simple state changes</Text>
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
    marginBottom: 20,
    color: "#666",
    fontStyle: "italic",
    lineHeight: 20,
  },
  section: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
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
    lineHeight: 18,
  },
  counterContainer: {
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f8f9fa",
    borderRadius: 6,
  },
  counterText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  counterButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  buttonContainer: {
    marginBottom: 15,
  },
  demoButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  normalButton: {
    backgroundColor: "#FF6B6B",
  },
  transitionButton: {
    backgroundColor: "#4ECDC4",
  },
  resetButton: {
    backgroundColor: "#95A5A6",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  pendingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#E3F2FD",
    borderRadius: 6,
    marginBottom: 10,
  },
  pendingText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#1976D2",
    fontWeight: "500",
  },
  statusContainer: {
    backgroundColor: "#f8f9fa",
    padding: 10,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 3,
  },
  heavyListContainer: {
    backgroundColor: "#f8f9fa",
    borderRadius: 6,
    padding: 10,
  },
  heavyListTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  heavyList: {
    maxHeight: 200,
  },
  heavyListItem: {
    backgroundColor: "white",
    padding: 10,
    marginBottom: 5,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemText: {
    fontSize: 14,
    color: "#333",
    flex: 1,
  },
  itemComputation: {
    fontSize: 12,
    color: "#666",
  },
  infoContainer: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
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
    marginBottom: 6,
    lineHeight: 18,
  },
  highlight: {
    color: "#007AFF",
    fontWeight: "600",
  },
  tipsContainer: {
    backgroundColor: "#E8F5E8",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2E7D32",
  },
  tipText: {
    fontSize: 14,
    color: "#388E3C",
    marginBottom: 4,
    lineHeight: 18,
  },
});

export default UseTransitionExample;