import { View, Text } from "../../../../components/components/themed";
import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Skill {
  name: string;
  title: string;
  description: string;
  img: string;
}
const skills: Skill[] = [
  {
    name: "admin",
    title: "Chilling",
    description:
      "Color codes are ways of representing the colors we see everyday in a format that a computer can interpret and display. Commonly used in websites and other software applications",
    img: "https://cdn.discordapp.com/attachments/979617962728226826/1093945331214987314/image.png",
  },
];
export default function ColumnCards() {
  return (
    <ScrollView style={styles.container}>
      <View>
        {skills.map((skill) => (
          <View style={styles.cardsContainer} key={skill.name}>
            <View style={styles.partyImage}>
              <Image
                style={styles.Img}
                source={{
                  uri: skill.img,
                }}
              />
              <View style={styles.ButtonsDir}>
                <TouchableOpacity style={styles.buttonsParty}>
                  <Text>❤️</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonsParty}>
                  <Text>😍</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonsParty}>
                  <Text>😂</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.align}>
              <View style={styles.partyInfo}>
                <View style={styles.dir}>
                  <Image
                    style={styles.Imge}
                    source={{
                      uri: skill.img,
                    }}
                  />
                  <Text style={styles.partyName}>{skill.name}</Text>
                </View>
                <Text style={styles.partyTitle}>{skill.title}</Text>
                <Text style={styles.partyDescription}>{skill.description}</Text>
              </View>
              <View style={styles.moreInfo}>
                <Text style={styles.partyTime}>12:99 PM</Text>
                <Text style={styles.partyDate}>03/22/23</Text>
                <TouchableOpacity
                  style={{
                    alignSelf: "flex-end",
                    paddingTop: 20,
                  }}
                >
                  <Text>
                    <Ionicons name="ios-chatbox" size={25} color="black" />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
      <View style={styles.comments}>
        <View>
          <Text>Comments</Text>
          <Text>34</Text>
        </View>
      </View>
      <View>
        {skills.map((skill) => (
          <View key={skill.name}>
            <Image
              source={{
                uri: skill.img,
              }}
            />
            <View>
              <Text>{skill.description}</Text>
              <View>
                <View>
                  <Text>Like</Text>
                  <Text>Like</Text>
                  <Text>Like</Text>
                </View>
                <View>
                  <Text>Created at: 12/02/23</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    width: "100%",
  },
  cardsContainer: {
    width: "100%",
    height: "auto",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  partyImage: {
    position: "relative",
    width: "100%",
    aspectRatio: 1 / 1,
  },
  Img: {
    width: "100%",
    height: "100%",
    contentFit: "cover",
  },
  ButtonsDir: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 5,
    backgroundColor: "transparent",
    paddingRight: 10,
    paddingTop: 20,
  },
  buttonsParty: {
    fontSize: 20,
    padding: 15,
    backgroundColor: "#fff",
    color: "#000",
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#7a7a7a",
    alignItems: "center",
    textAlign: "center",
  },
  align: {
    paddingHorizontal: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    marginTop: 105,
  },
  partyInfo: {
    width: "70%",
    height: "auto",
    paddingHorizontal: 4,
    paddingVertical: 20,
    backgroundColor: "transparent",
  },
  Imge: {
    width: 40,
    height: 40,
    borderRadius: 50,
    contentFit: "cover",
    borderWidth: 1,
    borderColor: "#000",
  },
  dir: {
    alignSelf: "flex-start",
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 15,
    paddingVertical: 7,
    justifyContent: "flex-start",
    alignItems: "center",
    borderColor: "#000",
    borderRadius: 15,
    backgroundColor: "transparent",
    borderWidth: 1,
    marginTop: -85,
    left: -1,
    position: "absolute",
  },
  partyName: {
    fontSize: 20,
    color: "#000",
    fontWeight: "600",
  },
  partyTitle: {
    paddingVertical: 4,
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginTop: -20,
  },
  partyDescription: {
    fontSize: 15,
    color: "#7a7a7a",
    fontWeight: "500",
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
    fontSize: 14,
    fontStyle: "italic",
    fontWeight: "500",
    textAlign: "right",
    color: "#7a7a7a",
  },
  partyDate: {
    fontSize: 14,
    fontStyle: "italic",
    fontWeight: "500",
    textAlign: "right",
    color: "#7a7a7a",
  },
  partyLocation: {
    fontSize: 13,
    fontStyle: "italic",
    color: "#000",
    textAlign: "right",
    fontWeight: "500",
  },
  comments: {
    backgroundColor: "#fff",
    color: "#000",
    paddingTop: 100,
  },
});
