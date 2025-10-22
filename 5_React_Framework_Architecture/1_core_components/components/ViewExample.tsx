import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const ViewExample: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>View Component Examples</Text>
      
      <Text style={styles.sectionTitle}>1. Basic View</Text>
      <View style={styles.basicView}>
        <Text style={styles.viewText}>This is a basic View component</Text>
      </View>

      <Text style={styles.sectionTitle}>2. Views with Different Backgrounds</Text>
      <View style={styles.colorContainer}>
        <View style={[styles.colorBox, { backgroundColor: "#FF6B6B" }]}>
          <Text style={styles.colorText}>Red View</Text>
        </View>
        <View style={[styles.colorBox, { backgroundColor: "#4ECDC4" }]}>
          <Text style={styles.colorText}>Teal View</Text>
        </View>
        <View style={[styles.colorBox, { backgroundColor: "#45B7D1" }]}>
          <Text style={styles.colorText}>Blue View</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>3. Flexbox Layout Examples</Text>
      
      <Text style={styles.subsectionTitle}>Row Direction (flexDirection: "row")</Text>
      <View style={styles.flexRowContainer}>
        <View style={[styles.flexItem, { backgroundColor: "#FF9FF3" }]}>
          <Text style={styles.flexText}>1</Text>
        </View>
        <View style={[styles.flexItem, { backgroundColor: "#54A0FF" }]}>
          <Text style={styles.flexText}>2</Text>
        </View>
        <View style={[styles.flexItem, { backgroundColor: "#5F27CD" }]}>
          <Text style={styles.flexText}>3</Text>
        </View>
      </View>

      <Text style={styles.subsectionTitle}>Column Direction (flexDirection: "column")</Text>
      <View style={styles.flexColumnContainer}>
        <View style={[styles.flexItem, { backgroundColor: "#00D2D3" }]}>
          <Text style={styles.flexText}>A</Text>
        </View>
        <View style={[styles.flexItem, { backgroundColor: "#FF9F43" }]}>
          <Text style={styles.flexText}>B</Text>
        </View>
        <View style={[styles.flexItem, { backgroundColor: "#EE5A6F" }]}>
          <Text style={styles.flexText}>C</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>4. Justify Content Examples</Text>
      
      <Text style={styles.subsectionTitle}>justifyContent: "space-between"</Text>
      <View style={styles.justifyBetween}>
        <View style={styles.smallBox} />
        <View style={styles.smallBox} />
        <View style={styles.smallBox} />
      </View>

      <Text style={styles.subsectionTitle}>justifyContent: "center"</Text>
      <View style={styles.justifyCenter}>
        <View style={styles.smallBox} />
        <View style={styles.smallBox} />
        <View style={styles.smallBox} />
      </View>

      <Text style={styles.subsectionTitle}>justifyContent: "space-around"</Text>
      <View style={styles.justifyAround}>
        <View style={styles.smallBox} />
        <View style={styles.smallBox} />
        <View style={styles.smallBox} />
      </View>

      <Text style={styles.sectionTitle}>5. Align Items Examples</Text>
      
      <View style={styles.alignContainer}>
        <View style={styles.alignColumn}>
          <Text style={styles.alignTitle}>alignItems: "flex-start"</Text>
          <View style={styles.alignStart}>
            <View style={styles.alignBox} />
          </View>
        </View>
        
        <View style={styles.alignColumn}>
          <Text style={styles.alignTitle}>alignItems: "center"</Text>
          <View style={styles.alignCenterContainer}>
            <View style={styles.alignBox} />
          </View>
        </View>
        
        <View style={styles.alignColumn}>
          <Text style={styles.alignTitle}>alignItems: "flex-end"</Text>
          <View style={styles.alignEnd}>
            <View style={styles.alignBox} />
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>6. Border and Shadow Examples</Text>
      <View style={styles.borderContainer}>
        <View style={styles.borderedView}>
          <Text style={styles.borderText}>Border</Text>
        </View>
        <View style={styles.roundedView}>
          <Text style={styles.borderText}>Rounded</Text>
        </View>
        <View style={styles.shadowView}>
          <Text style={styles.borderText}>Shadow</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>7. Positioning Examples</Text>
      <View style={styles.positionContainer}>
        <View style={styles.relativeContainer}>
          <Text style={styles.positionLabel}>Relative Container</Text>
          <View style={styles.absoluteBox}>
            <Text style={styles.absoluteText}>Absolute</Text>
          </View>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>View Component Key Props:</Text>
        <Text style={styles.infoText}>• style - Apply styles (backgroundColor, margin, padding, etc.)</Text>
        <Text style={styles.infoText}>• flexDirection - Layout direction (row/column)</Text>
        <Text style={styles.infoText}>• justifyContent - Main axis alignment</Text>
        <Text style={styles.infoText}>• alignItems - Cross axis alignment</Text>
        <Text style={styles.infoText}>• position - Positioning (relative/absolute)</Text>
        <Text style={styles.infoText}>• overflow - Content overflow behavior</Text>
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
    marginBottom: 20,
    color: "#333",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#444",
  },
  subsectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 5,
    color: "#666",
  },
  basicView: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  viewText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  colorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  colorBox: {
    flex: 1,
    height: 80,
    margin: 5,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  colorText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  flexRowContainer: {
    flexDirection: "row",
    height: 60,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  flexColumnContainer: {
    flexDirection: "column",
    height: 120,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  flexItem: {
    flex: 1,
    margin: 2,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  flexText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  justifyBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
  },
  justifyCenter: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
  },
  justifyAround: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  smallBox: {
    width: 30,
    height: 30,
    backgroundColor: "#007AFF",
    borderRadius: 4,
  },
  alignContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  alignColumn: {
    flex: 1,
    margin: 2,
  },
  alignTitle: {
    fontSize: 10,
    textAlign: "center",
    marginBottom: 5,
    color: "#666",
  },
  alignStart: {
    alignItems: "flex-start",
    backgroundColor: "white",
    height: 60,
    borderRadius: 8,
    padding: 10,
  },
  alignCenterContainer: {
    alignItems: "center",
    backgroundColor: "white",
    height: 60,
    borderRadius: 8,
    padding: 10,
  },
  alignEnd: {
    alignItems: "flex-end",
    backgroundColor: "white",
    height: 60,
    borderRadius: 8,
    padding: 10,
  },
  alignBox: {
    width: 20,
    height: 20,
    backgroundColor: "#FF6B6B",
    borderRadius: 4,
  },
  borderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  borderedView: {
    flex: 1,
    height: 60,
    margin: 5,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },
  roundedView: {
    flex: 1,
    height: 60,
    margin: 5,
    backgroundColor: "#4ECDC4",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  shadowView: {
    flex: 1,
    height: 60,
    margin: 5,
    backgroundColor: "white",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  borderText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
  positionContainer: {
    marginBottom: 20,
  },
  relativeContainer: {
    position: "relative",
    backgroundColor: "white",
    height: 100,
    borderRadius: 8,
    padding: 10,
  },
  positionLabel: {
    fontSize: 14,
    color: "#666",
  },
  absoluteBox: {
    position: "absolute",
    top: 30,
    right: 20,
    backgroundColor: "#FF6B6B",
    padding: 8,
    borderRadius: 4,
  },
  absoluteText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  infoContainer: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
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

export default ViewExample;
