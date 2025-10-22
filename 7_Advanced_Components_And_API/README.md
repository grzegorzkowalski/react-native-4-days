# Familiarize yourself with the EXPO APIs

**Objective:** Go to the `APIS` project.

## Task:

1. Install the packages.

2. Run it using the Expo Go app or an emulator.

3. Test the functionality of Expo APIs.

4. Familiarize yourself with the source code.

# Platform Logo Select

**Objective:** Learn to detect the current platform and display platform-specific content.

## Task:

1. Check which platform the user is currently using the app on (`android`, `ios`, or `web`).

2. Depending on the platform currently in use, display its logo as the app background.

3. Use the `ImageBackground` component for this purpose.

## Requirements:

- Import and use `Platform` from `react-native` to detect the platform
- Prepare three different logo images (Android, iOS, Web)
- Use `ImageBackground` as the root component
- Display the appropriate logo based on the detected platform

## Steps:

1. Import required components:
```javascript
   import { Platform, ImageBackground } from 'react-native';
```

2. Detect the platform using `Platform.OS`

3. Use conditional rendering to select the appropriate logo

4. Wrap your app content in `ImageBackground`

## Bonus:

- Add platform-specific styling
- Display the platform name as text
- Add different color schemes for each platform

<details>
<summary>Sample solution</summary>

```typescript
import React from "react";
import { Platform, StyleSheet, ImageBackground, Text, View } from "react-native";

// Add assets by your own
import androidLogo from "./assets/android.png";
import iosLogo from "./assets/ios.png";
import webLogo from "./assets/web.png";

export default function App() {
  const platform = Platform.OS;
  
  const backgroundImage =
    platform === "android"
      ? androidLogo
      : platform === "ios"
      ? iosLogo
      : webLogo;
  
  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.text}>You're using {platform.toUpperCase()}!</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
    borderRadius: 10,
  },
  text: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
});
```

</details>

---

# Input and Pattern Matching

**Objective:** Practice pattern matching with user input and conditional logic.

## Task:

1. Use pattern matching techniques you know to solve the following task.

2. Write a function that accepts 2 parameters (data comes from two separate inputs):
   - `name` - e.g., "Alice"
   - `month` - e.g., "january"

3. The function should return:
```
   if month is december, january, february: "[Name] rides a sled"
   if month is march, april, may: "[Name] walks through puddles"
   if month is june, july, august: "[Name] sunbathes"
   if month is september, october, november: "[Name] collects leaves"
```

4. Add protection in the function that allows entering the month in lowercase or uppercase letters. If the month is "another word", the function should return "[Name] is learning JS".

5. Call the function by pressing the appropriate element and passing variables to it: your name and any month.

6. Display the information returned from the function in your application.

## Requirements:

- Create two `TextInput` components (one for name, one for month)
- Create a function with pattern matching logic
- Handle case-insensitive input (convert to lowercase or uppercase)
- Provide a default case for invalid months
- Add a `Button` to trigger the function
- Display the result in a `Text` component

## Example Structure:
```javascript
function getSeasonActivity(name, month) {
  // Convert month to lowercase for comparison
  const monthLower = month.toLowerCase();
  
  // Pattern matching logic here
  switch (monthLower) {
    case 'december':
    case 'january':
    case 'february':
      return `${name} rides a sled`;
    // ... other cases
    default:
      return `${name} is learning JS`;
  }
}
```

## Bonus:

- Add input validation (check if name is not empty)
- Style the result text with different colors for each season
- Add icons representing each season
- Create a dropdown/picker for month selection instead of text input
- Add Polish and English language support for month names

<details>
<summary>Sample solution</summary>

