import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../../../components/components/themed';
import { MainTabScreenProps } from '../../../types';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MainScreenMainTabScreen({ navigation }: MainTabScreenProps<'MainScreen'>) {

  function logOut() {
    AsyncStorage.setItem("loggedIn", "0").then(() => {
      navigation.replace("DiscoveryScreen")
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is the Main screen of Main tab</Text>
      <TouchableOpacity onPress={() => navigation.replace("DiscoveryScreen")} style={styles.link}>
        <Text style={styles.linkText}>Go to discovery screen!</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Root", {
        screen: "Profile"
      })} style={styles.link}>
        <Text style={styles.linkText}>Go to profile tab!</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => logOut()} style={styles.link}>
        <Text style={styles.linkText}>LogOut</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});