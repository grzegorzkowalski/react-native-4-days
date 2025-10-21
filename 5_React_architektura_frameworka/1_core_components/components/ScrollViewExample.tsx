import React, { useRef, useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Dimensions 
} from "react-native";

const { width } = Dimensions.get("window");

const ScrollViewExample: React.FC = () => {
  const verticalScrollRef = useRef<ScrollView>(null);
  const horizontalScrollRef = useRef<ScrollView>(null);
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });

  const scrollToTop = () => {
    verticalScrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const scrollToBottom = () => {
    verticalScrollRef.current?.scrollToEnd({ animated: true });
  };

  const scrollToLeft = () => {
    horizontalScrollRef.current?.scrollTo({ x: 0, animated: true });
  };

  const scrollToRight = () => {
    horizontalScrollRef.current?.scrollToEnd({ animated: true });
  };

  const generateVerticalContent = () => {
    return Array.from({ length: 20 }, (_, index) => (
      <View key={index} style={styles.contentItem}>
        <Text style={styles.contentText}>Vertical Item {index + 1}</Text>
        <Text style={styles.contentSubtext}>
          This is content item number {index + 1}. ScrollView allows you to scroll through content
          that exceeds the screen size.
        </Text>
      </View>
    ));
  };

  const generateHorizontalCards = () => {
    const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FCEA2B", "#FF9FF3", "#54A0FF"];
    
    return Array.from({ length: 10 }, (_, index) => (
      <View 
        key={index} 
        style={[
          styles.horizontalCard,
          { backgroundColor: colors[index % colors.length] }
        ]}
      >
        <Text style={styles.cardText}>Card {index + 1}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ScrollView Examples</Text>
      
      <Text style={styles.sectionTitle}>1. Vertical ScrollView</Text>
      
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.controlButton} onPress={scrollToTop}>
          <Text style={styles.buttonText}>Top</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={scrollToBottom}>
          <Text style={styles.buttonText}>Bottom</Text>
        </TouchableOpacity>
        <View style={styles.positionIndicator}>
          <Text style={styles.positionText}>
            Y: {Math.round(scrollPosition.y)}
          </Text>
        </View>
      </View>

      <ScrollView
        ref={verticalScrollRef}
        style={styles.verticalScrollView}
        onScroll={(event) => {
          setScrollPosition({
            x: scrollPosition.x,
            y: event.nativeEvent.contentOffset.y
          });
        }}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={true}
      >
        {generateVerticalContent()}
      </ScrollView>

      <Text style={styles.sectionTitle}>2. Horizontal ScrollView</Text>
      
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.controlButton} onPress={scrollToLeft}>
          <Text style={styles.buttonText}>Left</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={scrollToRight}>
          <Text style={styles.buttonText}>Right</Text>
        </TouchableOpacity>
        <View style={styles.positionIndicator}>
          <Text style={styles.positionText}>
            X: {Math.round(scrollPosition.x)}
          </Text>
        </View>
      </View>

      <ScrollView
        ref={horizontalScrollRef}
        horizontal={true}
        style={styles.horizontalScrollView}
        contentContainerStyle={styles.horizontalContent}
        onScroll={(event) => {
          setScrollPosition({
            x: event.nativeEvent.contentOffset.x,
            y: scrollPosition.y
          });
        }}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={true}
      >
        {generateHorizontalCards()}
      </ScrollView>

      <Text style={styles.sectionTitle}>3. ScrollView Properties</Text>
      
      <View style={styles.propertiesContainer}>
        <View style={styles.propertyItem}>
          <Text style={styles.propertyTitle}>Bounce Effect</Text>
          <ScrollView style={styles.miniScrollView} bounces={true}>
            <View style={styles.bounceContent}>
              <Text style={styles.miniText}>Pull down to see bounce effect</Text>
            </View>
          </ScrollView>
        </View>

        <View style={styles.propertyItem}>
          <Text style={styles.propertyTitle}>No Bounce</Text>
          <ScrollView style={styles.miniScrollView} bounces={false}>
            <View style={styles.bounceContent}>
              <Text style={styles.miniText}>No bounce effect here</Text>
            </View>
          </ScrollView>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>ScrollView Key Props:</Text>
        <Text style={styles.infoText}>• horizontal - Enable horizontal scrolling</Text>
        <Text style={styles.infoText}>• showsVerticalScrollIndicator - Show/hide scroll indicator</Text>
        <Text style={styles.infoText}>• bounces - Enable bounce effect at scroll boundaries</Text>
        <Text style={styles.infoText}>• scrollEventThrottle - Frequency of scroll events</Text>
        <Text style={styles.infoText}>• contentContainerStyle - Style for scroll content</Text>
        <Text style={styles.infoText}>• onScroll - Callback for scroll events</Text>
        <Text style={styles.infoText}>• pagingEnabled - Snap to page boundaries</Text>
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
    marginBottom: 20,
    color: "#333",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
    color: "#444",
  },
  controlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
  },
  controlButton: {
    backgroundColor: "#007AFF",
    padding: 8,
    borderRadius: 6,
    marginRight: 10,
    minWidth: 60,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  positionIndicator: {
    flex: 1,
    alignItems: "flex-end",
  },
  positionText: {
    fontSize: 12,
    color: "#666",
    fontFamily: "monospace",
  },
  verticalScrollView: {
    height: 200,
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 15,
  },
  contentItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  contentText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  contentSubtext: {
    fontSize: 12,
    color: "#666",
    lineHeight: 18,
  },
  horizontalScrollView: {
    height: 120,
    marginBottom: 15,
  },
  horizontalContent: {
    paddingHorizontal: 10,
    alignItems: "center",
  },
  horizontalCard: {
    width: 100,
    height: 80,
    marginRight: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  propertiesContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  propertyItem: {
    flex: 1,
    marginHorizontal: 5,
  },
  propertyTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
    textAlign: "center",
  },
  miniScrollView: {
    height: 80,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  bounceContent: {
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  miniText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
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

export default ScrollViewExample;