```typescript
import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const seasonSets = {
  winter: new Set(["december", "january", "february", "grudzien", "styczen", "luty"]),
  spring: new Set(["march", "april", "may", "marzec", "kwiecien", "maj"]),
  summer: new Set(["june", "july", "august", "czerwiec", "lipiec", "sierpien"]),
  autumn: new Set(["september", "october", "november", "wrzesien", "pazdziernik", "listopad"]),
};

const seasonStyles = {
  winter: { color: "#3b82f6", icon: "snow" },
  spring: { color: "#16a34a", icon: "rainy" },
  summer: { color: "#f59e0b", icon: "sunny" },
  autumn: { color: "#92400e", icon: "leaf" },
  default: { color: "#475569", icon: "school" },
};

function normalizeMonth(s) {
  return (s || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getSeason(month) {
  const m = normalizeMonth(month);
  if (seasonSets.winter.has(m)) return "winter";
  if (seasonSets.spring.has(m)) return "spring";
  if (seasonSets.summer.has(m)) return "summer";
  if (seasonSets.autumn.has(m)) return "autumn";
  return "default";
}

function getSeasonActivity(name, month) {
  const season = getSeason(month);
  switch (season) {
    case "winter":
      return { text: `${name} rides a sled`, season };
    case "spring":
      return { text: `${name} walks through puddles`, season };
    case "summer":
      return { text: `${name} sunbathes`, season };
    case "autumn":
      return { text: `${name} collects leaves`, season };
    default:
      return { text: `${name} is learning JS`, season };
  }
}

export default function App() {
  const [name, setName] = useState("");
  const [month, setMonth] = useState("");
  const [result, setResult] = useState("");
  const [season, setSeason] = useState("default");
  const [error, setError] = useState("");

  const onCheck = () => {
    if (!name.trim()) {
      setError("Please enter a name");
      setResult("");
      setSeason("default");
      return;
    }
    setError("");
    const { text, season: s } = getSeasonActivity(name.trim(), month);
    setResult(text);
    setSeason(s);
  };

  const color = seasonStyles[season].color;
  const icon = seasonStyles[season].icon;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Input and Pattern Matching</Text>

      <TextInput
        placeholder="Enter name"
        value={name}
        onChangeText={setName}
        style={styles.input}
        autoCapitalize="words"
      />

      <TextInput
        placeholder="Enter month (e.g., January / styczeń)"
        value={month}
        onChangeText={setMonth}
        style={styles.input}
        autoCapitalize="none"
      />

      {!!error && <Text style={styles.error}>{error}</Text>}

      <Pressable onPress={onCheck} style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
        <Ionicons name="checkmark-circle" size={20} color="#fff" />
        <Text style={styles.buttonText}>Check</Text>
      </Pressable>

      {!!result && (
        <View style={styles.resultBox}>
          <Ionicons name={icon} size={28} color={color} />
          <Text style={[styles.resultText, { color }]}>{result}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 64, backgroundColor: "#0b1220" },
  title: { fontSize: 22, fontWeight: "700", color: "#e2e8f0", marginBottom: 16, textAlign: "center" },
  input: {
    backgroundColor: "#111827",
    borderColor: "#1f2937",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: "#e5e7eb",
    marginBottom: 12,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: "center",
  },
  buttonPressed: { opacity: 0.85 },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  error: { color: "#f87171", marginBottom: 8, fontWeight: "600" },
  resultBox: {
    marginTop: 20,
    backgroundColor: "#0f172a",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  resultText: { fontSize: 20, fontWeight: "700" },
});

```
</details>

---

# React Native Expo API Testing Exercises

## Prerequisites

Before starting these exercises, make sure you have:
- Expo CLI installed and configured
- A physical device or emulator/simulator running
---

## Exercise 1: Camera API - Photo Capture App

**Objective:** Learn to use the Expo Camera API to capture photos and display them.

### Task:
1. Install the required package:
```bash
   npx expo install expo-camera
```

2. Create a component `CameraExample.tsx` that:
   - Requests camera permissions from the user
   - Displays a camera preview on the screen
   - Shows a "Take Photo" button
   - Captures a photo when the button is pressed
   - Displays the captured photo below the camera preview

### Requirements:
- Handle permission denied scenarios gracefully
- Show loading state while requesting permissions
- Display the photo URI or the actual image after capture
- Add a "Retake" button to capture a new photo

### Bonus:
- Add a toggle to switch between front and back cameras
- Save the captured photo to the device's media library

Add configuration to your `app.json`.
```json
{
   "expo": {
      "plugins": [
         [
            "expo-camera",
            {
               "cameraPermission": "Allow $(PRODUCT_NAME) to access your camera"
            }
         ],
         [
            "expo-media-library",
            {
               "photosPermission": "Allow $(PRODUCT_NAME) to save photos"
            }
         ]
      ],
              "android": {
         "permissions": ["CAMERA", "READ_EXTERNAL_STORAGE", "WRITE_EXTERNAL_STORAGE"]
      },
      "ios": {
         "infoPlist": {
            "NSCameraUsageDescription": "This app needs access to your camera to take photos",
                    "NSPhotoLibraryAddUsageDescription": "This app saves photos to your library"
         }
      }
   }
}

```

<details>
<summary>Sample solution</summary>

```typescript
// CameraExample.tsx
import React, { useRef, useState } from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

export default function CameraExample() {
  const [permission, requestPermission] = useCameraPermissions();
  const [mlGranted, setMlGranted] = useState<boolean | null>(null);
  const cameraRef = useRef<CameraView>(null);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [facing, setFacing] = useState<"back" | "front">("back");
  const [loading, setLoading] = useState(false);

  if (!permission) {
    return (
      <View style={styles.center}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={{ marginBottom: 8 }}>Camera permission is required</Text>
        <Button title="Grant Permission" onPress={requestPermission} />
      </View>
    );
  }

  const takePhoto = async () => {
    if (!cameraRef.current) return;
    setLoading(true);
    try {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo?.uri ?? null);
    } finally {
      setLoading(false);
    }
  };

  const savePhoto = async () => {
    if (!photoUri) return;
    if (mlGranted === null) {
      const res = await MediaLibrary.requestPermissionsAsync();
      setMlGranted(res.granted);
      if (!res.granted) return;
    }
    if (mlGranted === false) return;
    await MediaLibrary.saveToLibraryAsync(photoUri);
  };

  return (
    <View style={styles.container}>
      {!photoUri ? (
        <>
          <CameraView ref={cameraRef} style={styles.camera} facing={facing} />
          <View style={styles.row}>
            <Button title={loading ? "Capturing..." : "Take Photo"} onPress={takePhoto} disabled={loading} />
            <Button title={`Switch: ${facing === "back" ? "Front" : "Back"}`} onPress={() => setFacing(f => (f === "back" ? "front" : "back"))} />
          </View>
        </>
      ) : (
        <>
          <Image source={{ uri: photoUri }} style={styles.preview} />
          <Text style={styles.uri}>{photoUri}</Text>
          <View style={styles.row}>
            <Button title="Retake" onPress={() => setPhotoUri(null)} />
            <Button title="Save to Gallery" onPress={savePhoto} />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, gap: 12, backgroundColor: "#fff" },
  camera: { flex: 1, borderRadius: 8, overflow: "hidden" },
  preview: { width: "100%", aspectRatio: 3 / 4, borderRadius: 8 },
  row: { flexDirection: "row", justifyContent: "space-around", gap: 12 },
  uri: { fontSize: 12, color: "#555" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
```
</details>

