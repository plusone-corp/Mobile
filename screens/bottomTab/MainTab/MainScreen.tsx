import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../constants/AuthContext";
import * as SecureStore from "expo-secure-store";
import {
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import { Text, View } from "../../../components/components/themed";
import { MainStackScreenProps } from "../../../types";
import { Entypo, AntDesign, Ionicons } from "@expo/vector-icons";
import { Post, User } from "../../../types/app";
import axios, { AxiosError } from "axios";

export default function MainScreenMainTabScreen({
  navigation,
}: MainStackScreenProps<"MainScreen">) {
  const [user, setUser] = useState<User>();
  const [post, setPost] = useState<Post>();
  const [createdAtDate, setDate] = useState<Date>();
  const { signOut, refreshToken } = useContext(AuthContext);
  const [isLiked, setIsLiked] = useState(false);

  const handlePress = () => {
    setIsLiked(!isLiked);
  };

  console.log("Rendered");

  useEffect(() => {
    async function getUser() {
      const userStr = await SecureStore.getItemAsync("user");
      const userObj = JSON.parse(userStr ?? "{}");

      setUser(userObj);
    }

    async function getLatestPost() {
      const token = await SecureStore.getItemAsync("token");
      axios
        .get("https://api.txzje.xyz/users/@me/post/latest", {
          headers: {
            "X-Token": `${token}`,
          },
        })
        .then((response) => {
          setPost(response.data.post);
          setDate(new Date(response.data.post.createdAt));
        })
        .catch((error: AxiosError) => {
          console.log(error);
          if (error.response?.status == 408) {
            refreshToken().then((res: boolean) => {
              if (!res) {
                navigation.navigate("Authentication");
              }
              getLatestPost();
            });
          } else if (error.response?.status == 500) {
            console.log("Not found");
          }
        });
    }

    if (!user) getUser();
    if (!post) getLatestPost();
  }, [user, setUser, post, setPost]);

  if (!user || !post) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>There are no posts on this user</Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View style={styles.buttons}>
        <Text style={styles.title}>Main screen</Text>
        <TouchableOpacity onPress={() => navigation.push("DiscoveryScreen")}>
          <Text style={styles.linkText}>Discovery</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scroll}>
        <View style={styles.cardsContainer}>
          <View style={styles.partyImage}>
            <Image
              style={styles.Img}
              source={{
                uri: post.image,
              }}
            />
            <View style={styles.ButtonsDir}>
              <TouchableOpacity onPress={handlePress}>
                <Text style={styles.buttonsParty}>
                  <AntDesign
                    name="heart"
                    size={19}
                    color={isLiked ? "red" : "black"}
                  />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.buttonsParty}>+1</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.buttonsParty}>
                  <Entypo name="emoji-sad" size={19} color="black" />
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
                    uri: user.avatar,
                  }}
                />
                <Text style={styles.partyName}>{user.displayName}</Text>
              </View>
              <Text style={styles.partyTitle}>{post.title}</Text>
              <Text style={styles.partyDescription}>{post.description}</Text>
            </View>
            <View style={styles.moreInfo}>
              <Text style={styles.partyTime}>
                {createdAtDate?.toTimeString().split(" ")[0]}
              </Text>
              <Text style={styles.partyDate}>
                {createdAtDate?.toDateString()}
              </Text>
              <TouchableOpacity>
                <Text>
                  <Ionicons name="ios-chatbox" size={25} color="black" />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  scroll: {
    flexDirection: "column",
    width: "100%",
    paddingHorizontal: 30,
    borderColor: "#fff",
    marginBottom: 10,
    backgroundColor: "transparent",
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
    width: "100%",
    height: "auto",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 40,
    backgroundColor: "#fff",
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
    zIndex: 3,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: "transparent",
  },
  buttonsParty: {
    fontSize: 15,
    backgroundColor: "#fff",
    padding: 10,
    color: "#000",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#000",
    alignItems: "center",
    textAlign: "center",
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
    paddingHorizontal: 7,
    paddingVertical: 3,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderColor: "#000",
    borderRadius: 20,
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
    paddingVertical: 5,
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
    textAlign: "right",
    color: "#000",
  },
  partyDate: {
    fontSize: 11,
    fontStyle: "italic",
    fontWeight: "400",
    textAlign: "right",
    color: "#000",
  },
  partyLocation: {
    fontSize: 13,
    fontStyle: "italic",
    color: "#000",
    textAlign: "right",
    fontWeight: "400",
  },
});
