import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState, useEffect } from "react";
import colors from "../../constants/colors";
import useColorScheme from "../../hooks/useColorScheme";
import { RootTabParamList } from "../../types";
import { User } from "../../types/app";
import MainTabStackNavigator from "./MainStack";
import ProfileTabStackNavigator from "./ProfileStack";

const BottomTab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function getUser() {
      const newUser = await AsyncStorage.getItem("@user");
      if (newUser) {
        setUser(JSON.parse(newUser));
      }
    }
    if (user == null) {
      getUser();
    }
  });

  return (
    <BottomTab.Navigator
      initialRouteName="Main"
      screenOptions={{
        tabBarActiveTintColor: colors[colorScheme ?? "light"].tint,
      }}
    >
      <BottomTab.Screen
        name="Main"
        component={MainTabStackNavigator}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileTabStackNavigator}
      />
    </BottomTab.Navigator>
  );
}
