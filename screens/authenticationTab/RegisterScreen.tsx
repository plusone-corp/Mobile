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

export default function RegisterScreen({
  navigation,
}: AuthStackScreenProps<"Register">) {
  const { signUp } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  interface Errors {
    username: string;
    email: string;
    password: string;
    confirmPass: string;
  }
  const [errors, setErrors] = useState<Errors>({
    username: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  const validateForm = () => {
    let newErrors: Errors = {
      email: "",
      password: "",
      username: "",
      confirmPass: "",
    };
    let check = true;
    if (!email.includes("@")) {
      newErrors.email = "The email should be email@example.com";
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])/;
    if (!passwordRegex.test(password)) {
      newErrors.password =
        "The password should contain at least a capital letter and a number";
      check = false;
    }
    if (password !== confirmPass) {
      newErrors.confirmPass = "The confirm password doesn't match";
      check = false;
    }
    if (username.length < 6) {
      check = false;
      newErrors.username = "The username should be at least 6 characters long";
    }
    if (password.length < 8) {
      check = false;
      newErrors.password = "The password should be at least 8 characters long";
    }
    setErrors(newErrors);
    return check;
  };
  const handleSignUp = async () => {
    if (validateForm()) {
      try {
        const data = {
          username,
          email,
          password,
          navigate: navigation.navigate,
        };
        const error = await signUp(data);
        if (error) {
        }
      } catch (error: any) {
        alert(error.message);
      }
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
          <View style={styles.login_filed}>
            {errors.username && (
              <Text style={styles.error}>{errors.username}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#fff"
              autoCapitalize="none"
              keyboardType="default"
              value={username}
              onChangeText={setUsername}
            />
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#fff"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            {errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#fff"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            {errors.confirmPass && (
              <Text style={styles.error}>{errors.confirmPass}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#fff"
              secureTextEntry
              value={confirmPass}
              onChangeText={setConfirmPass}
            />

            <View style={styles.fix}>
              <Text style={styles.textColor}>You have an account?</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.canGoBack()
                    ? navigation.goBack()
                    : navigation.push("LogIn")
                }
                style={styles.link}
              >
                <Text style={styles.linkText}>Log In!</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.LogInForms}>
            <Text style={styles.textLogIn}>
              Sign Up with Facebook{" "}
              <Feather name="facebook" size={28} color="blue" />
            </Text>

            <Text style={styles.textLogIn}>
              Sign Up with Google{"    "}
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
    marginTop: 10,
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
    width: "85%",
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
  error: {
    color: "#ff0000",
    fontSize: 12,
    marginBottom: 10,
  },
});
