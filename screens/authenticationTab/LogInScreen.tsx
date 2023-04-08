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
import { useContext, useState } from "react";
import { AuthContext } from "../../constants/AuthContext";

export default function LogInScreen({
  navigation,
}: AuthStackScreenProps<"LogIn">) {
  const { signIn } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      await signIn({ username, password });
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll}>
        <KeyboardAvoidingView style={styles.contain} behavior="padding">
          <StatusBar barStyle="light-content" backgroundColor="#000000" />

          <Image
            source={require("../../assets/splash.png")}
            style={styles.image}
          />
          <View style={styles.welcomeText}>
            <Text style={styles.textOne}>Welcome</Text>
            <Text style={styles.textTwo}>Good to see you again!</Text>
          </View>
          <View style={styles.login_filed}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#DCDCDC"
              autoCapitalize="none"
              keyboardType="email-address"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#DCDCDC"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <View style={styles.fix}>
              <TouchableOpacity
                onPress={() => navigation.push("ForgotPassword")}
                style={styles.link}
              >
                <Text style={styles.linkText}>You forgot password?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <View style={styles.fix}>
              <Text style={styles.textColor}>You dont have an Account?</Text>
              <TouchableOpacity
                onPress={() => navigation.push("Register")}
                style={styles.link}
              >
                <Text style={styles.linkText}>Sign Up!</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.LogInForms}>
            <TouchableOpacity style={styles.auth}>
              <Text style={styles.textLogIn}>
                <Feather name="facebook" size={28} color="blue" /> Log In with
                Facebook
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.auth}>
              <Text style={styles.textLogIn}>
                <AntDesign name="google" size={28} color="red" /> {"  "}Log In
                with Google
              </Text>
            </TouchableOpacity>
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
    backgroundColor: "#151515",
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
  welcomeText: {
    marginTop: -50,
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "transparent",
    paddingBottom: 20,
  },
  textOne: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  textTwo: {
    fontSize: 17,
    textAlign: "center",
  },
  image: {
    marginTop: 10,
    width: 200,
    height: 200,
    resizeMode: "cover",
  },
  login_filed: {
    width: "70%",
    height: "auto",
    marginTop: 0,
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
    borderColor: "#7a7a7a",
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
    marginTop: 5,
    width: "100%",
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
    width: "100%",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 19,
    paddingHorizontal: 30,
    paddingVertical: 10,
    color: "#DCDCDC",
    backgroundColor: "transparent",
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#7a7a7a",
  },
  auth: {
    width: "80%",
  },
});
