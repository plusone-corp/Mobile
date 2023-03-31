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
import { Post, User } from "../../../types/app";
import axios, { AxiosError } from "axios";

export default function MainScreenMainTabScreen({
  navigation,
}: MainStackScreenProps<"MainScreen">) {
  const [user, setUser] = useState<User>();
  const [post, setPost] = useState<Post>();
  const [createdAtDate, setDate] = useState<Date>()
  const { signOut, refreshToken } = useContext(AuthContext)

  useEffect(() => {
    async function getUser() {
      const userStr = await SecureStore.getItemAsync("user");
      const userObj = JSON.parse(userStr ?? "{}");

      setUser(userObj);
    }

    async function getLatestPost() {
      const token = await SecureStore.getItemAsync("token")
      axios
      .get("https://api.txzje.xyz/users/@me/post/latest", {
        headers: {
          'X-Token': `${token}`,
        },
      })
      .then((response) => {
        setPost(response.data.post)
        setDate(new Date(response.data.post.createdAt))
      })
      .catch((error: AxiosError) => {
        if(error.response?.status == 408) {
          refreshToken().then((res: boolean )=> {
            if(!res) {
              navigation.navigate("Authentication")
            }
            getLatestPost()
          })
        }
        SecureStore.setItemAsync("token", "").then(() => {
          signOut()
        })
      });
    }

    if (!user) getUser();
    if (!post) getLatestPost();
  }, [user, setUser, post, setPost]);

  if (!user || !post) {
    return null
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
      <View style={styles.cardsContainer}>
        <View style={styles.partyImage}>
          <Image
            style={styles.Img}
            source={{
              uri: post.image,
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
                  uri: user.avatar,
                }}
              />
              <Text style={styles.partyName}>{user.displayName}</Text>
            </View>
            <Text style={styles.partyTitle}>{post.title}</Text>
            <Text style={styles.partyDescription}>
              {post.description}
            </Text>
          </View>
          <View style={styles.moreInfo}>
            <Text style={styles.partyTime}>{createdAtDate?.toTimeString().split(" ")[0]}</Text>
            <Text style={styles.partyDate}>{createdAtDate?.toDateString()}</Text>
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
