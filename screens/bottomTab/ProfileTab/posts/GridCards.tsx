import { View, Text } from "../../../../components/components/themed";
import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity } from "react-native";
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

export default function GridCards() {
  return (
    <View style={styles.container}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  cardsContainer: {
    width: "45%",
    height: "auto",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: "#fff",
  },
  partyImage: {
    position: "relative",
    width: "100%",
    aspectRatio: 1 / 1.2,
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
    bottom: 7,
    right: 7,
    zIndex: 3,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: "transparent",
  },
  buttonsParty: {
    fontSize: 7,
    padding: 7,
    backgroundColor: "white",
    color: "#000",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
    alignItems: "center",
    textAlign: "center",
  },
  align: {
    paddingHorizontal: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    paddingVertical: 10,
    paddingRight: 8,
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
    paddingHorizontal: 4,
    paddingRight: 7,
    paddingVertical: 3,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderColor: "#000",
    borderRadius: 10,
    backgroundColor: "transparent",
    borderWidth: 1,
  },
  partyName: {
    fontSize: 12,
    color: "#000",
    fontWeight: "bold",
    flexWrap: "wrap",
    maxWidth: "70%",
  },
  partyTitle: {
    paddingVertical: 4,
    fontSize: 15,
    fontWeight: "bold",
    color: "#000",
    flexWrap: "wrap",
  },
  partyDescription: {
    display: "none",
  },
  moreInfo: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "transparent",
    padding: 4,
  },
  partyTime: {
    display: "none",
  },
  partyDate: {
    fontSize: 11,
    fontStyle: "italic",
    fontWeight: "400",
    textAlign: "right",
    color: "#000",
  },
});