---

## Exercise 2: Audio API - Voice Recorder

**Objective:** Practice recording and playing audio using Expo AV.

### Task:
1. Install the required package:
```bash
   npx expo install expo-av
```

2. Create a component `AudioExample.tsx` that:
   - Requests audio recording permissions
   - Has a "Start Recording" button
   - Has a "Stop Recording" button
   - Displays recording duration while recording
   - Saves the recording when stopped
   - Has a "Play Recording" button to playback the audio
   - Has a "Pause" and "Stop" button for playback control

### Requirements:
- Show recording status (recording, stopped, playing)
- Display recording duration in MM:SS format
- Handle permission errors appropriately
- Show playback progress

### Bonus:
- Add a volume slider for playback
- Display a list of all recorded audios
- Add delete functionality for recordings

Add configuration to your `app.json`.
```json
{
   "expo": {
      "android": { "permissions": ["RECORD_AUDIO"] },
      "ios": {
         "infoPlist": {
            "NSMicrophoneUsageDescription": "This app needs access to the microphone to record audio."
         }
      }
   }
}

```

<details>
<summary>Sample solution</summary>

```typescript
import React, { useEffect, useRef, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Audio, AVPlaybackStatusSuccess } from "expo-av";

function mmss(ms: number) {
  const total = Math.floor(ms / 1000);
  const m = Math.floor(total / 60).toString().padStart(2, "0");
  const s = (total % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function AudioExample() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [statusText, setStatusText] = useState("idle");
  const [recDur, setRecDur] = useState(0);
  const [playDur, setPlayDur] = useState(0);
  const [playPos, setPlayPos] = useState(0);

  const recordingRef = useRef<Audio.Recording | null>(null);
  const soundRef = useRef<Audio.Sound | null>(null);
  const [uri, setUri] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Audio.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    return () => {
      recordingRef.current?.stopAndUnloadAsync().catch(() => {});
      soundRef.current?.unloadAsync().catch(() => {});
    };
  }, []);

  const startRecording = async () => {
    if (!hasPermission) return;
    await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
    const rec = new Audio.Recording();
    await rec.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
    rec.setOnRecordingStatusUpdate((s) => {
      if (!s) return;
      setStatusText(s.isRecording ? "recording" : "stopped");
      setRecDur(s.durationMillis ?? 0);
    });
    await rec.startAsync();
    recordingRef.current = rec;
    setUri(null);
  };

  const stopRecording = async () => {
    const rec = recordingRef.current;
    if (!rec) return;
    await rec.stopAndUnloadAsync();
    const newUri = rec.getURI() ?? null;
    setUri(newUri);
    recordingRef.current = null;
    setStatusText("stopped");
    await Audio.setAudioModeAsync({ allowsRecordingIOS: false });
  };

  const play = async () => {
    if (!uri) return;
    if (soundRef.current) {
      await soundRef.current.playAsync();
      return;
    }
    const sound = new Audio.Sound();
    sound.setOnPlaybackStatusUpdate((st) => {
      const s = st as AVPlaybackStatusSuccess;
      if (!s.isLoaded) return;
      setStatusText(s.isPlaying ? "playing" : s.didJustFinish ? "stopped" : "paused");
      setPlayDur(s.durationMillis ?? 0);
      setPlayPos(s.positionMillis ?? 0);
    });
    await sound.loadAsync({ uri });
    soundRef.current = sound;
    await sound.playAsync();
  };

  const pause = async () => {
    if (!soundRef.current) return;
    await soundRef.current.pauseAsync();
  };

  const stop = async () => {
    if (!soundRef.current) return;
    await soundRef.current.stopAsync();
    setPlayPos(0);
  };

  const permView =
    hasPermission === null ? (
      <Text>Requesting microphone permission…</Text>
    ) : hasPermission === false ? (
      <Text style={styles.err}>Microphone permission denied</Text>
    ) : null;

  return (
    <View style={styles.container}>
      {permView}
      <Text style={styles.h1}>Audio Recorder</Text>

      <View style={styles.block}>
        <Text>Status: {statusText}</Text>
        <Text>Rec: {mmss(recDur)}</Text>
        <View style={styles.row}>
          <Button title="Start Recording" onPress={startRecording} disabled={!hasPermission || !!recordingRef.current} />
          <Button title="Stop Recording" onPress={stopRecording} disabled={!recordingRef.current} />
        </View>
      </View>

      <View style={styles.block}>
        <Text>URI: {uri ?? "-"}</Text>
        <Text>
          Playback: {mmss(playPos)} / {mmss(playDur)}
        </Text>
        <View style={styles.row}>
          <Button title="Play" onPress={play} disabled={!uri} />
          <Button title="Pause" onPress={pause} disabled={!soundRef.current} />
          <Button title="Stop" onPress={stop} disabled={!soundRef.current} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 16, padding: 16, paddingTop: 48 },
  h1: { fontSize: 20, fontWeight: "700" },
  block: { gap: 8 },
  row: { flexDirection: "row", gap: 8, alignItems: "center" },
  err: { color: "#dc2626" },
});
```
</details>

