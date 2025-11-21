import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Animated,
  Pressable,
} from "react-native";

type Character = {
  id: string;
  name: string;
  image: any;
};

const characters: Character[] = [
  { id: "1", name: "Герой", image: require("../assets/images/hw3/hero.jpg") },
  {
    id: "2",
    name: "Чаклун",
    image: require("../assets/images/hw3/чаклун.jpg"),
  },
  { id: "3", name: "Воїн", image: require("../assets/images/hw3/воїн.jpg") },
  {
    id: "4",
    name: "Лучник",
    image: require("../assets/images/hw3/лучник.jpg"),
  },
  { id: "5", name: "Друїд", image: require("../assets/images/hw3/друїд.jpg") },
];

const CharacterCard = ({
  character,
  index,
  numColumns,
}: {
  character: Character;
  index: number;
  numColumns: number;
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      delay: index * 100,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.card,
        {
          opacity: fadeAnim,
          flex: numColumns === 1 ? 1 : 0.5,
          flexDirection: numColumns === 1 ? "row" : "column",
          alignItems: numColumns === 1 ? "center" : "center",
        },
      ]}
    >
      <Image
        source={character.image}
        style={[
          styles.image,
          numColumns === 1 && { width: 60, height: 60, marginRight: 10 },
        ]}
      />
      <Text style={styles.name}>{character.name}</Text>
    </Animated.View>
  );
};

export default function HW3() {
  const [numColumns, setNumColumns] = useState(2);

  const toggleLayout = () => {
    setNumColumns(numColumns === 2 ? 1 : 2);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={toggleLayout}>
        <Text style={styles.buttonText}>
          {numColumns === 2 ? "Відобразити списком" : "Відобразити сіткою"}
        </Text>
      </Pressable>

      <FlatList
        data={characters}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <CharacterCard
            character={item}
            index={index}
            numColumns={numColumns}
          />
        )}
        numColumns={numColumns}
        key={numColumns}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "#fff",
    margin: 5,
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 10,
    borderRadius: 40,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    marginBottom: 10,
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
