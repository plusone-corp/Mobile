import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../constants/AuthContext";
import * as SecureStore from "expo-secure-store";
import {
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Image,
} from "react-native";
import { Text, View } from "../../../components/components/themed";
import { MainStackScreenProps } from "../../../types";
import { Entypo, AntDesign, Ionicons } from "@expo/vector-icons";

export default function MainScreenMainTabScreen({
  navigation,
}: MainStackScreenProps<"MainScreen">) {
  const { signOut } = useContext(AuthContext);
  const [user, setUser] = useState<any>();

  useEffect(() => {
    async function getUser() {
      const userStr = await SecureStore.getItemAsync("user");
      const userObj = JSON.parse(userStr ?? "{}");

      console.log(userObj);

      setUser(userObj);
    }

    if (!user) getUser();
  }, [user, setUser]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View style={styles.buttons}>
        <Text style={styles.title}>Main screen</Text>
        <TouchableOpacity onPress={() => navigation.push("DiscoveryScreen")}>
          <Text style={styles.linkText}>Discovery</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        <View style={styles.partyImage}>
          <Image
            style={styles.Img}
            source={{
              uri: "https://cdn.discordapp.com/attachments/979617962728226826/1090887889799352320/DALLE_2023-03-30_02.34.47_-_neon_squirrel_high_detail_digital_art_ambient_lighting_trending_on_artstation.png",
            }}
          />
          <View style={styles.ButtonsDir}>
            <TouchableOpacity>
              <Text>
                <AntDesign name="heart" size={19} color="white" />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.buttonsParty}>+1</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>
                <Entypo name="emoji-sad" size={19} color="white" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.align}>
          <View style={styles.partyInfo}>
            <View style={styles.dir}>
              <Image
                style={styles.Imge}
                source={{
                  uri: "https://cdn.discordapp.com/attachments/979617962728226826/1091050191093764106/OIG_51.jpg",
                }}
              />
              <Text style={styles.partyName}>Name</Text>
            </View>
            <Text style={styles.partyTitle}>Title</Text>
            <Text style={styles.partyDescription}>
              Description [ limit to 20-30 words ]
            </Text>
          </View>
          <View style={styles.moreInfo}>
            <Text style={styles.partyTime}>10:99 PM</Text>
            <Text style={styles.partyDate}>03/22/23</Text>
            <Text style={styles.partyLocation}>Location</Text>
            <TouchableOpacity>
              <Text>
                <Ionicons name="ios-chatbox" size={25} color="black" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  buttons: {
    width: "100%",
    backgroundColor: "transparent",
    padding: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 50,
    borderBottomWidth: 2,
    borderBottomColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  linkText: {
    fontSize: 14,
    backgroundColor: "#2e78b7",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  cardsContainer: {
    width: "80%",
    height: "auto",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderColor: "#fff",
    borderRadius: 10,
    marginTop: 30,
    backgroundColor: "#fff",
    shadowColor: "#fff",
    elevation: 18,
  },
  partyImage: {
    position: "relative",
    width: "100%",
    aspectRatio: 1 / 0.8,
    borderRadius: 10,
  },
  Img: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    resizeMode: "cover",
  },
  ButtonsDir: {
    position: "absolute",
    bottom: 10,
    right: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
    backgroundColor: "transparent",
  },
  buttonsParty: {
    fontSize: 19,
  },
  align: {
    paddingHorizontal: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    marginTop: 15,
  },
  partyInfo: {
    width: "70%",
    height: "auto",
    paddingHorizontal: 4,
    paddingVertical: 8,
    color: "#000",
    backgroundColor: "transparent",
  },
  Imge: {
    width: 20,
    height: 20,
    borderRadius: 50,
    resizeMode: "cover",
    borderWidth: 1,
    borderColor: "#000",
  },
  dir: {
    alignSelf: "flex-start",
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderColor: "#000",
    borderRadius: 10,
    backgroundColor: "transparent",
    borderWidth: 1,
  },
  partyName: {
    fontSize: 13,
    color: "#000",
    fontWeight: "600",
  },
  partyTitle: {
    paddingVertical: 4,
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  partyDescription: {
    fontSize: 13,
    color: "#000",
    fontWeight: "300",
  },
  moreInfo: {
    width: "30%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    borderColor: "#fff",
    borderWidth: 2,
    backgroundColor: "transparent",
    padding: 4,
  },
  partyTime: {
    fontSize: 13,
    fontStyle: "italic",
    fontWeight: "400",
    color: "#000",
  },
  partyDate: {
    fontSize: 13,
    fontStyle: "italic",
    fontWeight: "400",
    color: "#000",
  },
  partyLocation: {
    fontSize: 13,
    fontStyle: "italic",
    color: "#000",
    fontWeight: "400",
  },
});
