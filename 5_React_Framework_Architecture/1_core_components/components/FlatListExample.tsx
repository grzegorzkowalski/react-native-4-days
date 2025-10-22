import React, { useState, useRef } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  ListRenderItem
} from "react-native";

interface ListItem {
  id: string;
  title: string;
  subtitle: string;
  color: string;
}

const FlatListExample: React.FC = () => {
  const flatListRef = useRef<FlatList>(null);
  const [data, setData] = useState<ListItem[]>(generateInitialData());
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  function generateInitialData(): ListItem[] {
    const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FCEA2B", "#FF9FF3", "#54A0FF"];
    
    return Array.from({ length: 20 }, (_, index) => ({
      id: `item-${index}`,
      title: `Item ${index + 1}`,
      subtitle: `This is the subtitle for item number ${index + 1}`,
      color: colors[index % colors.length],
    }));
  }

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setData(generateInitialData());
    setRefreshing(false);
  };

  const loadMoreData = async () => {
    if (loadingMore) return;
    
    setLoadingMore(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newItems = Array.from({ length: 10 }, (_, index) => ({
      id: `item-${data.length + index}`,
      title: `Item ${data.length + index + 1}`,
      subtitle: `This is the subtitle for item number ${data.length + index + 1}`,
      color: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FCEA2B"][index % 5],
    }));
    
    setData(prevData => [...prevData, ...newItems]);
    setLoadingMore(false);
  };

  const toggleItemSelection = (itemId: string) => {
    const newSelection = new Set(selectedItems);
    if (newSelection.has(itemId)) {
      newSelection.delete(itemId);
    } else {
      newSelection.add(itemId);
    }
    setSelectedItems(newSelection);
  };

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const scrollToEnd = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  const scrollToIndex = (index: number) => {
    if (index < data.length) {
      flatListRef.current?.scrollToIndex({ index, animated: true });
    }
  };

  const renderItem: ListRenderItem<ListItem> = ({ item, index }) => {
    const isSelected = selectedItems.has(item.id);
    
    return (
      <TouchableOpacity
        style={[
          styles.listItem,
          isSelected && styles.selectedItem
        ]}
        onPress={() => toggleItemSelection(item.id)}
      >
        <View style={[styles.colorIndicator, { backgroundColor: item.color }]} />
        <View style={styles.itemContent}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
          <Text style={styles.itemIndex}>Index: {index}</Text>
        </View>
        {isSelected && (
          <View style={styles.checkmark}>
            <Text style={styles.checkmarkText}>✓</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>FlatList Header</Text>
      <Text style={styles.headerSubtext}>Pull down to refresh • Scroll to bottom to load more</Text>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footer}>
      {loadingMore ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <Text style={styles.footerText}>End of list • Total items: {data.length}</Text>
      )}
    </View>
  );

  const renderSeparator = () => (
    <View style={styles.separator} />
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No items found</Text>
    </View>
  );

  const keyExtractor = (item: ListItem) => item.id;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FlatList Examples</Text>
      
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.controlButton} onPress={scrollToTop}>
          <Text style={styles.buttonText}>Top</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={() => scrollToIndex(10)}>
          <Text style={styles.buttonText}>Item 10</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={scrollToEnd}>
          <Text style={styles.buttonText}>End</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          Selected: {selectedItems.size} items
        </Text>
        <TouchableOpacity 
          style={styles.clearButton}
          onPress={() => setSelectedItems(new Set())}
        >
          <Text style={styles.clearButtonText}>Clear Selection</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        style={styles.flatList}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        ItemSeparatorComponent={renderSeparator}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#007AFF"]}
            tintColor="#007AFF"
          />
        }
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.1}
        getItemLayout={(data, index) => ({
          length: 80, // Height of each item
          offset: 80 * index,
          index,
        })}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        windowSize={10}
      />

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>FlatList Key Props:</Text>
        <Text style={styles.infoText}>• data - Array of items to render</Text>
        <Text style={styles.infoText}>• renderItem - Function to render each item</Text>
        <Text style={styles.infoText}>• keyExtractor - Function to generate unique keys</Text>
        <Text style={styles.infoText}>• onEndReached - Load more data when reaching end</Text>
        <Text style={styles.infoText}>• refreshControl - Pull-to-refresh functionality</Text>
        <Text style={styles.infoText}>• getItemLayout - Performance optimization</Text>
        <Text style={styles.infoText}>• ListHeaderComponent - Header component</Text>
        <Text style={styles.infoText}>• ListFooterComponent - Footer component</Text>
      </View>
    </View>
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
    marginBottom: 15,
    color: "#333",
  },
  controlsContainer: {
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    justifyContent: "space-around",
  },
  controlButton: {
    backgroundColor: "#007AFF",
    padding: 8,
    borderRadius: 6,
    minWidth: 60,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  statsText: {
    fontSize: 14,
    color: "#333",
  },
  clearButton: {
    backgroundColor: "#FF3B30",
    padding: 6,
    borderRadius: 4,
  },
  clearButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  flatList: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 10,
  },
  header: {
    padding: 15,
    backgroundColor: "#f8f9fa",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  headerSubtext: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 5,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "white",
  },
  selectedItem: {
    backgroundColor: "#E3F2FD",
  },
  colorIndicator: {
    width: 4,
    height: 50,
    borderRadius: 2,
    marginRight: 15,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  itemIndex: {
    fontSize: 12,
    color: "#999",
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },
  checkmarkText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  separator: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginLeft: 15,
  },
  footer: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  footerText: {
    fontSize: 14,
    color: "#666",
  },
  emptyContainer: {
    padding: 50,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
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
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
});

export default FlatListExample;
