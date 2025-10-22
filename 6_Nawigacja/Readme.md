# Indian Cricket Team App - Step by Step Tutorial

## Overview

We'll build a React Native app with Expo Router and three main components:

- **PlayerList** - displays all players
- **PlayerCard** - shows a single player (name only)
- **PlayerDetail** - shows full player info (name, image, age, role)

---

## Step 1: Project Setup

First, create a new Expo project with Expo Router:

```bash
# Create a new Expo app with Expo Router
npx create-expo-app@latest cricket-app --template tabs

# Or if you prefer a blank template
npx create-expo-app@latest cricket-app --template blank

# Navigate to project
cd cricket-app

# Install Expo Router (if not already installed)
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
```

Now create the data file:

### File: `/data/players.ts`

```typescript
const players = [
  {
    name: "Rohit Sharma",
    image: "https://documents.bcci.tv/resizedimageskirti/107_compress.png",
    age: "38",
    style: "Batter",
  },
  {
    name: "Virat Kohli",
    image: "https://documents.bcci.tv/resizedimageskirti/164_compress.png",
    age: "36",
    style: "Batter",
  },
  {
    name: "Jasprit Bumrah",
    image: "https://documents.bcci.tv/resizedimageskirti/1124_compress.png",
    age: "31",
    style: "Bowler",
  },
  {
    name: "Ravindra Jadeja",
    image: "https://documents.bcci.tv/resizedimageskirti/9_compress.png",
    age: "36",
    style: "All Rounder",
  },
  {
    name: "Mohammed Siraj",
    image: "https://documents.bcci.tv/resizedimageskirti/3840_compress.png",
    age: "Bowler",
    style: "Bowler",
  },
  {
    name: "Kl Rahul",
    image: "https://documents.bcci.tv/resizedimageskirti/1125_compress.png",
    age: "Wicket Keeper",
    style: "Wicket Keeper",
  },
  {
    name: "Shubman Gill",
    image: "https://documents.bcci.tv/resizedimageskirti/3761_compress.png",
    age: "Batter",
    style: "Batter",
  },
  {
    name: "Hardik Pandya",
    image: "https://documents.bcci.tv/resizedimageskirti/2740_compress.png",
    age: "All Rounder",
    style: "All Rounder",
  },
  {
    name: "Mohammad Shami",
    image: "https://documents.bcci.tv/resizedimageskirti/94_compress.png",
    age: "Bowler",
    style: "Bowler",
  },
  {
    name: "Rishabh Pant",
    image: "https://documents.bcci.tv/resizedimageskirti/2972_compress.png",
    age: "Wicket Keeper",
    style: "Wicket Keeper",
  },
  {
    name: "Suryakumar Yadav",
    image: "https://documents.bcci.tv/resizedimageskirti/1212_compress.png",
    age: "34",
    style: "Batter",
  },
  {
    name: "Kuldeep Yadav",
    image: "https://documents.bcci.tv/resizedimageskirti/261_compress.png",
    age: "30",
    style: "Bowler",
  },
  {
    name: "Axar Patel",
    image: "https://documents.bcci.tv/resizedimageskirti/1113_compress.png",
    age: "31",
    style: "Bowler",
  },
  {
    name: "Yashasvi Jaiswal",
    image: "https://documents.bcci.tv/resizedimageskirti/11086_compress.png",
    age: "23",
    style: "Batter",
  },
  {
    name: "Shreyas Iyer",
    image: "https://documents.bcci.tv/resizedimageskirti/1563_compress.png",
    age: "30",
    style: "Batter",
  },
  {
    name: "Rinku Singh",
    image: "https://documents.bcci.tv/resizedimageskirti/11087_compress.png",
    age: "27",
    style: "Batter",
  },
  {
    name: "Tilak Varma",
    image: "https://documents.bcci.tv/resizedimageskirti/11088_compress.png",
    age: "22",
    style: "Batter",
  },
  {
    name: "Ruturaj Gaikwad",
    image: "https://documents.bcci.tv/resizedimageskirti/11095_compress.png",
    age: "28",
    style: "Batter",
  },
  {
    name: "Shivam Dube",
    image: "https://documents.bcci.tv/resizedimageskirti/11089_compress.png",
    age: "32",
    style: "All Rounder",
  },
  {
    name: "Ravi Bishnoi",
    image: "https://documents.bcci.tv/resizedimageskirti/11084_compress.png",
    age: "24",
    style: "Bowler",
  },
  {
    name: "Washington Sundar",
    image: "https://documents.bcci.tv/resizedimageskirti/2973_compress.png",
    age: "25",
    style: "All Rounder",
  },
  {
    name: "Mukesh Kumar",
    image: "https://documents.bcci.tv/resizedimageskirti/11091_compress.png",
    age: "31",
    style: "Bowler",
  },
  {
    name: "Sanju Samson",
    image: "https://documents.bcci.tv/resizedimageskirti/37_compress.png",
    age: "30",
    style: "Wicket Keeper",
  },
  {
    name: "Arshdeep Singh",
    image: "https://documents.bcci.tv/resizedimageskirti/65_compress.png",
    age: "26",
    style: "Bowler",
  },
  {
    name: "Prasidh Krishna",
    image: "https://documents.bcci.tv/resizedimageskirti/11092_compress.png",
    age: "29",
    style: "Bowler",
  },
  {
    name: "Rajat Patidar",
    image: "https://documents.bcci.tv/resizedimageskirti/11093_compress.png",
    age: "32",
    style: "Batter",
  },
  {
    name: "Dhruv Jurel",
    image: "https://documents.bcci.tv/resizedimageskirti/11097_compress.png",
    age: "24",
    style: "Wicket Keeper",
  },
  {
    name: "Sarfaraz Khan",
    image: "https://documents.bcci.tv/resizedimageskirti/11096_compress.png",
    age: "27",
    style: "Batter",
  },
  {
    name: "Nitish Kumar",
    image: "https://documents.bcci.tv/resizedimageskirti/11106_compress.png",
    age: "22",
    style: "All Rounder",
  },
  {
    name: "Ishan Kishan",
    image: "https://documents.bcci.tv/resizedimageskirti/31_compress.png",
    age: "27",
    style: "Wicket Keeper",
  },
  {
    name: "Abhishek Sharma",
    image: "https://documents.bcci.tv/resizedimageskirti/11099_compress.png",
    age: "24",
    style: "Batter",
  },
  {
    name: "Akash Deep",
    image: "https://documents.bcci.tv/resizedimageskirti/11107_compress.png",
    age: "28",
    style: "Bowler",
  },
  {
    name: "Varun Chakaravarthy",
    image: "https://documents.bcci.tv/resizedimageskirti/11100_compress.png",
    age: "33",
    style: "Bowler",
  },
  {
    name: "Harshit Rana",
    image: "https://documents.bcci.tv/resizedimageskirti/11108_compress.png",
    age: "23",
    style: "Bowler",
  },
];

export default players;
```