---

## Exercise 3: Vibration API - Haptic Feedback

**Objective:** Implement different vibration patterns and haptic feedback.

### Task:
1. Install the required package:
```bash
   npx expo install expo-haptics
```

2. Create a component `VibrationExample.tsx` that includes:
   - A button for "Light Impact" haptic feedback
   - A button for "Medium Impact" haptic feedback
   - A button for "Heavy Impact" haptic feedback
   - A button for "Success" notification feedback
   - A button for "Warning" notification feedback
   - A button for "Error" notification feedback
   - A button for custom vibration pattern (e.g., SOS pattern)

### Requirements:
- Each button should trigger its respective haptic feedback
- Display a label showing which feedback was triggered
- Add a toggle to enable/disable haptics

### Bonus:
- Create a rhythm game that uses haptic feedback for beats
- Implement a custom vibration pattern creator

<details>
<summary>Sample solution</summary>

```typescript
import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Switch, Vibration } from "react-native";
import * as Haptics from "expo-haptics";

export default function VibrationExample() {
  const [enabled, setEnabled] = useState(true);
  const [label, setLabel] = useState("—");

  const run = async (name: string, fn: () => Promise<void> | void) => {
    setLabel(enabled ? name : `${name} (disabled)`);
    if (!enabled) return;
    await fn();
  };

  const sosPattern = [0, 150, 150, 150, 150, 150, 150, 450, 150, 450, 150, 450, 150, 150, 150, 150, 150, 150];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Haptic Feedback</Text>

      <View style={styles.row}>
        <Text style={styles.text}>Enable haptics</Text>
        <Switch value={enabled} onValueChange={setEnabled} />
      </View>

      <View style={styles.grid}>
        <Button title="Light Impact" onPress={() => run("Light Impact", () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light))} />
        <Button title="Medium Impact" onPress={() => run("Medium Impact", () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium))} />
        <Button title="Heavy Impact" onPress={() => run("Heavy Impact", () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy))} />
        <Button title="Success" onPress={() => run("Success", () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success))} />
        <Button title="Warning" onPress={() => run("Warning", () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning))} />
        <Button title="Error" onPress={() => run("Error", () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error))} />
        <Button title="Custom: SOS" onPress={() => run("Custom: SOS", () => Vibration.vibrate(sosPattern))} />
        <Button title="Stop Vibration" onPress={() => run("Stop Vibration", () => Vibration.cancel())} />
      </View>

      <Text style={styles.label}>Last: {label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 16, padding: 16, paddingTop: 48, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "700", textAlign: "center" },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  text: { fontSize: 16 },
  grid: { gap: 10 },
  label: { marginTop: 8, fontSize: 16, fontWeight: "600", textAlign: "center" },
});
```
</details>
---

## Exercise 4: Sensors API - Motion Detector

**Objective:** Access device sensors like accelerometer, gyroscope, and magnetometer.

### Task:
1. Install the required package:
```bash
   npx expo install expo-sensors
```

2. Create a component `SensorsExample.tsx` that:
   - Displays real-time accelerometer data (x, y, z axes)
   - Displays real-time gyroscope data
   - Shows device orientation
   - Detects when the device is shaken
   - Has toggle buttons to start/stop sensor monitoring

### Requirements:
- Update sensor data at least 5 times per second
- Display data in a readable format with labels
- Show a visual indicator when shake is detected
- Clean up sensor listeners when component unmounts

### Bonus:
- Create a level/bubble tool using accelerometer
- Build a step counter using accelerometer data
- Visualize sensor data with animated bars or graphs

<details>
<summary>Sample solution</summary>

