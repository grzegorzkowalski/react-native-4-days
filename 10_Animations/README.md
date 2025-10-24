# Animations and UI Libraries

## Moti Examples

<details>
<summary>Basic Animation with Moti</summary>

```typescript
import React, { useState } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { MotiView } from 'moti';

export default function MotiBasicExample() {
  const [isLarge, setIsLarge] = useState(false);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setIsLarge(!isLarge)}>
        <MotiView
          from={{
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            opacity: 1,
            scale: isLarge ? 1.5 : 1,
          }}
          transition={{
            type: 'spring',
            damping: 15,
          }}
          style={styles.box}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: '#ec4899',
    borderRadius: 20,
  },
});
```
</details>


<details>
<summary>Example 2: Skeleton Loader with Moti</summary>

```typescript
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MotiView } from 'moti';
import { Skeleton } from 'moti/skeleton';

export default function SkeletonLoader() {
  return (
    <View style={styles.container}>
      <Skeleton colorMode="light" width="100%" height={60} radius={10} />
      
      <View style={styles.row}>
        <Skeleton colorMode="light" width={60} height={60} radius={30} />
        <View style={styles.textContainer}>
          <Skeleton colorMode="light" width="70%" height={20} />
          <Skeleton colorMode="light" width="90%" height={20} />
        </View>
      </View>

      <Skeleton colorMode="light" width="100%" height={200} radius={10} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  textContainer: {
    flex: 1,
    gap: 10,
  },
});
```
</details>

<details>
<summary>Example 3: List with Entry Animations</summary>

```typescript
import React from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import { MotiView } from 'moti';

const items = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    title: `Item ${i + 1}`,
}));

export default function AnimatedList() {
    return (
        <ScrollView style={styles.container}>
            {items.map((item, index) => (
                    <MotiView
                        key={item.id}
                from={{
        opacity: 0,
            translateY: 50,
    }}
    animate={{
        opacity: 1,
            translateY: 0,
    }}
    transition={{
        type: 'timing',
            duration: 500,
            delay: index * 100, // Cascade effect
    }}
    style={styles.item}
    >
    <Text style={styles.itemText}>{item.title}</Text>
        </MotiView>
))}
    </ScrollView>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f4f6',
    },
    item: {
        padding: 20,
        marginHorizontal: 20,
        marginVertical: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    itemText: {
        fontSize: 18,
        fontWeight: '600',
    },
});
```
</details>

## Exercise 1: Animated API - Pulsing Button (10 min)

### What to do
A button that pulses (scales up and down) when you click it.

### Starting Code
```javascript
import React, { useRef } from 'react';
import { StyleSheet, View, Animated, Pressable, Text } from 'react-native';

export default function App() {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    // TODO: Create animation:
    // 1. Scale up to 1.2 (spring)
    // 2. Return to 1.0 (spring)
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePress}>
        <Animated.View style={[styles.button, { transform: [{ scale }] }]}>
          <Text style={styles.text}>Click me!</Text>
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  button: { 
    backgroundColor: '#3b82f6', 
    padding: 20, 
    borderRadius: 10 
  },
  text: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});
```

### Solution
<details>
<summary>Click to see</summary>

```javascript
const handlePress = () => {
  Animated.sequence([
    Animated.spring(scale, {
      toValue: 1.2,
      useNativeDriver: true,
    }),
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }),
  ]).start();
};
```
</details>

---

## Exercise 2: Reanimated - Draggable Box (10 min)

### What to do
A box that you can drag with your finger (pan gesture).

### Installation
```bash
npx expo install react-native-reanimated react-native-gesture-handler
```

### Starting Code
```javascript
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

export default function App() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      // TODO: Set translateX and translateY based on event.translationX and translationY
    });

  const animatedStyle = useAnimatedStyle(() => ({
    // TODO: Return transform: [{ translateX }, { translateY }]
  }));

  return (
    <View style={styles.container}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.box, animatedStyle]} />
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  box: { width: 100, height: 100, backgroundColor: '#ef4444', borderRadius: 20 },
});
```

### Solution
<details>
<summary>Click to see</summary>

```javascript
const panGesture = Gesture.Pan()
  .onUpdate((event) => {
    translateX.value = event.translationX;
    translateY.value = event.translationY;
  });

const animatedStyle = useAnimatedStyle(() => ({
  transform: [
    { translateX: translateX.value },
    { translateY: translateY.value },
  ],
}));
```
</details>

---

## Exercise 3: Moti - Staggered List (10 min)

### What to do
List items that appear one after another (stagger effect).

### Installation
```bash
npm install moti
```

