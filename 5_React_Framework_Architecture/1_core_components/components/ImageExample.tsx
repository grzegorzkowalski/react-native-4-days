import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from "react-native";

const { width: screenWidth } = Dimensions.get('window');

const ImageExample: React.FC = () => {
  const [imageLoadState, setImageLoadState] = useState<{[key: string]: string}>({});

  const updateImageState = (imageKey: string, state: string) => {
    setImageLoadState(prev => ({ ...prev, [imageKey]: state }));
  };

  const remoteImageUrl = "https://picsum.photos/300/200";
  const placeholderUrl = "https://via.placeholder.com/150x100/cccccc/666666?text=Placeholder";

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Image Component Example</Text>
      
      {/* Local Image Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Local Images</Text>
        <Text style={styles.sectionDescription}>
          Images bundled with the app
        </Text>
        
        <View style={styles.imageRow}>
          <Image
            source={require("../assets/images/react-logo.png")}
            style={styles.smallImage}
            resizeMode="contain"
          />
          <Image
            source={require("../assets/images/react-logo.png")}
            style={styles.smallImage}
            resizeMode="cover"
          />
          <Image
            source={require("../assets/images/react-logo.png")}
            style={styles.smallImage}
            resizeMode="stretch"
          />
        </View>
        <Text style={styles.resizeModeText}>contain | cover | stretch</Text>
      </View>

      {/* Remote Image Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Remote Images</Text>
        <Text style={styles.sectionDescription}>
          Images loaded from URLs with loading states
        </Text>
        
        <Image
          source={{ uri: remoteImageUrl }}
          style={styles.remoteImage}
          resizeMode="cover"
          onLoadStart={() => updateImageState('remote1', 'Loading...')}
          onLoad={() => updateImageState('remote1', 'Loaded successfully')}
          onError={() => updateImageState('remote1', 'Failed to load')}
        />
        <Text style={styles.loadState}>
          Status: {imageLoadState.remote1 || 'Not loaded'}
        </Text>
      </View>

      {/* Image with Placeholder */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Image with Placeholder</Text>
        
        <Image
          source={{ uri: placeholderUrl }}
          style={styles.placeholderImage}
          defaultSource={require("../assets/images/react-logo.png")}
          resizeMode="cover"
        />
      </View>

      {/* Resize Modes Demonstration */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resize Modes</Text>
        
        <View style={styles.resizeModeContainer}>
          <View style={styles.resizeModeItem}>
            <Image
              source={require("../assets/images/react-logo.png")}
              style={styles.resizeModeImage}
              resizeMode="cover"
            />
            <Text style={styles.resizeModeLabel}>cover</Text>
          </View>
          
          <View style={styles.resizeModeItem}>
            <Image
              source={require("../assets/images/react-logo.png")}
              style={styles.resizeModeImage}
              resizeMode="contain"
            />
            <Text style={styles.resizeModeLabel}>contain</Text>
          </View>
          
          <View style={styles.resizeModeItem}>
            <Image
              source={require("../assets/images/react-logo.png")}
              style={styles.resizeModeImage}
              resizeMode="stretch"
            />
            <Text style={styles.resizeModeLabel}>stretch</Text>
          </View>
          
          <View style={styles.resizeModeItem}>
            <Image
              source={require("../assets/images/react-logo.png")}
              style={styles.resizeModeImage}
              resizeMode="repeat"
            />
            <Text style={styles.resizeModeLabel}>repeat</Text>
          </View>
          
          <View style={styles.resizeModeItem}>
            <Image
              source={require("../assets/images/react-logo.png")}
              style={styles.resizeModeImage}
              resizeMode="center"
            />
            <Text style={styles.resizeModeLabel}>center</Text>
          </View>
        </View>
      </View>

      {/* ImageBackground Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ImageBackground</Text>
        <Text style={styles.sectionDescription}>
          Component for using images as backgrounds
        </Text>
        
        {/* Basic ImageBackground */}
        <ImageBackground
          source={require("../assets/images/react-logo.png")}
          style={styles.imageBackground}
          resizeMode="cover"
          imageStyle={styles.backgroundImageStyle}
        >
          <View style={styles.overlayContent}>
            <Text style={styles.overlayTitle}>Content Over Image</Text>
            <Text style={styles.overlayText}>
              This text is displayed over the background image
            </Text>
            <TouchableOpacity style={styles.overlayButton}>
              <Text style={styles.overlayButtonText}>Action Button</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        {/* Multiple Background Examples */}
        <Text style={styles.subsectionTitle}>Different Background Styles</Text>
        
        {/* Gradient Overlay Background */}
        <ImageBackground
          source={require("../assets/images/react-logo.png")}
          style={styles.gradientBackground}
          resizeMode="cover"
        >
          <View style={styles.gradientOverlay}>
            <Text style={styles.gradientTitle}>Gradient Overlay</Text>
            <Text style={styles.gradientText}>
              Background with gradient overlay effect
            </Text>
          </View>
        </ImageBackground>

        {/* Blurred Background */}
        <ImageBackground
          source={require("../assets/images/react-logo.png")}
          style={styles.blurredBackground}
          resizeMode="cover"
          imageStyle={styles.blurredImageStyle}
        >
          <View style={styles.blurredContent}>
            <Text style={styles.blurredTitle}>Blurred Background</Text>
            <Text style={styles.blurredText}>
              Content over a blurred background image
            </Text>
          </View>
        </ImageBackground>

        {/* Card with Background */}
        <ImageBackground
          source={require("../assets/images/react-logo.png")}
          style={styles.cardBackground}
          resizeMode="cover"
          imageStyle={styles.cardImageStyle}
        >
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Featured Card</Text>
              <Text style={styles.cardSubtitle}>With background image</Text>
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.cardDescription}>
                This is a card component with a background image and semi-transparent overlay.
              </Text>
              <TouchableOpacity style={styles.cardButton}>
                <Text style={styles.cardButtonText}>Learn More</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

        {/* Tiled Background Pattern */}
        <ImageBackground
          source={require("../assets/images/react-logo.png")}
          style={styles.tiledBackground}
          resizeMode="repeat"
          imageStyle={styles.tiledImageStyle}
        >
          <View style={styles.tiledContent}>
            <Text style={styles.tiledTitle}>Tiled Pattern</Text>
            <Text style={styles.tiledText}>
              Background image repeated as a pattern
            </Text>
          </View>
        </ImageBackground>

        {/* Split Layout Background */}
        <View style={styles.splitContainer}>
          <ImageBackground
            source={require("../assets/images/react-logo.png")}
            style={styles.splitLeft}
            resizeMode="cover"
          >
            <View style={styles.splitLeftContent}>
              <Text style={styles.splitTitle}>Left Side</Text>
            </View>
          </ImageBackground>
          
          <ImageBackground
            source={require("../assets/images/react-logo.png")}
            style={styles.splitRight}
            resizeMode="cover"
            imageStyle={styles.splitRightImageStyle}
          >
            <View style={styles.splitRightContent}>
              <Text style={styles.splitTitle}>Right Side</Text>
            </View>
          </ImageBackground>
        </View>
      </View>

      {/* Rounded Images */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Styled Images</Text>
        
        <View style={styles.styledImagesRow}>
          <Image
            source={require("../assets/images/react-logo.png")}
            style={styles.roundedImage}
          />
          <Image
            source={require("../assets/images/react-logo.png")}
            style={styles.circularImage}
          />
          <Image
            source={require("../assets/images/react-logo.png")}
            style={styles.borderedImage}
          />
        </View>
        <Text style={styles.resizeModeText}>rounded | circular | bordered</Text>
      </View>

      {/* Image Gallery */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Image Gallery</Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.gallery}>
          {[1, 2, 3, 4, 5].map((item) => (
            <TouchableOpacity key={item} style={styles.galleryItem}>
              <Image
                source={require("../assets/images/react-logo.png")}
                style={styles.galleryImage}
                resizeMode="cover"
              />
              <Text style={styles.galleryLabel}>Image {item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Aspect Ratio Images */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Aspect Ratio Images</Text>
        
        <Image
          source={require("../assets/images/react-logo.png")}
          style={styles.aspectRatioImage}
          resizeMode="cover"
        />
        <Text style={styles.resizeModeText}>16:9 aspect ratio</Text>
      </View>

      {/* Info Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Image Component Key Props:</Text>
        <Text style={styles.infoText}>• source - Image source (local or remote)</Text>
        <Text style={styles.infoText}>• resizeMode - How image should be resized</Text>
        <Text style={styles.infoText}>• defaultSource - Placeholder while loading</Text>
        <Text style={styles.infoText}>• onLoad - Called when image loads</Text>
        <Text style={styles.infoText}>• onError - Called when image fails to load</Text>
        <Text style={styles.infoText}>• onLoadStart - Called when loading starts</Text>
        <Text style={styles.infoText}>• style - Styling for the image</Text>
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
    marginBottom: 5,
    color: "#333",
  },
  sectionDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
  },
  imageRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 10,
  },
  smallImage: {
    width: 80,
    height: 60,
    backgroundColor: "#f0f0f0",
  },
  remoteImage: {
    width: "100%",
    height: 200,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  placeholderImage: {
    width: "100%",
    height: 150,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  loadState: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 14,
    color: "#666",
  },
  resizeModeText: {
    textAlign: "center",
    fontSize: 12,
    color: "#888",
    marginTop: 5,
  },
  resizeModeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  resizeModeItem: {
    alignItems: "center",
    marginBottom: 15,
    width: "30%",
  },
  resizeModeImage: {
    width: 80,
    height: 60,
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  resizeModeLabel: {
    fontSize: 12,
    marginTop: 5,
    color: "#666",
  },
  imageBackground: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImageStyle: {
    borderRadius: 8,
    opacity: 0.3,
  },
  overlayContent: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
    borderRadius: 8,
  },
  overlayTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  overlayText: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
    marginBottom: 15,
  },
  overlayButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  overlayButtonText: {
    color: "white",
    fontWeight: "600",
  },
  styledImagesRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 15,
  },
  roundedImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  circularImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  borderedImage: {
    width: 80,
    height: 80,
    borderWidth: 3,
    borderColor: "#007AFF",
    borderRadius: 8,
  },
  gallery: {
    marginVertical: 10,
  },
  galleryItem: {
    marginRight: 15,
    alignItems: "center",
  },
  galleryImage: {
    width: 120,
    height: 80,
    borderRadius: 8,
  },
  galleryLabel: {
    fontSize: 12,
    marginTop: 5,
    color: "#666",
  },
  aspectRatioImage: {
    width: "100%",
    height: undefined,
    aspectRatio: 16 / 9,
    borderRadius: 8,
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
  // Additional styles for background examples
  subsectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 15,
    color: "#333",
  },
  gradientBackground: {
    width: "100%",
    height: 150,
    marginVertical: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
  gradientOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 122, 255, 0.6)",
  },
  gradientTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  gradientText: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
  },
  blurredBackground: {
    width: "100%",
    height: 150,
    marginVertical: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
  blurredImageStyle: {
    opacity: 0.4,
  },
  blurredContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  blurredTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  blurredText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  cardBackground: {
    width: "100%",
    height: 200,
    marginVertical: 10,
    borderRadius: 12,
    overflow: "hidden",
  },
  cardImageStyle: {
    opacity: 0.7,
  },
  cardContent: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 15,
    justifyContent: "space-between",
  },
  cardHeader: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
  },
  cardBody: {
    flex: 1,
    justifyContent: "flex-end",
  },
  cardDescription: {
    fontSize: 14,
    color: "white",
    lineHeight: 20,
    marginBottom: 15,
  },
  cardButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  cardButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  tiledBackground: {
    width: "100%",
    height: 120,
    marginVertical: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
  tiledImageStyle: {
    opacity: 0.2,
  },
  tiledContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 165, 0, 0.8)",
  },
  tiledTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  tiledText: {
    fontSize: 12,
    color: "white",
    textAlign: "center",
  },
  splitContainer: {
    flexDirection: "row",
    height: 120,
    marginVertical: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
  splitLeft: {
    flex: 1,
    marginRight: 5,
  },
  splitRight: {
    flex: 1,
    marginLeft: 5,
  },
  splitLeftContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 59, 48, 0.7)",
  },
  splitRightContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(52, 199, 89, 0.7)",
  },
  splitRightImageStyle: {
    opacity: 0.3,
  },
  splitTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});

export default ImageExample;