```typescript
import React, { useEffect, useRef, useState } from "react";
import { View, Text, Button, StyleSheet, Switch, Animated } from "react-native";
import { Accelerometer, Gyroscope, Magnetometer } from "expo-sensors";

type Vec3 = { x: number; y: number; z: number };

function f(n?: number) {
  return (n ?? 0).toFixed(3);
}

function classifyOrientation(a: Vec3): string {
  const { x, y, z } = a;
  if (Math.abs(z) > 0.8) return z > 0 ? "Face Up" : "Face Down";
  if (Math.abs(x) > Math.abs(y)) return x > 0 ? "Landscape Left" : "Landscape Right";
  return y < 0 ? "Portrait" : "Portrait Upside-Down";
}

export default function SensorsExample() {
  const [accEnabled, setAccEnabled] = useState(true);
  const [gyrEnabled, setGyrEnabled] = useState(true);
  const [magEnabled, setMagEnabled] = useState(false);

  const [acc, setAcc] = useState<Vec3>({ x: 0, y: 0, z: 0 });
  const [gyr, setGyr] = useState<Vec3>({ x: 0, y: 0, z: 0 });
  const [mag, setMag] = useState<Vec3>({ x: 0, y: 0, z: 0 });

  const [orientation, setOrientation] = useState("Unknown");
  const [shake, setShake] = useState(false);

  const accSub = useRef<any>(null);
  const gyrSub = useRef<any>(null);
  const magSub = useRef<any>(null);

  const shakeCooldownRef = useRef(0);
  const flash = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Accelerometer.setUpdateInterval(200); // >= 5 Hz
    Gyroscope.setUpdateInterval(200);
    Magnetometer.setUpdateInterval(200);
  }, []);

  useEffect(() => {
    if (accEnabled && !accSub.current) {
      accSub.current = Accelerometer.addListener((data) => {
        setAcc(data);
        setOrientation(classifyOrientation(data));

        // proste wykrycie wstrząsu: |a| wyraźnie > 1g z cooldownem
        const g = Math.sqrt(data.x * data.x + data.y * data.y + data.z * data.z);
        const now = Date.now();
        if (g > 1.6 && now - shakeCooldownRef.current > 1000) {
          shakeCooldownRef.current = now;
          setShake(true);
          Animated.sequence([
            Animated.timing(flash, { toValue: 1, duration: 80, useNativeDriver: true }),
            Animated.timing(flash, { toValue: 0, duration: 600, useNativeDriver: true }),
          ]).start(() => setShake(false));
        }
      });
    }
    return () => {
      accSub.current?.remove?.();
      accSub.current = null;
    };
  }, [accEnabled]);

  useEffect(() => {
    if (gyrEnabled && !gyrSub.current) {
      gyrSub.current = Gyroscope.addListener((data) => setGyr(data));
    }
    return () => {
      gyrSub.current?.remove?.();
      gyrSub.current = null;
    };
  }, [gyrEnabled]);

  useEffect(() => {
    if (magEnabled && !magSub.current) {
      magSub.current = Magnetometer.addListener((data) => setMag(data));
    }
    return () => {
      magSub.current?.remove?.();
      magSub.current = null;
    };
  }, [magEnabled]);

  useEffect(() => {
    return () => {
      accSub.current?.remove?.();
      gyrSub.current?.remove?.();
      magSub.current?.remove?.();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Sensors: Motion Detector</Text>

      <View style={styles.toggles}>
        <Toggle label="Accelerometer" value={accEnabled} onChange={setAccEnabled} />
        <Toggle label="Gyroscope" value={gyrEnabled} onChange={setGyrEnabled} />
        <Toggle label="Magnetometer" value={magEnabled} onChange={setMagEnabled} />
      </View>

      <Card title="Accelerometer (g)">
        <Mono>{`x: ${f(acc.x)}   y: ${f(acc.y)}   z: ${f(acc.z)}`}</Mono>
      </Card>

      <Card title="Gyroscope (rad/s)">
        <Mono>{`x: ${f(gyr.x)}   y: ${f(gyr.y)}   z: ${f(gyr.z)}`}</Mono>
      </Card>

      <Card title="Magnetometer (µT)">
        <Mono>{`x: ${f(mag.x)}   y: ${f(mag.y)}   z: ${f(mag.z)}`}</Mono>
      </Card>

      <Card title="Orientation">
        <Text style={styles.orientation}>{orientation}</Text>
      </Card>

      <Animated.View
        pointerEvents="none"
        style={[
          styles.shakeBanner,
          { opacity: flash, transform: [{ scale: flash.interpolate({ inputRange: [0, 1], outputRange: [0.95, 1] }) }] },
        ]}
      >
        <Text style={styles.shakeText}>{shake ? "SHAKE DETECTED" : ""}</Text>
      </Animated.View>

      <View style={styles.row}>
        <Button title="Start All" onPress={() => { setAccEnabled(true); setGyrEnabled(true); setMagEnabled(true); }} />
        <Button title="Stop All" onPress={() => { setAccEnabled(false); setGyrEnabled(false); setMagEnabled(false); }} />
      </View>
    </View>
  );
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <View style={styles.toggleRow}>
      <Text style={styles.toggleLabel}>{label}</Text>
      <Switch value={value} onValueChange={onChange} />
    </View>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View>{children}</View>
    </View>
  );
}

function Mono({ children }: { children: React.ReactNode }) {
  return <Text style={styles.mono}>{children}</Text>;
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 48, gap: 12, backgroundColor: "#fff" },
  h1: { fontSize: 20, fontWeight: "700", textAlign: "center", marginBottom: 8 },
  toggles: { gap: 8 },
  toggleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 6 },
  toggleLabel: { fontSize: 16, fontWeight: "600" },
  card: { padding: 12, borderRadius: 10, backgroundColor: "#f5f5f5" },
  cardTitle: { fontWeight: "700", marginBottom: 6 },
  mono: { fontFamily: Platform.select({ ios: "Menlo", android: "monospace", default: "monospace" }), fontSize: 14 },
  orientation: { fontSize: 18, fontWeight: "700" },
  shakeBanner: {
    alignSelf: "center",
    minHeight: 32,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#fee2e2",
    justifyContent: "center",
  },
  shakeText: { color: "#b91c1c", fontWeight: "800" },
  row: { flexDirection: "row", justifyContent: "space-between", gap: 12, marginTop: 8 },
});
```
</details>

---

## Exercise 5: Location API - GPS Tracker

**Objective:** Access device location and track user movement.

### Task:
1. Install the required package:
```bash
   npx expo install expo-location
```

2. Create a component `LocationExample.tsx` that:
   - Requests location permissions (foreground)
   - Displays current latitude and longitude
   - Shows current address (reverse geocoding)
   - Displays altitude and accuracy
   - Shows current speed (if moving)
   - Has a "Refresh Location" button

