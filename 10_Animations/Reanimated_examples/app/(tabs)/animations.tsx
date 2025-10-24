import React, { useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { Text, View } from '@/components/Themed';
import { Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
  withSequence,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';

// Animation examples data
const animationExamples = [
  {
    id: 'basic',
    title: 'Basic Animations',
    description: 'Fade, Scale, and Translation animations',
    icon: 'play-circle',
    route: '/animations/basic',
  },
  {
    id: 'spring',
    title: 'Spring Animations',
    description: 'Bouncy spring physics animations',
    icon: 'leaf',
    route: '/animations/spring',
  },
  {
    id: 'gesture',
    title: 'Gesture Animations',
    description: 'Drag, pinch, and tap gesture animations',
    icon: 'hand-o-up',
    route: '/animations/gesture',
  },
  {
    id: 'shared',
    title: 'Shared Element Transitions',
    description: 'Smooth transitions between screens',
    icon: 'exchange',
    route: '/animations/shared',
  },
  {
    id: 'advanced',
    title: 'Advanced Animations',
    description: 'Complex animations with worklets',
    icon: 'cogs',
    route: '/animations/advanced',
  },
];

export default function AnimationsScreen() {
  const colorScheme = useColorScheme();
  
  // Animation values for card entrance
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const translateY = useSharedValue(50);

  useEffect(() => {
    // Staggered entrance animation
    opacity.value = withTiming(1, { duration: 600 });
    scale.value = withSpring(1, { damping: 15, stiffness: 200 });
    translateY.value = withSpring(0, { damping: 15, stiffness: 200 });
  }, []);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { scale: scale.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <Animated.ScrollView 
      style={[styles.container, containerStyle]} 
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>React Native Reanimated Examples</Text>
      <Text style={styles.subtitle}>
        Professional animation examples for React Native developers
      </Text>

      <View style={styles.examplesContainer}>
        {animationExamples.map((example, index) => (
          <AnimatedCard
            key={example.id}
            example={example}
            index={index}
            colorScheme={colorScheme ?? 'light'}
          />
        ))}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>About These Examples</Text>
        <Text style={styles.infoText}>
          These animations demonstrate various techniques and patterns used in professional 
          React Native applications. Each example includes detailed comments explaining 
          the implementation and best practices.
        </Text>
        <Text style={styles.infoText}>
          Built with React Native Reanimated 3.x for optimal performance using the 
          UI thread and native animations.
        </Text>
      </View>
    </Animated.ScrollView>
  );
}

// Animated card component for better performance and staggered animations
function AnimatedCard({ example, index, colorScheme }: {
  example: any;
  index: number;
  colorScheme: 'light' | 'dark';
}) {
  const cardOpacity = useSharedValue(0);
  const cardTranslateY = useSharedValue(30);
  const cardScale = useSharedValue(0.95);
  const pressScale = useSharedValue(1);

  useEffect(() => {
    // Staggered entrance animation
    const delay = index * 100;
    cardOpacity.value = withDelay(delay, withTiming(1, { duration: 500 }));
    cardTranslateY.value = withDelay(delay, withSpring(0, { damping: 15, stiffness: 200 }));
    cardScale.value = withDelay(delay, withSpring(1, { damping: 15, stiffness: 200 }));
  }, [index]);

  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [
      { translateY: cardTranslateY.value },
      { scale: cardScale.value * pressScale.value },
    ],
  }));

  const handlePressIn = () => {
    pressScale.value = withTiming(0.95, { duration: 150 });
  };

  const handlePressOut = () => {
    pressScale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  return (
    <Link href={example.route as any} asChild>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View
          style={[
            styles.exampleCard,
            cardStyle,
            {
              backgroundColor: Colors[colorScheme].background,
              borderColor: Colors[colorScheme].text + '20',
            }
          ]}
        >
          <View style={styles.cardContent}>
            <FontAwesome
              name={example.icon as any}
              size={32}
              color={Colors[colorScheme].tint}
              style={styles.cardIcon}
            />
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>{example.title}</Text>
              <Text style={styles.cardDescription}>{example.description}</Text>
            </View>
            <FontAwesome
              name="chevron-right"
              size={16}
              color={Colors[colorScheme].text + '60'}
            />
          </View>
        </Animated.View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
    marginBottom: 30,
  },
  examplesContainer: {
    marginBottom: 30,
  },
  exampleCard: {
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    marginRight: 16,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    opacity: 0.7,
  },
  infoContainer: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
    opacity: 0.8,
  },
});
