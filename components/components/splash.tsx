import { Text, View } from "./themed";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";

export default function Splash() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/adaptive-icon.png")}
        placeholder={"Adadptive icon"}
        contentFit="contain"
      />
      <Text style={styles.text}>Getting ready...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 2,
    width: "60%",
  },
  text: {
    flex: 1,
    fontSize: 20,
    fontWeight: "600",
  },
});