### Requirements:
- Handle all permission states (granted, denied, restricted)
- Show loading state while fetching location
- Display location accuracy
- Format coordinates to 6 decimal places

### Bonus:
- Implement background location tracking
- Calculate and display distance traveled
- Show location on a map using `react-native-maps`
- Add geocoding (convert address to coordinates)

Add configuration to your `app.json`.
```json
export default {
   expo: {
      android: {
         permissions: ["ACCESS_FINE_LOCATION", "ACCESS_COARSE_LOCATION", "ACCESS_BACKGROUND_LOCATION"]
      },
      ios: {
         infoPlist: {
            NSLocationWhenInUseUsageDescription: "This app uses your location…",
            NSLocationAlwaysAndWhenInUseUsageDescription: "This app needs location in background…"
         },
         UIBackgroundModes: ["location"]
      }
   }
};

```

<details>
<summary>Sample solution</summary>

```typescript
// LocationExample.tsx
import React, { useEffect, useState } from "react";
import { View, Text, Button, ActivityIndicator, StyleSheet } from "react-native";
import * as Location from "expo-location";

type Coords = { latitude: number; longitude: number; altitude?: number | null; accuracy?: number | null; speed?: number | null };

function f6(n?: number | null) {
  if (n == null) return "—";
  return n.toFixed(6);
}
function f2(n?: number | null) {
  if (n == null) return "—";
  return n.toFixed(2);
}

export default function LocationExample() {
  const [status, setStatus] = useState<"checking" | "granted" | "denied" | "restricted">("checking");
  const [coords, setCoords] = useState<Coords | null>(null);
  const [address, setAddress] = useState<string>("—");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setStatus("checking");
      const { status: s, canAskAgain } = await Location.requestForegroundPermissionsAsync();
      if (s === Location.PermissionStatus.GRANTED) setStatus("granted");
      else if (!canAskAgain) setStatus("restricted"); // użytkownik zablokował pytanie / ograniczone
      else setStatus("denied");
    })();
  }, []);

  const refresh = async () => {
    if (status !== "granted") return;
    setLoading(true);
    try {
      const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      const { latitude, longitude, altitude, accuracy, speed } = pos.coords;
      setCoords({ latitude, longitude, altitude, accuracy, speed });
      const rev = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (rev?.length) {
        const a = rev[0];
        const parts = [a.name, a.street, a.postalCode, a.city || a.subregion, a.region, a.country].filter(Boolean);
        setAddress(parts.join(", "));
      } else {
        setAddress("—");
      }
    } catch (e) {
      setAddress("Error getting address");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "granted") refresh();
  }, [status]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location (GPS) Tracker</Text>

      {status === "checking" && (
        <View style={styles.center}>
          <ActivityIndicator />
          <Text>Requesting location permission…</Text>
        </View>
      )}

      {status !== "checking" && (
        <>
          <View style={styles.row}>
            <Text style={styles.label}>Permission:</Text>
            <Text style={styles.value}>
              {status === "granted" ? "granted ✅" : status === "restricted" ? "restricted 🚫" : "denied ❌"}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Coordinates</Text>
            <Text>Latitude:  {f6(coords?.latitude)}</Text>
            <Text>Longitude: {f6(coords?.longitude)}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Details</Text>
            <Text>Altitude: {coords?.altitude == null ? "—" : `${f2(coords.altitude)} m`}</Text>
            <Text>Accuracy: {coords?.accuracy == null ? "—" : `${f2(coords.accuracy)} m`}</Text>
            <Text>Speed: {coords?.speed == null ? "—" : `${f2(coords.speed)} m/s`}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Address (reverse geocoding)</Text>
            <Text>{address}</Text>
          </View>

          <Button title={loading ? "Refreshing…" : "Refresh Location"} onPress={refresh} disabled={status !== "granted" || loading} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 48, padding: 16, gap: 14, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "700", textAlign: "center", marginBottom: 8 },
  center: { alignItems: "center", gap: 8 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  label: { fontWeight: "600" },
  value: { fontWeight: "700" },
  card: { padding: 12, borderRadius: 10, backgroundColor: "#f5f5f5", gap: 4 },
  cardTitle: { fontWeight: "700", marginBottom: 4 },
});
```
</details>
---

## Exercise 6: Battery API - Power Monitor

**Objective:** Monitor device battery level and charging status.

### Task:
1. Install the required package:
```bash
   npx expo install expo-battery
```

2. Create a component `BatteryExample.tsx` that:
   - Displays current battery level as a percentage
   - Shows battery charging status (charging/not charging)
   - Displays battery state (full, charging, unplugged)
   - Shows if low power mode is enabled
   - Updates in real-time when battery status changes

### Requirements:
- Display battery level with a visual indicator (progress bar or battery icon)
- Use different colors for different battery levels:
   - Green: > 50%
   - Yellow: 20-50%
   - Red: < 20%
- Show an icon or text when device is charging

### Bonus:
- Send a notification when battery is low
- Calculate estimated time to full charge
- Track battery drain rate
- Create a battery health history graph

<details>
<summary>Sample solution</summary>

