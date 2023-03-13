import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";

export default function App() {
  const logo = require("./assets/logo.png");
  const google = require("./assets/google.png");
  const facebook = require("./assets/Facebook-logo.png");
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.nice}>
        <Image source={logo} style={styles.img} />
        <Text style={styles.text}>Choose your login form</Text>
      </View>
      <View style={styles.signUp}>
        <Text style={styles.buttons}>
          Sign in with Google <Image source={google} style={styles.logoImg} />
        </Text>
        <Text style={styles.buttons}>
          Sign in with Facebook{" "}
          <Image source={facebook} style={styles.logoImg} />
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dddddd",
    gap: 100,
  },
  nice: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 70,
    width: "100%",
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
  },
  img: {
    width: 100,
    height: 100,
  },

  logoImg: {
    width: 20,
    height: 20,
  },

  signUp: {
    marginTop: 30,
    gap: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  buttons: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    fontSize: 16,
    fontWeight: "bold",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
