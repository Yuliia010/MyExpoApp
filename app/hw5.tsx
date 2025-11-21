import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function FlashlightControl() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isFlashlightOn, setIsFlashlightOn] = useState(false);

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Завантаження...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Потрібен дозвіл на доступ до камери</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Надати дозвіл</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleFlashlight = () => setIsFlashlightOn(!isFlashlightOn);

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.hiddenCamera}
        facing="back"
        enableTorch={isFlashlightOn}
      />

      <Text style={styles.statusText}>
        Ліхтарик: {isFlashlightOn ? "УВІМК." : "ВИМК."}
      </Text>

      <TouchableOpacity
        style={[
          styles.button,
          isFlashlightOn ? styles.buttonOn : styles.buttonOff,
        ]}
        onPress={toggleFlashlight}
      >
        <Text style={styles.buttonText}>
          {isFlashlightOn ? "ВИМКНУТИ" : "УВІМКНУТИ"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  hiddenCamera: { width: 1, height: 1, opacity: 0, position: "absolute" },
  text: { color: "#fff", fontSize: 18, marginBottom: 20 },
  statusText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
  },
  button: {
    padding: 15,
    borderRadius: 25,
    minWidth: 150,
    alignItems: "center",
  },
  buttonOff: { backgroundColor: "#4CAF50" },
  buttonOn: { backgroundColor: "#f44336" },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
