import React, { useRef, useState } from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

export default function App() {
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
  container: { flex: 1, padding: 12, gap: 12, backgroundColor: "#fff", marginBottom: 20 },
  camera: { flex: 1, borderRadius: 8, overflow: "hidden" },
  preview: { width: "100%", aspectRatio: 3 / 4, borderRadius: 8 },
  row: { flexDirection: "row", justifyContent: "space-around", gap: 12 },
  uri: { fontSize: 12, color: "#555" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});