import React, { useState, useCallback } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  RefreshControl,
  FlatList,
  TouchableOpacity,
  Alert
} from "react-native";

interface DataItem {
  id: string;
  title: string;
  subtitle: string;
  timestamp: string;
}

const RefreshControlExample: React.FC = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [scrollRefreshing, setScrollRefreshing] = useState<boolean>(false);
  const [listRefreshing, setListRefreshing] = useState<boolean>(false);
  const [lastRefresh, setLastRefresh] = useState<string>(new Date().toLocaleTimeString());
  const [refreshCount, setRefreshCount] = useState<number>(0);
  
  const [data, setData] = useState<DataItem[]>([
    { id: '1', title: 'Item 1', subtitle: 'First item in the list', timestamp: '10:00 AM' },
    { id: '2', title: 'Item 2', subtitle: 'Second item in the list', timestamp: '10:15 AM' },
    { id: '3', title: 'Item 3', subtitle: 'Third item in the list', timestamp: '10:30 AM' },
    { id: '4', title: 'Item 4', subtitle: 'Fourth item in the list', timestamp: '10:45 AM' },
    { id: '5', title: 'Item 5', subtitle: 'Fifth item in the list', timestamp: '11:00 AM' },
  ]);

  // Basic refresh handler
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
      setLastRefresh(new Date().toLocaleTimeString());
      setRefreshCount(prev => prev + 1);
      Alert.alert("Refreshed!", "Content has been updated");
    }, 2000);
  }, []);

  // ScrollView refresh handler
  const onScrollRefresh = useCallback(() => {
    setScrollRefreshing(true);
    
    setTimeout(() => {
      setScrollRefreshing(false);
      setLastRefresh(new Date().toLocaleTimeString());
    }, 1500);
  }, []);

  // FlatList refresh handler with data update
  const onListRefresh = useCallback(() => {
    setListRefreshing(true);
    
    setTimeout(() => {
      // Add new item to the beginning of the list
      const newItem: DataItem = {
        id: Date.now().toString(),
        title: `New Item ${data.length + 1}`,
        subtitle: 'Recently added item',
        timestamp: new Date().toLocaleTimeString(),
      };
      
      setData(prevData => [newItem, ...prevData]);
      setListRefreshing(false);
      setLastRefresh(new Date().toLocaleTimeString());
    }, 2000);
  }, [data.length]);

  const renderDataItem = ({ item }: { item: DataItem }) => (
    <View style={styles.dataItem}>
      <View style={styles.dataItemContent}>
        <Text style={styles.dataItemTitle}>{item.title}</Text>
        <Text style={styles.dataItemSubtitle}>{item.subtitle}</Text>
      </View>
      <Text style={styles.dataItemTime}>{item.timestamp}</Text>
    </View>
  );

  const clearData = () => {
    setData([]);
    Alert.alert("Cleared", "All data has been cleared. Pull to refresh to reload.");
  };

  const resetData = () => {
    setData([
      { id: '1', title: 'Item 1', subtitle: 'First item in the list', timestamp: '10:00 AM' },
      { id: '2', title: 'Item 2', subtitle: 'Second item in the list', timestamp: '10:15 AM' },
      { id: '3', title: 'Item 3', subtitle: 'Third item in the list', timestamp: '10:30 AM' },
      { id: '4', title: 'Item 4', subtitle: 'Fourth item in the list', timestamp: '10:45 AM' },
      { id: '5', title: 'Item 5', subtitle: 'Fifth item in the list', timestamp: '11:00 AM' },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RefreshControl Example</Text>
      
      {/* Status Info */}
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>Last Refresh: {lastRefresh}</Text>
        <Text style={styles.statusText}>Refresh Count: {refreshCount}</Text>
        <Text style={styles.statusText}>Data Items: {data.length}</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={clearData}>
          <Text style={styles.buttonText}>Clear Data</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={resetData}>
          <Text style={styles.buttonText}>Reset Data</Text>
        </TouchableOpacity>
      </View>

      {/* Basic RefreshControl with ScrollView */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic RefreshControl</Text>
        <Text style={styles.sectionDescription}>
          Pull down to refresh the content
        </Text>
        
        <ScrollView
          style={styles.scrollViewExample}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#007AFF']} // Android
              tintColor="#007AFF" // iOS
              title="Pull to refresh..." // iOS
              titleColor="#666" // iOS
            />
          }
        >
          <View style={styles.scrollContent}>
            <Text style={styles.contentText}>
              📱 This is a ScrollView with RefreshControl
            </Text>
            <Text style={styles.contentText}>
              🔄 Pull down from the top to trigger refresh
            </Text>
            <Text style={styles.contentText}>
              ⏰ Last updated: {lastRefresh}
            </Text>
            <Text style={styles.contentText}>
              🔢 Refresh count: {refreshCount}
            </Text>
            
            {refreshing && (
              <Text style={styles.refreshingText}>
                🔄 Refreshing content...
              </Text>
            )}
          </View>
        </ScrollView>
      </View>

      {/* Custom Colors RefreshControl */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Colors</Text>
        
        <ScrollView
          style={styles.scrollViewCustom}
          refreshControl={
            <RefreshControl
              refreshing={scrollRefreshing}
              onRefresh={onScrollRefresh}
              colors={['#FF6B6B', '#4ECDC4', '#45B7D1']} // Android
              tintColor="#FF6B6B" // iOS
              title="Custom refresh..." // iOS
              titleColor="#FF6B6B" // iOS
              progressBackgroundColor="#f0f0f0" // Android
            />
          }
        >
          <View style={styles.customScrollContent}>
            <Text style={styles.customContentText}>
              🎨 Custom colored refresh control
            </Text>
            <Text style={styles.customContentText}>
              🌈 Different colors on Android and iOS
            </Text>
            <Text style={styles.customContentText}>
              ✨ Custom background and tint colors
            </Text>
            
            {scrollRefreshing && (
              <Text style={styles.customRefreshingText}>
                🎨 Refreshing with style...
              </Text>
            )}
          </View>
        </ScrollView>
      </View>

      {/* FlatList with RefreshControl */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>FlatList with RefreshControl</Text>
        <Text style={styles.sectionDescription}>
          Pull to refresh and add new items
        </Text>
        
        <FlatList
          data={data}
          renderItem={renderDataItem}
          keyExtractor={(item) => item.id}
          style={styles.flatListExample}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={listRefreshing}
              onRefresh={onListRefresh}
              colors={['#34C759']} // Android
              tintColor="#34C759" // iOS
              title="Loading new data..." // iOS
              titleColor="#34C759" // iOS
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No data available</Text>
              <Text style={styles.emptySubText}>Pull down to refresh and load data</Text>
            </View>
          }
          ListHeaderComponent={
            listRefreshing ? (
              <View style={styles.loadingHeader}>
                <Text style={styles.loadingHeaderText}>Loading new items...</Text>
              </View>
            ) : null
          }
        />
      </View>

      {/* Advanced Usage */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Advanced Usage Tips</Text>
        
        <View style={styles.tipContainer}>
          <Text style={styles.tipTitle}>🎯 Best Practices:</Text>
          <Text style={styles.tipText}>• Keep refresh duration under 3 seconds</Text>
          <Text style={styles.tipText}>• Provide visual feedback during refresh</Text>
          <Text style={styles.tipText}>• Use appropriate colors for your theme</Text>
          <Text style={styles.tipText}>• Handle empty states gracefully</Text>
          <Text style={styles.tipText}>• Show meaningful loading messages</Text>
        </View>
        
        <View style={styles.tipContainer}>
          <Text style={styles.tipTitle}>⚡ Performance Tips:</Text>
          <Text style={styles.tipText}>• Use useCallback for refresh handlers</Text>
          <Text style={styles.tipText}>• Avoid heavy operations during refresh</Text>
          <Text style={styles.tipText}>• Consider pagination for large datasets</Text>
          <Text style={styles.tipText}>• Cache data when appropriate</Text>
        </View>
      </View>

      {/* Info Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>RefreshControl Key Props:</Text>
        <Text style={styles.infoText}>• refreshing - Whether refresh is in progress</Text>
        <Text style={styles.infoText}>• onRefresh - Function called when user pulls to refresh</Text>
        <Text style={styles.infoText}>• colors - Refresh indicator colors (Android)</Text>
        <Text style={styles.infoText}>• tintColor - Refresh indicator color (iOS)</Text>
        <Text style={styles.infoText}>• title - Loading text (iOS)</Text>
        <Text style={styles.infoText}>• titleColor - Loading text color (iOS)</Text>
        <Text style={styles.infoText}>• progressBackgroundColor - Background color (Android)</Text>
      </View>
    </View>
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
  statusContainer: {
    backgroundColor: "white",
    margin: 15,
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
    fontFamily: "monospace",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 15,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  section: {
    margin: 15,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 15,
    paddingBottom: 5,
    color: "#333",
  },
  sectionDescription: {
    fontSize: 14,
    color: "#666",
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  scrollViewExample: {
    height: 150,
    backgroundColor: "#f8f9fa",
  },
  scrollContent: {
    padding: 20,
    alignItems: "center",
  },
  contentText: {
    fontSize: 16,
    color: "#495057",
    marginBottom: 10,
    textAlign: "center",
  },
  refreshingText: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "600",
    marginTop: 10,
  },
  scrollViewCustom: {
    height: 120,
    backgroundColor: "#fff5f5",
  },
  customScrollContent: {
    padding: 20,
    alignItems: "center",
  },
  customContentText: {
    fontSize: 14,
    color: "#FF6B6B",
    marginBottom: 8,
    textAlign: "center",
  },
  customRefreshingText: {
    fontSize: 14,
    color: "#FF6B6B",
    fontWeight: "600",
    marginTop: 10,
  },
  flatListExample: {
    height: 200,
    backgroundColor: "#f8fff8",
  },
  dataItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  dataItemContent: {
    flex: 1,
  },
  dataItemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  dataItemSubtitle: {
    fontSize: 12,
    color: "#666",
  },
  dataItemTime: {
    fontSize: 12,
    color: "#34C759",
    fontWeight: "500",
  },
  emptyContainer: {
    padding: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  emptySubText: {
    fontSize: 12,
    color: "#999",
  },
  loadingHeader: {
    padding: 10,
    backgroundColor: "#e8f5e8",
    alignItems: "center",
  },
  loadingHeaderText: {
    fontSize: 12,
    color: "#34C759",
    fontWeight: "500",
  },
  tipContainer: {
    margin: 15,
    padding: 15,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#007AFF",
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  tipText: {
    fontSize: 12,
    color: "#495057",
    marginBottom: 4,
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

export default RefreshControlExample;