**Key points:**
- Create a `data` folder in your project root
- Save this file as `players.ts`
- Contains all 34 Indian cricket players with their info

---

## Step 2: Create the PlayerCard Component

This component displays just the player's name (used in the list).

### File: `/components/PlayerCard.tsx`

```typescript
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

interface PlayerCardProps {
  name: string;
  onPress: () => void;
}

export default function PlayerCard({ name, onPress }: PlayerCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#fff',
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
});
```

**Key points:**
- Takes `name` and `onPress` as props
- `TouchableOpacity` makes it tappable
- Simple styling with shadow for depth
- Will be used as a list item in PlayerList

---

## Step 3: Create the PlayerList Component

This component displays all players using FlatList.

### File: `/components/PlayerList.tsx`

```typescript
import { FlatList, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import PlayerCard from './PlayerCard';
import players from '../data/players';

export default function PlayerList() {
  const router = useRouter();

  const handlePlayerPress = (index: number) => {
    router.push(`/player/${index}`);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={players}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <PlayerCard
            name={item.name}
            onPress={() => handlePlayerPress(index)}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    paddingVertical: 8,
  },
});
```

**Key points:**
- Uses `useRouter()` hook from Expo Router for navigation
- Uses `FlatList` for efficient rendering of large lists
- Navigates to `/player/[index]` dynamic route when player is pressed
- Maps through all players and renders a PlayerCard for each one
- Light gray background for better visual separation

---

## Step 4: Set Up App Layout

### File: `/app/_layout.tsx`

```typescript
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#138808',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    />
  );
}
```

