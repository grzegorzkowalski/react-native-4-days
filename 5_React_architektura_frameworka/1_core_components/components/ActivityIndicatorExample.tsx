import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Switch
} from "react-native";

const ActivityIndicatorExample: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSpinner, setShowSpinner] = useState<boolean>(true);
  const [simulatedProgress, setSimulatedProgress] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // Simulate loading process
  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  // Simulate progress
  const simulateProgress = () => {
    setIsSimulating(true);
    setSimulatedProgress(0);
    
    const interval = setInterval(() => {
      setSimulatedProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSimulating(false);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  // Auto-reset progress after completion
  useEffect(() => {
    if (simulatedProgress === 100) {
      setTimeout(() => {
        setSimulatedProgress(0);
      }, 1000);
    }
  }, [simulatedProgress]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>ActivityIndicator Example</Text>
      
      {/* Basic Activity Indicators */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Activity Indicators</Text>
        
        <View style={styles.indicatorRow}>
          <View style={styles.indicatorItem}>
            <ActivityIndicator size="small" color="#007AFF" />
            <Text style={styles.indicatorLabel}>Small</Text>
          </View>
          
          <View style={styles.indicatorItem}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.indicatorLabel}>Large</Text>
          </View>
        </View>
      </View>

      {/* Different Colors */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Different Colors</Text>
        
        <View style={styles.colorRow}>
          <View style={styles.colorItem}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.colorLabel}>Blue</Text>
          </View>
          
          <View style={styles.colorItem}>
            <ActivityIndicator size="large" color="#34C759" />
            <Text style={styles.colorLabel}>Green</Text>
          </View>
          
          <View style={styles.colorItem}>
            <ActivityIndicator size="large" color="#FF3B30" />
            <Text style={styles.colorLabel}>Red</Text>
          </View>
          
          <View style={styles.colorItem}>
            <ActivityIndicator size="large" color="#FF9500" />
            <Text style={styles.colorLabel}>Orange</Text>
          </View>
        </View>
      </View>

      {/* Toggle Visibility */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Toggle Visibility</Text>
        
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleLabel}>Show Spinner:</Text>
          <Switch
            value={showSpinner}
            onValueChange={setShowSpinner}
            trackColor={{ false: "#767577", true: "#007AFF" }}
            thumbColor={showSpinner ? "#fff" : "#f4f3f4"}
          />
        </View>
        
        <View style={styles.toggleSpinner}>
          <ActivityIndicator 
            size="large" 
            color="#007AFF" 
            animating={showSpinner}
          />
          <Text style={styles.spinnerStatus}>
            Status: {showSpinner ? "Animating" : "Stopped"}
          </Text>
        </View>
      </View>

      {/* Loading Simulation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Loading Simulation</Text>
        
        <TouchableOpacity
          style={[styles.loadButton, isLoading && styles.loadButtonDisabled]}
          onPress={simulateLoading}
          disabled={isLoading}
        >
          {isLoading ? (
            <View style={styles.loadingContent}>
              <ActivityIndicator size="small" color="white" />
              <Text style={styles.loadingText}>Loading...</Text>
            </View>
          ) : (
            <Text style={styles.buttonText}>Start Loading</Text>
          )}
        </TouchableOpacity>
        
        {isLoading && (
          <Text style={styles.loadingMessage}>
            Please wait while we process your request...
          </Text>
        )}
      </View>

      {/* Progress Simulation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Progress Simulation</Text>
        
        <TouchableOpacity
          style={[styles.progressButton, isSimulating && styles.progressButtonDisabled]}
          onPress={simulateProgress}
          disabled={isSimulating}
        >
          <Text style={styles.buttonText}>Start Progress</Text>
        </TouchableOpacity>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[styles.progressFill, { width: `${simulatedProgress}%` }]} 
            />
          </View>
          <Text style={styles.progressText}>{simulatedProgress}%</Text>
        </View>
        
        {isSimulating && (
          <View style={styles.progressSpinner}>
            <ActivityIndicator size="small" color="#007AFF" />
            <Text style={styles.progressStatus}>Processing...</Text>
          </View>
        )}
      </View>

      {/* Loading Overlays */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Loading Overlays</Text>
        
        <View style={styles.overlayExample}>
          <Text style={styles.overlayContent}>Content Area</Text>
          <Text style={styles.overlayContent}>This simulates content that would be covered by a loading overlay.</Text>
          
          {isLoading && (
            <View style={styles.loadingOverlay}>
              <View style={styles.overlaySpinner}>
                <ActivityIndicator size="large" color="white" />
                <Text style={styles.overlayText}>Loading...</Text>
              </View>
            </View>
          )}
        </View>
      </View>

      {/* Different Backgrounds */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Different Backgrounds</Text>
        
        <View style={styles.backgroundRow}>
          <View style={styles.lightBackground}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.backgroundLabel}>Light</Text>
          </View>
          
          <View style={styles.darkBackground}>
            <ActivityIndicator size="large" color="white" />
            <Text style={styles.darkBackgroundLabel}>Dark</Text>
          </View>
          
          <View style={styles.coloredBackground}>
            <ActivityIndicator size="large" color="white" />
            <Text style={styles.coloredBackgroundLabel}>Colored</Text>
          </View>
        </View>
      </View>

      {/* Custom Styled Indicators */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Styled Indicators</Text>
        
        <View style={styles.customRow}>
          <View style={styles.customIndicator1}>
            <ActivityIndicator size="large" color="#FF6B6B" />
          </View>
          
          <View style={styles.customIndicator2}>
            <ActivityIndicator size="small" color="#4ECDC4" />
          </View>
          
          <View style={styles.customIndicator3}>
            <ActivityIndicator size="large" color="#45B7D1" />
          </View>
        </View>
      </View>

      {/* Loading States */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Loading States</Text>
        
        <View style={styles.stateContainer}>
          <View style={styles.stateItem}>
            <ActivityIndicator size="small" color="#007AFF" />
            <Text style={styles.stateText}>Fetching data...</Text>
          </View>
          
          <View style={styles.stateItem}>
            <ActivityIndicator size="small" color="#FF9500" />
            <Text style={styles.stateText}>Uploading file...</Text>
          </View>
          
          <View style={styles.stateItem}>
            <ActivityIndicator size="small" color="#34C759" />
            <Text style={styles.stateText}>Processing...</Text>
          </View>
          
          <View style={styles.stateItem}>
            <ActivityIndicator size="small" color="#FF3B30" />
            <Text style={styles.stateText}>Connecting...</Text>
          </View>
        </View>
      </View>

      {/* Info Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>ActivityIndicator Key Props:</Text>
        <Text style={styles.infoText}>• animating - Whether to show the indicator</Text>
        <Text style={styles.infoText}>• color - Color of the spinner</Text>
        <Text style={styles.infoText}>• size - Size of the spinner (small, large, or number)</Text>
        <Text style={styles.infoText}>• hidesWhenStopped - Hide when animating is false (iOS)</Text>
        <Text style={styles.infoText}>• style - Custom styling for the indicator</Text>
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
    marginBottom: 15,
    color: "#333",
  },
  indicatorRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  indicatorItem: {
    alignItems: "center",
    padding: 20,
  },
  indicatorLabel: {
    marginTop: 10,
    fontSize: 14,
    color: "#666",
  },
  colorRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  colorItem: {
    alignItems: "center",
    margin: 10,
  },
  colorLabel: {
    marginTop: 8,
    fontSize: 12,
    color: "#666",
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  toggleLabel: {
    fontSize: 16,
    color: "#333",
  },
  toggleSpinner: {
    alignItems: "center",
    padding: 20,
  },
  spinnerStatus: {
    marginTop: 10,
    fontSize: 14,
    color: "#666",
  },
  loadButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  loadButtonDisabled: {
    backgroundColor: "#999",
  },
  loadingContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  loadingText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  loadingMessage: {
    textAlign: "center",
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
  },
  progressButton: {
    backgroundColor: "#34C759",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  progressButtonDisabled: {
    backgroundColor: "#999",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    marginRight: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#34C759",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: "#333",
    minWidth: 35,
  },
  progressSpinner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  progressStatus: {
    marginLeft: 10,
    fontSize: 14,
    color: "#666",
  },
  overlayExample: {
    height: 150,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 20,
    position: "relative",
    justifyContent: "center",
  },
  overlayContent: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  overlaySpinner: {
    alignItems: "center",
  },
  overlayText: {
    color: "white",
    fontSize: 16,
    marginTop: 10,
    fontWeight: "600",
  },
  backgroundRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  lightBackground: {
    backgroundColor: "#f8f9fa",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 3,
  },
  darkBackground: {
    backgroundColor: "#333",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 3,
  },
  coloredBackground: {
    backgroundColor: "#FF6B6B",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 3,
  },
  backgroundLabel: {
    marginTop: 10,
    fontSize: 12,
    color: "#333",
  },
  darkBackgroundLabel: {
    marginTop: 10,
    fontSize: 12,
    color: "white",
  },
  coloredBackgroundLabel: {
    marginTop: 10,
    fontSize: 12,
    color: "white",
    fontWeight: "600",
  },
  customRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  customIndicator1: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FFE5E5",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FF6B6B",
  },
  customIndicator2: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#E5F9F6",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4ECDC4",
  },
  customIndicator3: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: "#E5F4FD",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#45B7D1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  stateContainer: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 15,
  },
  stateItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  stateText: {
    marginLeft: 15,
    fontSize: 14,
    color: "#495057",
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

export default ActivityIndicatorExample;
