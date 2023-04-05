import { useState } from "react";
import { StyleSheet } from "react-native";
import { Image, TouchableOpacity, ScrollView } from "react-native";

import { Text, View } from "../../../components/components/themed";
import { ProfileStackScreenProps } from "../../../types";
import { Entypo } from "@expo/vector-icons";

export default function MainScreenProfileTabScreen({
  navigation,
}: ProfileStackScreenProps<"MainScreen">) {
  const icon = require("../../../assets/icon.png");

  const [inviteText, setInviteText] = useState("Invite +");
  const [friendText, setFriendText] = useState("Add Friend");

  const handleInviteClick = () => {
    setInviteText(inviteText === "Invite +" ? "Invited" : "Invite +");
  };

  const handleFriendClick = () => {
    setFriendText(friendText === "Add Friend" ? "Unfriend" : "Add Friend");
  };

  const [showFirstDiv, setShowFirstDiv] = useState(true);
  const [showSecondDiv, setShowSecondDiv] = useState(false);

  const toggleFirstDiv = () => {
    setShowFirstDiv(true);
    setShowSecondDiv(false);
  };

  const toggleSecondDiv = () => {
    setShowFirstDiv(false);
    setShowSecondDiv(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View style={styles.profile}>
          <View style={styles.profileName}>
            <Image source={icon} style={styles.img} />
            <View style={styles.BadgeName}>
              <Text style={styles.displayname}>displayname</Text>
              <View style={styles.badgeView}>
                {/* ill put an map function here for the badges  */}
                <Image source={icon} style={styles.badge} />
              </View>
            </View>
          </View>
          <View style={styles.friends}>
            <Text style={styles.fontChange}>100</Text>
            <Text style={styles.fontChange}>Friends</Text>
          </View>
        </View>

        <View style={styles.UserInfo}>
          <Text style={styles.Info}>Location: England</Text>
          <Text style={styles.Info}>Age: 19</Text>
          <Text style={styles.Info}>
            Hi im Bes and im here to have some fun if someone has a party i'll
            be the right to invite
          </Text>
        </View>

        <View style={styles.profileButtons}>
          <View style={styles.Buttons}>
            <TouchableOpacity onPress={handleInviteClick}>
              <Text style={styles.color}>{inviteText}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.Buttons}>
            <TouchableOpacity onPress={handleFriendClick}>
              <Text style={styles.color}>{friendText}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.postsButtons}>
          <TouchableOpacity onPress={toggleFirstDiv}>
            <Text
              style={{
                textAlign: "center",
                paddingVertical: 15,
                color: showFirstDiv ? "#fff" : "#c5c5c5",
                borderBottomColor: showFirstDiv ? "#fff" : "transparent",
                borderBottomWidth: 2,
                paddingHorizontal: 30,
              }}
            >
              <Entypo name="menu" size={35} color="white" />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleSecondDiv}>
            <Text
              style={{
                textAlign: "center",
                paddingVertical: 15,
                color: showSecondDiv ? "#fff" : "#c5c5c5",
                borderBottomColor: showSecondDiv ? "#fff" : "transparent",
                borderBottomWidth: 2,
                paddingHorizontal: 30,
              }}
            >
              <Entypo name="grid" size={35} color="white" />
            </Text>
          </TouchableOpacity>
        </View>
        {showFirstDiv && (
          <View style={styles.firstView}>
            <Text>Hello</Text>
          </View>
        )}
        {showSecondDiv && (
          <View style={styles.secondView}>
            <Text>Hello Again</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingTop: 20,
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  badge: {
    width: 20,
    height: 20,
    borderRadius: 50,
  },
  profile: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingRight: 40,
  },
  profileName: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  BadgeName: {
    flexDirection: "column",
    gap: 5,
    padding: 5,
  },
  displayname: {
    fontSize: 22,
    fontWeight: "bold",
  },
  badgeView: {
    flexDirection: "row",
    gap: 1,
  },
  friends: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  fontChange: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profileButtons: {
    marginTop: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  Buttons: {
    padding: 10,
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 11,
  },
  color: {
    color: "#151515",
    textAlign: "center",
  },
  UserInfo: {
    paddingHorizontal: 20,
    marginVertical: 30,
    flexDirection: "column",
    gap: 5,
    width: "90%",
  },
  Info: {
    color: "#efefef",
  },
  scroll: {
    paddingTop: 10,
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
  },
  postsButtons: {
    paddingTop: 30,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    borderBottomWidth: 2,
    borderBottomColor: "#c5c5c5",
  },
  firstView: {
    height: 20,
    marginTop: 30,
  },
  secondView: {
    height: 20,
    marginTop: 30,
  },
});
