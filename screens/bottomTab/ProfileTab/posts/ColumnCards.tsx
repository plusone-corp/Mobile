import { View, Text } from "../../../../components/components/themed";
import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Skill {
  name: string;
  description: string;
  img: string;
}
const skills: Skill[] = [
  {
    name: "Chilling",
    description: "A JavaScript library for building user interfaces.",
    img: "https://cdn.discordapp.com/attachments/979617962728226826/1093945331214987314/image.png",
  },
  {
    name: "For Walk",
    description:
      "A React framework for building server-side rendered and statically generated web applications.",
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
                <Text style={styles.partyTitle}>{skill.name}</Text>
                <Text style={styles.partyDescription}>{skill.description}</Text>
              </View>
              <View style={styles.moreInfo}>
                <Text style={styles.partyTime}>12:99 PM</Text>
                <Text style={styles.partyDate}>03/22/23</Text>
                <TouchableOpacity
                  style={{
                    marginTop: "auto",
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
    borderRadius: 10,
    marginTop: 40,
    backgroundColor: "#fff",
  },
  partyImage: {
    position: "relative",
    width: "100%",
    aspectRatio: 1 / 0.8,
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  Img: {
    width: "100%",
    height: "100%",
    contentFit: "cover",
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
    padding: 10,
    backgroundColor: "white",
    color: "#000",
    borderRadius: 10,
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
    contentFit: "cover",
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