```typescript
// BatteryExample.tsx
import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Battery from "expo-battery";

export default function BatteryExample() {
  const [level, setLevel] = useState<number | null>(null); // 0..1
  const [state, setState] = useState<Battery.BatteryState | null>(null);
  const [lowPower, setLowPower] = useState<boolean | null>(null);

  const lvlSub = useRef<Battery.Subscription | null>(null);
  const stSub = useRef<Battery.Subscription | null>(null);
  const lowSub = useRef<Battery.Subscription | null>(null);

  useEffect(() => {
    (async () => {
      setLevel(await Battery.getBatteryLevelAsync());
      setState(await Battery.getBatteryStateAsync());
      setLowPower(await Battery.isLowPowerModeEnabledAsync());
    })();

    lvlSub.current = Battery.addBatteryLevelListener(({ batteryLevel }) => setLevel(batteryLevel));
    stSub.current = Battery.addBatteryStateListener(({ batteryState }) => setState(batteryState));
    lowSub.current = Battery.addLowPowerModeListener(({ lowPowerMode }) => setLowPower(lowPowerMode));

    return () => {
      lvlSub.current?.remove(); stSub.current?.remove(); lowSub.current?.remove();
    };
  }, []);

  const pct = level == null ? null : Math.round(level * 100);
  const charging = state === Battery.BatteryState.CHARGING;
  const stateLabel =
    state === Battery.BatteryState.CHARGING ? "Charging" :
    state === Battery.BatteryState.FULL ? "Full" :
    state === Battery.BatteryState.UNPLUGGED ? "Unplugged" :
    "Unknown";

  const color =
    pct == null ? "#94a3b8" :
    pct > 50 ? "#16a34a" :
    pct >= 20 ? "#ca8a04" :
    "#dc2626";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Battery Monitor</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Level:</Text>
        <Text style={[styles.value, { color }]}>{pct == null ? "—" : `${pct}%`}</Text>
      </View>

      <View style={styles.progressWrap}>
        <View style={styles.progressOuter}>
          <View style={[styles.progressInner, { width: `${pct ?? 0}%`, backgroundColor: color }]} />
        </View>
        <View style={styles.cap} />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>State:</Text>
        <Text style={styles.value}>
          {stateLabel} {charging ? "⚡" : ""}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Low Power Mode:</Text>
        <Text style={styles.value}>{lowPower == null ? "—" : lowPower ? "On" : "Off"}</Text>
      </View>

      <Text style={styles.hint}>Updates in real-time via listeners.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 48, padding: 16, gap: 14, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "700", textAlign: "center", marginBottom: 8 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  label: { fontSize: 16, fontWeight: "600", color: "#334155" },
  value: { fontSize: 16, fontWeight: "700" },
  progressWrap: { flexDirection: "row", alignItems: "center", alignSelf: "center", marginVertical: 8 },
  progressOuter: { width: 220, height: 32, borderWidth: 2, borderColor: "#334155", borderRadius: 6, overflow: "hidden" },
  progressInner: { height: "100%" },
  cap: { width: 6, height: 16, marginLeft: 4, backgroundColor: "#334155", borderRadius: 2 },
  hint: { textAlign: "center", color: "#64748b" },
});
```
</details>

---

## Exercise 7: Brightness API - Screen Control

**Objective:** Control and monitor screen brightness.

### Task:
1. Install the required package:
```bash
   npx expo install expo-brightness
```

2. Create a component `BrightnessExample.tsx` that:
   - Displays current screen brightness level (0-1)
   - Has a slider to adjust screen brightness
   - Shows current system brightness
   - Has preset buttons:
      - "Dim" (25% brightness)
      - "Medium" (50% brightness)
      - "Bright" (75% brightness)
      - "Max" (100% brightness)
   - Has a "Reset to System" button

### Requirements:
- Request system brightness permissions
- Display brightness as a percentage
- Smooth slider control for brightness adjustment
- Restore original brightness when component unmounts

### Bonus:
- Implement auto-brightness toggle
- Create a night mode that sets brightness to minimum
- Add a brightness scheduler (e.g., dim at night)
- Show a preview of how the screen looks at different brightness levels

<details>
<summary>Sample solution</summary>

