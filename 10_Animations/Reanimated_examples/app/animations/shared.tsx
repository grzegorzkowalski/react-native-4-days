import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Pressable, ScrollView, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
  withSequence,
  interpolate,
  runOnJS,
  FadeIn,
  FadeOut,
  SlideInRight,
  SlideOutLeft,
  ZoomIn,
  ZoomOut,
  Layout,
} from 'react-native-reanimated';
import { Text } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

/**
 * Shared Element Transitions Example
 * 
 * This screen demonstrates shared element-like transitions in React Native Reanimated:
 * 1. Layout transitions with Animated.View
 * 2. Hero image expansions
 * 3. Card to detail transitions
 * 4. List item expansions
 * 5. Entering and exiting animations
 */

interface CardData {
  id: number;
  title: string;
  subtitle: string;
  color: string;
  emoji: string;
  description: string;
}

const cardData: CardData[] = [
  { id: 1, title: 'Mountains', subtitle: 'Adventure', color: '#3498db', emoji: '🏔️', description: 'Explore breathtaking mountain ranges and discover hidden trails.' },
  { id: 2, title: 'Ocean', subtitle: 'Relaxation', color: '#1abc9c', emoji: '🌊', description: 'Dive into crystal clear waters and feel the ocean breeze.' },
  { id: 3, title: 'Forest', subtitle: 'Nature', color: '#27ae60', emoji: '🌲', description: 'Walk through ancient forests and connect with nature.' },
  { id: 4, title: 'Desert', subtitle: 'Mystery', color: '#f39c12', emoji: '🏜️', description: 'Experience the vast beauty and silence of the desert.' },
];

