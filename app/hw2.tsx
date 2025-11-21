import { useState } from "react";
import { View, StyleSheet, Button } from "react-native";

export default function Home() {
  const [activeLight, setActiveLight] = useState(0);

  const changeLight = () => {
    setActiveLight((activeLight + 1) % 3);
  };

  return (
    <View style={styles.container}>
      <View style={styles.trafficLight}>
        <View style={[styles.light, activeLight === 0 && styles.red]} />
        <View style={[styles.light, activeLight === 1 && styles.yellow]} />
        <View style={[styles.light, activeLight === 2 && styles.green]} />
      </View>

      <Button title="Змінити" onPress={changeLight} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  trafficLight: {
    width: 120,
    height: 300,
    backgroundColor: "#555",
    borderRadius: 20,
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 50,
  },

  light: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: "gray",
    opacity: 0.3,
  },
  red: {
    backgroundColor: "red",
    opacity: 1,
  },
  yellow: {
    backgroundColor: "yellow",
    opacity: 1,
  },
  green: {
    backgroundColor: "green",
    opacity: 1,
  },
});