```typescript
// BrightnessExample.tsx
import React, { useEffect, useRef, useState } from "react";
import { View, Text, Button, StyleSheet, Platform, PanResponder, LayoutChangeEvent } from "react-native";
import * as Brightness from "expo-brightness";

export default function BrightnessExample() {
  const [appBrightness, setAppBrightness] = useState<number | null>(null);   // 0..1
  const [systemBrightness, setSystemBrightness] = useState<number | null>(null);
  const originalRef = useRef<number | null>(null);
  const [hasSystemPerm, setHasSystemPerm] = useState<boolean | null>(null);

  const [sliderWidth, setSliderWidth] = useState(1);

  useEffect(() => {
    (async () => {
      const current = await Brightness.getBrightnessAsync();
      setAppBrightness(current);
      originalRef.current = current;

      if (Platform.OS === "android") {
        const perm = await Brightness.getPermissionsAsync();
        setHasSystemPerm(perm.granted);
        try {
          const sys = await Brightness.getSystemBrightnessAsync();
          setSystemBrightness(sys);
        } catch {
          setSystemBrightness(null);
        }
      } else {
        try {
          const sys = await Brightness.getSystemBrightnessAsync();
          setSystemBrightness(sys);
        } catch {
          setSystemBrightness(null);
        }
      }
    })();

    return () => {
      if (typeof originalRef.current === "number") {
        Brightness.setBrightnessAsync(originalRef.current).catch(() => {});
      }
    };
  }, []);

  const requestSystemPerm = async () => {
    const res = await Brightness.requestPermissionsAsync();
    setHasSystemPerm(res.granted);
  };

  const setApp = async (v: number) => {
    const clamped = Math.min(1, Math.max(0, v));
    await Brightness.setBrightnessAsync(clamped);
    setAppBrightness(clamped);
  };

  const preset = (v: number) => () => setApp(v);

  const resetToSystem = async () => {
    if (systemBrightness == null) return;
    await setApp(systemBrightness);
  };

  const onSliderLayout = (e: LayoutChangeEvent) => setSliderWidth(e.nativeEvent.layout.width);

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        const x = evt.nativeEvent.locationX;
        setApp(x / sliderWidth);
      },
      onPanResponderMove: (_evt, gesture) => {
        const x = Math.min(sliderWidth, Math.max(0, gesture.moveX - gesture.x0 + gesture.dx));
        setApp(x / sliderWidth);
      },
    })
  ).current;

  const pct = (v: number | null) => (v == null ? "—" : `${Math.round(v * 100)}%`);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Brightness Control</Text>

      <View style={styles.row}>
        <Text style={styles.label}>App brightness:</Text>
        <Text style={styles.value}>{pct(appBrightness)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>System brightness:</Text>
        <Text style={styles.value}>{pct(systemBrightness)}</Text>
      </View>

      {Platform.OS === "android" && (
        <View style={styles.permBox}>
          <Text style={styles.permText}>
            System permission:{" "}
            {hasSystemPerm == null ? "checking…" : hasSystemPerm ? "granted ✅" : "not granted ⚠️"}
          </Text>
          {!hasSystemPerm && (
            <Button title="Request System Permission" onPress={requestSystemPerm} />
          )}
        </View>
      )}

      <Text style={styles.section}>Slider</Text>
      <View style={styles.sliderWrap} onLayout={onSliderLayout} {...pan.panHandlers}>
        <View style={styles.sliderTrack} />
        <View
          style={[
            styles.sliderFill,
            { width: `${(appBrightness ?? 0) * 100}%` },
          ]}
        />
      </View>
      <Text style={styles.hint}>Drag the bar to set brightness</Text>

      <Text style={styles.section}>Presets</Text>
      <View style={styles.grid}>
        <Button title="Dim (25%)" onPress={preset(0.25)} />
        <Button title="Medium (50%)" onPress={preset(0.5)} />
        <Button title="Bright (75%)" onPress={preset(0.75)} />
        <Button title="Max (100%)" onPress={preset(1)} />
      </View>

      <View style={{ height: 8 }} />

      <Button title="Reset to System" onPress={resetToSystem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 48, padding: 16, gap: 12, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "700", textAlign: "center", marginBottom: 8 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  label: { fontWeight: "600", color: "#334155" },
  value: { fontWeight: "800" },
  section: { marginTop: 8, fontWeight: "700" },
  sliderWrap: {
    height: 36,
    borderRadius: 18,
    backgroundColor: "#e5e7eb",
    overflow: "hidden",
    justifyContent: "center",
  },
  sliderTrack: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: "#cbd5e1",
    alignSelf: "center",
  },
  sliderFill: {
    position: "absolute",
    left: 0,
    height: 36,
    backgroundColor: "#60a5fa",
  },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 8, justifyContent: "space-between" },
  hint: { textAlign: "center", color: "#64748b" },
  permBox: { gap: 8, paddingVertical: 8 },
  permText: { color: "#444" },
});

```
</details>
---

## Optional Exercise 8: Combined API Challenge - Environment Monitor

**Objective:** Combine multiple APIs into a comprehensive monitoring app.

### Task:
Create a dashboard component `EnvironmentDashboard.tsx` that displays:
- Current location (latitude, longitude, address)
- Device orientation (from sensors)
- Battery level and charging status
- Current brightness level
- A button to take a photo with timestamp and location
- A button to record an audio note
- Haptic feedback on all button presses

### Requirements:
- Clean, organized UI with sections for each API
- Handle all permissions appropriately
- Update data in real-time where applicable
- Store captured photos and audio with metadata (location, time, battery level)

### Bonus:
- Export all data as JSON
- Create a timeline view of captured media
- Add data visualization (charts for sensor data)
- Implement offline storage using AsyncStorage

---

## Testing Guidelines

For each exercise:
1. Test on a physical device when possible (some features don't work on simulators)
2. Handle all permission scenarios (granted, denied, never ask again)
3. Test edge cases (e.g., no GPS signal, camera in use by another app)
4. Implement proper error handling and user feedback
5. Clean up resources (listeners, intervals) when components unmount

## Useful Resources

- [Expo Camera Documentation](https://docs.expo.dev/versions/latest/sdk/camera/)
- [Expo AV Documentation](https://docs.expo.dev/versions/latest/sdk/av/)
- [Expo Haptics Documentation](https://docs.expo.dev/versions/latest/sdk/haptics/)
- [Expo Sensors Documentation](https://docs.expo.dev/versions/latest/sdk/sensors/)
- [Expo Location Documentation](https://docs.expo.dev/versions/latest/sdk/location/)
- [Expo Battery Documentation](https://docs.expo.dev/versions/latest/sdk/battery/)
- [Expo Brightness Documentation](https://docs.expo.dev/versions/latest/sdk/brightness/)

---

**Good luck building with Expo APIs!** 📱🚀