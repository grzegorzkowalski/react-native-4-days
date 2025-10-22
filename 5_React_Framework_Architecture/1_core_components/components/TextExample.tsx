import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const TextExample: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Text Component Examples</Text>
      
      <Text style={styles.sectionTitle}>1. Basic Text Styles</Text>
      <View style={styles.exampleContainer}>
        <Text style={styles.normalText}>Normal text</Text>
        <Text style={styles.boldText}>Bold text</Text>
        <Text style={styles.italicText}>Italic text</Text>
        <Text style={styles.underlineText}>Underlined text</Text>
        <Text style={styles.strikethroughText}>Strikethrough text</Text>
      </View>

      <Text style={styles.sectionTitle}>2. Font Sizes</Text>
      <View style={styles.exampleContainer}>
        <Text style={styles.extraSmallText}>Extra Small (10px)</Text>
        <Text style={styles.smallText}>Small (12px)</Text>
        <Text style={styles.mediumText}>Medium (16px)</Text>
        <Text style={styles.largeText}>Large (20px)</Text>
        <Text style={styles.extraLargeText}>Extra Large (24px)</Text>
        <Text style={styles.titleText}>Title (32px)</Text>
      </View>

      <Text style={styles.sectionTitle}>3. Text Colors</Text>
      <View style={styles.exampleContainer}>
        <Text style={styles.blackText}>Black Text</Text>
        <Text style={styles.grayText}>Gray Text</Text>
        <Text style={styles.blueText}>Blue Text</Text>
        <Text style={styles.redText}>Red Text</Text>
        <Text style={styles.greenText}>Green Text</Text>
        <Text style={styles.purpleText}>Purple Text</Text>
      </View>

      <Text style={styles.sectionTitle}>4. Text Alignment</Text>
      <View style={styles.exampleContainer}>
        <Text style={styles.leftAligned}>Left aligned text</Text>
        <Text style={styles.centerAligned}>Center aligned text</Text>
        <Text style={styles.rightAligned}>Right aligned text</Text>
        <Text style={styles.justifiedText}>
          Justified text - this is a longer paragraph that demonstrates text justification. 
          The text should be evenly distributed across the width of the container.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>5. Line Height & Spacing</Text>
      <View style={styles.exampleContainer}>
        <Text style={styles.tightSpacing}>
          Tight line spacing. This paragraph has a smaller line height value, 
          making the lines closer together.
        </Text>
        <Text style={styles.normalSpacing}>
          Normal line spacing. This paragraph uses the default line height 
          for comfortable reading.
        </Text>
        <Text style={styles.looseSpacing}>
          Loose line spacing. This paragraph has a larger line height value, 
          creating more space between lines.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>6. Text with Backgrounds</Text>
      <View style={styles.exampleContainer}>
        <Text style={styles.backgroundText1}>Text with blue background</Text>
        <Text style={styles.backgroundText2}>Text with gradient-like background</Text>
        <Text style={styles.backgroundText3}>Text with rounded background</Text>
      </View>

      <Text style={styles.sectionTitle}>7. Number of Lines</Text>
      <View style={styles.exampleContainer}>
        <Text style={styles.limitedLines} numberOfLines={1}>
          Single line text that will be truncated with ellipsis if it's too long to fit in one line
        </Text>
        <Text style={styles.limitedLines} numberOfLines={2}>
          Two lines text that will be truncated with ellipsis if it exceeds two lines. 
          This is useful for previews and cards where you want consistent heights.
        </Text>
        <Text style={styles.limitedLines} numberOfLines={3}>
          Three lines text that will be truncated with ellipsis if it exceeds three lines. 
          This gives you a bit more space to show content while still maintaining layout consistency. 
          Perfect for descriptions and summaries.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>8. Nested Text Styles</Text>
      <View style={styles.exampleContainer}>
        <Text style={styles.baseText}>
          This is normal text with{" "}
          <Text style={styles.boldText}>bold text</Text>
          {" "}and{" "}
          <Text style={styles.coloredText}>colored text</Text>
          {" "}mixed together.
        </Text>
        <Text style={styles.baseText}>
          You can create{" "}
          <Text style={styles.highlightText}>highlighted</Text>
          {" "}words within sentences.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>9. Text Transformations</Text>
      <View style={styles.exampleContainer}>
        <Text style={styles.uppercaseText}>uppercase text transformation</Text>
        <Text style={styles.lowercaseText}>LOWERCASE TEXT TRANSFORMATION</Text>
        <Text style={styles.capitalizeText}>capitalize each word</Text>
      </View>

      <Text style={styles.sectionTitle}>10. Letter Spacing</Text>
      <View style={styles.exampleContainer}>
        <Text style={styles.tightLetters}>Tight letter spacing</Text>
        <Text style={styles.normalLetters}>Normal letter spacing</Text>
        <Text style={styles.wideLetters}>Wide letter spacing</Text>
      </View>

      <Text style={styles.sectionTitle}>11. Text Shadow</Text>
      <View style={styles.exampleContainer}>
        <Text style={styles.shadowText}>Text with shadow effect</Text>
        <Text style={styles.glowText}>Text with glow effect</Text>
      </View>

      <Text style={styles.sectionTitle}>12. Selectable Text</Text>
      <View style={styles.exampleContainer}>
        <Text selectable style={styles.selectableText}>
          This text is selectable - try long pressing to select and copy it!
        </Text>
        <Text style={styles.normalText}>
          This text is not selectable (default behavior)
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Text Component Key Props:</Text>
        <Text style={styles.infoText}>• style - Text styling (fontSize, color, fontWeight, etc.)</Text>
        <Text style={styles.infoText}>• numberOfLines - Limit text to specific number of lines</Text>
        <Text style={styles.infoText}>• selectable - Allow text selection and copying</Text>
        <Text style={styles.infoText}>• textAlign - Text alignment (left, center, right, justify)</Text>
        <Text style={styles.infoText}>• allowFontScaling - Respect system font size settings</Text>
        <Text style={styles.infoText}>• ellipsizeMode - How to truncate text (tail, head, middle)</Text>
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
  exampleContainer: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  // Basic styles
  normalText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  boldText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  italicText: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#333",
    marginBottom: 5,
  },
  underlineText: {
    fontSize: 16,
    textDecorationLine: "underline",
    color: "#333",
    marginBottom: 5,
  },
  strikethroughText: {
    fontSize: 16,
    textDecorationLine: "line-through",
    color: "#333",
    marginBottom: 5,
  },
  
  // Font sizes
  extraSmallText: {
    fontSize: 10,
    color: "#333",
    marginBottom: 5,
  },
  smallText: {
    fontSize: 12,
    color: "#333",
    marginBottom: 5,
  },
  mediumText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  largeText: {
    fontSize: 20,
    color: "#333",
    marginBottom: 5,
  },
  extraLargeText: {
    fontSize: 24,
    color: "#333",
    marginBottom: 5,
  },
  titleText: {
    fontSize: 32,
    color: "#333",
    marginBottom: 5,
  },
  
  // Colors
  blackText: {
    fontSize: 16,
    color: "#000",
    marginBottom: 5,
  },
  grayText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  blueText: {
    fontSize: 16,
    color: "#007AFF",
    marginBottom: 5,
  },
  redText: {
    fontSize: 16,
    color: "#FF3B30",
    marginBottom: 5,
  },
  greenText: {
    fontSize: 16,
    color: "#34C759",
    marginBottom: 5,
  },
  purpleText: {
    fontSize: 16,
    color: "#AF52DE",
    marginBottom: 5,
  },
  
  // Alignment
  leftAligned: {
    fontSize: 16,
    textAlign: "left",
    color: "#333",
    marginBottom: 5,
  },
  centerAligned: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
    marginBottom: 5,
  },
  rightAligned: {
    fontSize: 16,
    textAlign: "right",
    color: "#333",
    marginBottom: 5,
  },
  justifiedText: {
    fontSize: 16,
    textAlign: "justify",
    color: "#333",
    lineHeight: 24,
  },
  
  // Line spacing
  tightSpacing: {
    fontSize: 16,
    lineHeight: 18,
    color: "#333",
    marginBottom: 10,
  },
  normalSpacing: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
    marginBottom: 10,
  },
  looseSpacing: {
    fontSize: 16,
    lineHeight: 32,
    color: "#333",
    marginBottom: 10,
  },
  
  // Backgrounds
  backgroundText1: {
    fontSize: 16,
    color: "white",
    backgroundColor: "#007AFF",
    padding: 8,
    marginBottom: 5,
  },
  backgroundText2: {
    fontSize: 16,
    color: "white",
    backgroundColor: "#FF6B6B",
    padding: 8,
    marginBottom: 5,
  },
  backgroundText3: {
    fontSize: 16,
    color: "white",
    backgroundColor: "#4ECDC4",
    padding: 8,
    borderRadius: 8,
    textAlign: "center",
  },
  
  // Limited lines
  limitedLines: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
    lineHeight: 22,
  },
  
  // Nested styles
  baseText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
    lineHeight: 24,
  },
  coloredText: {
    color: "#007AFF",
    fontWeight: "600",
  },
  highlightText: {
    backgroundColor: "#FFEB3B",
    color: "#333",
    fontWeight: "bold",
  },
  
  // Text transformations
  uppercaseText: {
    fontSize: 16,
    textTransform: "uppercase",
    color: "#333",
    marginBottom: 5,
  },
  lowercaseText: {
    fontSize: 16,
    textTransform: "lowercase",
    color: "#333",
    marginBottom: 5,
  },
  capitalizeText: {
    fontSize: 16,
    textTransform: "capitalize",
    color: "#333",
    marginBottom: 5,
  },
  
  // Letter spacing
  tightLetters: {
    fontSize: 16,
    letterSpacing: -1,
    color: "#333",
    marginBottom: 5,
  },
  normalLetters: {
    fontSize: 16,
    letterSpacing: 0,
    color: "#333",
    marginBottom: 5,
  },
  wideLetters: {
    fontSize: 16,
    letterSpacing: 3,
    color: "#333",
    marginBottom: 5,
  },
  
  // Shadows
  shadowText: {
    fontSize: 20,
    color: "#333",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    marginBottom: 5,
  },
  glowText: {
    fontSize: 20,
    color: "#007AFF",
    textShadowColor: "rgba(0, 122, 255, 0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  
  // Selectable
  selectableText: {
    fontSize: 16,
    color: "#007AFF",
    marginBottom: 10,
    lineHeight: 24,
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

export default TextExample;