export default function SharedTransitionsScreen() {
  const colorScheme = useColorScheme();
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [isDetailView, setIsDetailView] = useState(false);
  
  // Shared values for transitions
  const heroScale = useSharedValue(1);
  const heroOpacity = useSharedValue(1);
  const detailProgress = useSharedValue(0);

  // Hero image animation
  const heroStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heroScale.value }],
    opacity: heroOpacity.value,
  }));

  // Detail view animation
  const detailStyle = useAnimatedStyle(() => ({
    transform: [
      { 
        scale: interpolate(detailProgress.value, [0, 1], [0.8, 1]) 
      }
    ],
    opacity: detailProgress.value,
  }));

  // Background overlay animation
  const overlayStyle = useAnimatedStyle(() => ({
    opacity: detailProgress.value * 0.8,
  }));

  const handleCardPress = useCallback((card: CardData) => {
    setSelectedCard(card);
    
    // Enhanced hero animation with anticipation
    heroScale.value = withSequence(
      withTiming(0.95, { duration: 100 }),
      withTiming(1.1, { duration: 200 }),
      withTiming(1, { duration: 200 })
    );

    // Staggered transition to detail view
    setTimeout(() => {
      setIsDetailView(true);
      detailProgress.value = withSpring(1, { 
        damping: 15, 
        stiffness: 200 
      });
    }, 300);
  }, []);

  const handleCloseDetail = useCallback(() => {
    detailProgress.value = withSpring(0, { 
      damping: 20, 
      stiffness: 300 
    }, () => {
      runOnJS(setIsDetailView)(false);
      runOnJS(setSelectedCard)(null);
    });
  }, []);

  const renderCard = (card: CardData, index: number) => (
    <Animated.View
      key={card.id}
      entering={SlideInRight.delay(index * 100)}
      exiting={SlideOutLeft}
      style={[styles.card, { backgroundColor: card.color }]}
    >
      <Pressable onPress={() => handleCardPress(card)} style={styles.cardPressable}>
        <Text style={styles.cardEmoji}>{card.emoji}</Text>
        <Text style={styles.cardTitle}>{card.title}</Text>
        <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
      </Pressable>
    </Animated.View>
  );

  const renderDetailView = () => (
    <>
      {/* Background Overlay */}
      <Animated.View style={[styles.overlay, overlayStyle]} />
      
      {/* Detail Card */}
      <Animated.View style={[styles.detailContainer, detailStyle]}>
        <View style={[styles.detailCard, { backgroundColor: selectedCard?.color }]}>
          {/* Hero Section */}
          <Animated.View style={[styles.detailHero, heroStyle]}>
            <Text style={styles.detailEmoji}>{selectedCard?.emoji}</Text>
          </Animated.View>
          
          {/* Content Section */}
          <Animated.View 
            entering={FadeIn.delay(300)}
            style={styles.detailContent}
          >
            <Text style={styles.detailTitle}>{selectedCard?.title}</Text>
            <Text style={styles.detailSubtitle}>{selectedCard?.subtitle}</Text>
            <Text style={styles.detailDescription}>{selectedCard?.description}</Text>
          </Animated.View>
          
          {/* Close Button */}
          <Animated.View entering={ZoomIn.delay(400)}>
            <Pressable style={styles.closeButton} onPress={handleCloseDetail}>
              <Text style={styles.closeButtonText}>✕</Text>
            </Pressable>
          </Animated.View>
        </View>
      </Animated.View>
    </>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shared Element Transitions</Text>
      <Text style={styles.description}>
        Smooth transitions between different UI states
      </Text>

      {!isDetailView ? (
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Hero Section */}
          <Animated.View 
            entering={FadeIn}
            style={[styles.heroSection, heroStyle]}
          >
            <Text style={styles.heroText}>🎭</Text>
            <Text style={styles.heroTitle}>Choose Your Adventure</Text>
          </Animated.View>

          {/* Cards Grid */}
          <View style={styles.cardsContainer}>
            {cardData.map((card, index) => renderCard(card, index))}
          </View>

          {/* Additional Examples */}
          <View style={styles.examplesSection}>
            <Text style={styles.sectionTitle}>Animation Techniques</Text>
            
            <Animated.View 
              entering={SlideInRight.delay(600)}
              style={styles.techniqueCard}
            >
              <Text style={styles.techniqueTitle}>Layout Animations</Text>
              <Text style={styles.techniqueDescription}>
                Smooth transitions when component layout changes
              </Text>
            </Animated.View>

            <Animated.View 
              entering={SlideInRight.delay(700)}
              style={styles.techniqueCard}
            >
              <Text style={styles.techniqueTitle}>Hero Transitions</Text>
              <Text style={styles.techniqueDescription}>
                Scale and position changes for focus elements
              </Text>
            </Animated.View>

            <Animated.View 
              entering={SlideInRight.delay(800)}
              style={styles.techniqueCard}
            >
              <Text style={styles.techniqueTitle}>Staggered Animations</Text>
              <Text style={styles.techniqueDescription}>
                Sequential animations with delay for visual rhythm
              </Text>
            </Animated.View>
          </View>
        </ScrollView>
      ) : (
        renderDetailView()
      )}

      {/* Code Information */}
      {!isDetailView && (
        <Animated.View 
          entering={FadeIn.delay(1000)}
          style={styles.codeContainer}
        >
          <Text style={styles.codeTitle}>Transition Patterns:</Text>
          <Text style={styles.codeText}>
            • entering/exiting - Built-in transition animations{'\n'}
            • Layout animations - Automatic layout change animations{'\n'}
            • Shared values - Coordinate animations across components{'\n'}
            • Interpolation - Smooth value transitions{'\n'}
            • Staggering - Delayed animations for visual hierarchy
          </Text>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
    marginBottom: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 30,
    padding: 20,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  heroText: {
    fontSize: 48,
    marginBottom: 10,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  card: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardPressable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  cardEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  cardTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  examplesSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  techniqueCard: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  techniqueTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  techniqueDescription: {
    fontSize: 14,
    opacity: 0.7,
  },
  // Detail View Styles
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
    zIndex: 1,
  },
  detailContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    padding: 20,
  },
  detailCard: {
    width: '100%',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
  },
  detailHero: {
    marginBottom: 24,
  },
  detailEmoji: {
    fontSize: 80,
  },
  detailContent: {
    alignItems: 'center',
    marginBottom: 24,
  },
  detailTitle: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detailSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 18,
    marginBottom: 16,
  },
  detailDescription: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  codeContainer: {
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 8,
    marginTop: 20,
  },
  codeTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  codeText: {
    fontSize: 12,
    fontFamily: 'monospace',
    lineHeight: 18,
  },
});
