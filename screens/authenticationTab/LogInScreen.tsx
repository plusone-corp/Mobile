import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  Image,
} from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";
import { Text, View } from "../../components/components/themed";
import { AuthStackScreenProps } from "../../types";
import { useContext } from "react";
import { AuthContext } from "../../constants/AuthContext";

export default function LogInScreen({
  navigation,
}: AuthStackScreenProps<"LogIn">) {
  const { signIn } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll}>
        <KeyboardAvoidingView style={styles.contain} behavior="padding">
          <StatusBar barStyle="light-content" backgroundColor="#000000" />

          <Image
            source={require("../../assets/splash.png")}
            style={styles.image}
          />
          <View style={styles.login_filed}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#fff"
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#fff"
              secureTextEntry
            />

            <View style={styles.fix}>
              <TouchableOpacity
                onPress={() => navigation.push("ForgotPassword")}
                style={styles.link}
              >
                <Text style={styles.linkText}>You forgot password?</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.fix}>
              <Text style={styles.textColor}>You dont have an Account?</Text>
              <TouchableOpacity
                onPress={() => navigation.push("Register")}
                style={styles.link}
              >
                <Text style={styles.linkText}>Sign Up!</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => signIn({ username: "admin", password: "admin" })}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.LogInForms}>
            <Text style={styles.textLogIn}>
              Log In with Facebook{" "}
              <Feather name="facebook" size={28} color="blue" />
            </Text>
            <Text style={styles.textLogIn}>
              Log In with Google{"    "}
              <AntDesign name="google" size={28} color="red" />
            </Text>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#050816",
  },
  contain: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scroll: {
    width: "100%",
    height: "auto",
  },
  image: {
    marginTop: 30,
    width: 200,
    height: 200,
    resizeMode: "cover",
  },
  login_filed: {
    width: "70%",
    height: "auto",
    marginTop: -30,
    padding: 10,
    alignItems: "flex-end",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 15,
    borderColor: "#fff",
    color: "#fff",
  },
  textColor: {
    color: "#fff",
    fontSize: 15,
  },
  fix: {
    width: "100%",
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
    backgroundColor: "transparent",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  link: {
    paddingVertical: 10,
    backgroundColor: "transparent",
    marginBottom: 0,
  },
  linkText: {
    fontSize: 16,
    color: "#2e78b7",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  LogInForms: {
    backgroundColor: "transparent",
    gap: 10,
    marginTop: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  textLogIn: {
    width: "70%",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 19,
    paddingHorizontal: 30,
    paddingVertical: 10,
    color: "#eee",
    backgroundColor: "transparent",
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#fff",
  },
});