**Key points:**
- Sets up the root layout with Stack navigator
- Applies green theme (#138808) to all screens
- White text in header for contrast
- Back button automatically included

---

## Step 5: Create the Home Screen (Player List)

### File: `/app/index.tsx`

```typescript
import { Stack } from 'expo-router';
import PlayerList from '../components/PlayerList';

export default function HomeScreen() {
  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Indian Cricket Team',
        }} 
      />
      <PlayerList />
    </>
  );
}
```

**Key points:**
- This is the home route (`/`)
- Sets the screen title to "Indian Cricket Team"
- Renders the PlayerList component
- Expo Router automatically handles this as the initial screen

---

## Step 6: Create the Player Detail Screen (Dynamic Route)

### File: `/app/player/[id].tsx`

```typescript
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import players from '../../data/players';

export default function PlayerDetailScreen() {
  const { id } = useLocalSearchParams();
  const playerIndex = parseInt(id as string);
  const player = players[playerIndex];

  if (!player) {
    return (
      <View style={styles.container}>
        <Text>Player not found</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Player Details',
        }}
      />
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Image
            source={{ uri: player.image }}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.name}>{player.name}</Text>
          <Text style={styles.age}>Age: {player.age}</Text>
          <Text style={styles.style}>Role: {player.style}</Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  age: {
    fontSize: 20,
    color: '#666',
    marginBottom: 8,
  },
  style: {
    fontSize: 18,
    color: '#138808',
    fontWeight: '600',
  },
});
```

**Key points:**
- Uses `[id]` in filename to create a dynamic route
- `useLocalSearchParams()` hook gets the route parameter
- Displays circular player image (200x200px)
- Shows player name, age, and playing style
- Uses ScrollView for scrollable content if needed
- Green color (#138808) for the role matches Indian cricket theme
- Includes error handling if player is not found

---

## Project Structure

Your final project structure with Expo Router should look like this:

```
cricket-app/
├── app/
│   ├── _layout.tsx         # Root layout with Stack navigator
│   ├── index.tsx           # Home screen (player list)
│   └── player/
│       └── [id].tsx        # Dynamic route for player details
├── components/
│   ├── PlayerCard.tsx      # Single player card (name only)
│   └── PlayerList.tsx      # List of all players
├── data/
│   └── players.ts          # Player data
└── package.json
```

---

## Understanding Expo Router

**How Expo Router works:**

- **File-based routing**: The file structure in `/app` defines your routes
- **`index.tsx`**: Represents the home route (`/`)
- **`[id].tsx`**: Square brackets create dynamic routes
- **`_layout.tsx`**: Defines the layout wrapper for routes
- **Navigation**: Use `useRouter()` hook to navigate programmatically

**Example navigation:**

```typescript
import { useRouter } from 'expo-router';

const router = useRouter();
router.push('/player/0');  // Navigate to first player
router.back();             // Go back
```

---

## Testing Your App

Follow these steps to test your app:

1. **Start the app**: Run `npx expo start`
2. **Choose platform**: Press `i` for iOS, `a` for Android, or `w` for web
3. **Test the list**: All 34 players should appear in a scrollable list
4. **Test navigation**: Tap on any player name to navigate to detail screen
5. **Verify details**: Check that image, name, age, and role display correctly
6. **Test back navigation**: Use back button to return to the list
7. **Test scrolling**: Scroll through the player list and detail screen

---

## Common Issues & Fixes

### Expo Router not working?

Check these:
- Make sure you created the project with Expo Router template
- Verify all required packages are installed: `npx expo install expo-router`
- Check that your `app.json` has the correct scheme configuration
- Clear cache: `npx expo start --clear`

### Images not loading?

Possible solutions:
- Check your internet connection
- Verify that image URLs from BCCI are accessible
- Add error handling for failed image loads
- Consider adding a placeholder/fallback image

```typescript
<Image
  source={{ uri: player.image }}
  style={styles.image}
  defaultSource={require('../assets/placeholder.png')}
/>
```

### Navigation not working?

Verify:
- File structure matches Expo Router conventions
- Dynamic route uses square brackets: `[id].tsx`
- Using `useRouter()` from 'expo-router', not 'next/router'
- Route parameters are being passed correctly

### TypeScript errors?

Common fixes:
- Make sure all props interfaces are defined correctly
- Type the route parameters: `id as string`
- Install type definitions if needed
- Check that `tsconfig.json` is properly configured

### Styling issues?

Tips:
- Test on both iOS and Android as they render differently
- Use `SafeAreaView` from 'react-native-safe-area-context'
- Consider using Platform-specific styles if needed
- Check that `elevation` (Android) and `shadow` (iOS) both work

---

## Enhancements (Optional)

Want to improve your app? Try adding these features:

### Search Functionality
- Add a TextInput at the top of PlayerList
- Filter players by name as user types
- Consider using query parameters in URL

### Filter by Role
- Add buttons to filter by Batter, Bowler, All Rounder, Wicket Keeper
- Use query params: `router.push('/?filter=Batter')`
- Show only players matching selected role

### Player Statistics
- Add more player data (runs, wickets, matches)
- Display stats in PlayerDetail screen
- Create a new route `/player/[id]/stats`

### Tabs Navigation
- Add tabs for different sections
- Create `app/(tabs)/_layout.tsx`
- Separate players by role in different tabs

### Deep Linking
- Configure deep links in `app.json`
- Test with: `npx uri-scheme open cricket-app://player/0`
- Share direct links to specific players

### Web Support
- Test on web: `npx expo start --web`
- Optimize layouts for larger screens
- Add responsive design

### Animations
- Use `react-native-reanimated` for smooth transitions
- Add shared element transitions between screens
- Animate list items on mount

---

## Summary

Congratulations! 🎉 You've successfully created an Indian Cricket Team app with Expo Router:

✅ File-based routing - Intuitive navigation structure  
✅ PlayerCard Component - Displays player name with tap handler  
✅ PlayerList Component - Shows all players in a scrollable list  
✅ Dynamic routes - Player detail screen with [id] parameter  
✅ Stack Navigation - Smooth navigation with native gestures  

The app demonstrates key Expo Router concepts:
- File-based routing system
- Dynamic route parameters
- Layouts and nested navigation
- Type-safe navigation with TypeScript
- Component composition
- FlatList for efficient list rendering
- Image loading from URLs

### Why Expo Router?

🚀 Simpler than React Navigation  
📁 File-based routing (like Next.js)  
🔗 Built-in deep linking  
🌐 Works on iOS, Android, and Web  
📱 Native navigation feel  

Your app is now ready to showcase the Indian Cricket Team! 🏏🇮🇳