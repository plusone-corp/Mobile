import { StyleSheet, TouchableOpacity } from "react-native";
import { useContext, useEffect, useState } from "react";
import { Text, View } from "../../../components/components/themed";
import { MainStackScreenProps } from "../../../types";
import { AuthContext } from "../../../constants/AuthContext";
import * as SecureStore from "expo-secure-store";

export default function MainScreenMainTabScreen({
  navigation,
}: MainStackScreenProps<"MainScreen">) {
  const { signOut } = useContext(AuthContext);
  const [user, setUser] = useState<any>();

  useEffect(() => {
    async function getUser() {
      const userStr = await SecureStore.getItemAsync("user")
      const userObj = JSON.parse(userStr ?? "{}")

      console.log(userObj)

      setUser(userObj)
    }

    if(!user) getUser()
  }, [user, setUser]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user?.displayName}</Text>
      <TouchableOpacity
        onPress={() => navigation.push("DiscoveryScreen")}
        style={styles.link}
      >
        <Text style={styles.linkText}>Go to discovery screen!</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Root", {
            screen: "Profile",
          })
        }
        style={styles.link}
      >
        <Text style={styles.linkText}>Go to profile tab!</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => signOut()} style={styles.link}>
        <Text style={styles.linkText}>LogOut</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