### Starting Code
```javascript
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MotiView } from 'moti';

const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

export default function App() {
  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <MotiView
          key={item}
          from={{
            // TODO: opacity: 0, translateY: 50
          }}
          animate={{
            // TODO: opacity: 1, translateY: 0
          }}
          transition={{
            // TODO: delay: index * 100 (stagger effect)
          }}
          style={styles.item}
        >
          <Text>{item}</Text>
        </MotiView>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  item: { 
    padding: 20, 
    marginBottom: 10, 
    backgroundColor: 'white',
    borderRadius: 10,
  },
});
```

### Solution
<details>
<summary>Click to see</summary>

```javascript
<MotiView
  key={item}
  from={{ opacity: 0, translateY: 50 }}
  animate={{ opacity: 1, translateY: 0 }}
  transition={{
    type: 'timing',
    duration: 500,
    delay: index * 100,
  }}
  style={styles.item}
>
  <Text>{item}</Text>
</MotiView>
```
</details>

---

## Exercise 4: Lottie - Loading Screen (10 min)

### What to do
Loading screen with Lottie animation.

### Installation
```bash
npx expo install lottie-react-native
```

### Get Animation
1. Go to [lottiefiles.com](https://lottiefiles.com)
2. Search for "loading"
3. Download JSON or use URL to animation
4. Import `logo` and `ok` animations from lottie folder and use them in your app

### Starting Code
```javascript
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import LottieView from 'lottie-react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <LottieView
        // TODO: Add source (require or URL)
        // TODO: Add autoPlay and loop
        style={styles.animation}
      />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#1f2937',
  },
  animation: { width: 200, height: 200 },
  text: { marginTop: 20, color: 'white', fontSize: 18 },
});
```

### Solution
<details>
<summary>Click to see</summary>

```javascript
// From local file:
<LottieView
  source={require('./animation.json')}
  autoPlay
  loop
  style={styles.animation}
/>

// Or from URL:
<LottieView
  source={{ uri: 'https://assets5.lottiefiles.com/packages/lf20_p8bfn5to.json' }}
  autoPlay
  loop
  style={styles.animation}
/>
```
</details>

---

## Exercise 5: React Native Paper - Login Form with Validation (10 min)

### What to do
Simple login form with validation and error messages.

### Installation
```bash
npm install react-native-paper
npx expo install react-native-safe-area-context
```

### Starting Code
```javascript
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { 
  Provider as PaperProvider, 
  TextInput, 
  Button, 
  Text,
  HelperText 
} from 'react-native-paper';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // TODO: Add validation
  const isEmailValid = false; // email.includes('@')
  const isPasswordValid = false; // password.length >= 6

  const handleLogin = () => {
    if (isEmailValid && isPasswordValid) {
      alert('Logged in!');
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text variant="headlineLarge" style={styles.title}>
          Login
        </Text>

        {/* TODO: Add TextInput for email */}
        {/* TODO: Add HelperText for email error */}

        {/* TODO: Add TextInput for password (secureTextEntry) */}
        {/* TODO: Add HelperText for password error */}

        <Button 
          mode="contained" 
          onPress={handleLogin}
          style={styles.button}
          disabled={!isEmailValid || !isPasswordValid}
        >
          Login
        </Button>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    justifyContent: 'center',
    backgroundColor: '#f3f4f6',
  },
  title: { marginBottom: 30, textAlign: 'center' },
  button: { marginTop: 20 },
});
```

### Solution
<details>
<summary>Click to see</summary>

```javascript
const isEmailValid = email.includes('@') && email.includes('.');
const isPasswordValid = password.length >= 6;

// In return:
<TextInput
  label="Email"
  value={email}
  onChangeText={setEmail}
  mode="outlined"
  keyboardType="email-address"
  autoCapitalize="none"
  error={email.length > 0 && !isEmailValid}
  style={{ marginBottom: 5 }}
/>
<HelperText type="error" visible={email.length > 0 && !isEmailValid}>
  Please enter a valid email
</HelperText>

<TextInput
  label="Password"
  value={password}
  onChangeText={setPassword}
  mode="outlined"
  secureTextEntry
  error={password.length > 0 && !isPasswordValid}
  style={{ marginBottom: 5 }}
/>
<HelperText type="error" visible={password.length > 0 && !isPasswordValid}>
  Password must be at least 6 characters
</HelperText>
```
</details>

---

## Cheatsheet - Quick Reference

### Animated API
```javascript
const anim = useRef(new Animated.Value(0)).current;
Animated.timing(anim, { toValue: 1, useNativeDriver: true }).start();
```

### Reanimated
```javascript
const x = useSharedValue(0);
const style = useAnimatedStyle(() => ({ transform: [{ translateX: x.value }] }));
x.value = withSpring(100);
```

### Moti
```javascript
<MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} />
```

### Lottie
```javascript
<LottieView source={require('./anim.json')} autoPlay loop />
```

### Paper
```javascript
<TextInput label="Email" value={email} onChangeText={setEmail} error={hasError} />
<HelperText type="error" visible={hasError}>Error!</HelperText>
```

---
