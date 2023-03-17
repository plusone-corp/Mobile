import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ColorSchemeName } from "react-native/types";
import { RootStackParamList } from "../types";
import LinkingConfig from "./Configs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomTabNavigator from "./BottomTab/BottomTab";
import NotFoundScreen from "../screens/root/NotFoundScreen";
import SettingModal from "../screens/root/SettingModal";
import LogInScreen from "../screens/root/LogInScreen";
export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfig}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const [loggedIn, setLoggedIn] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem("loggedIn").then((value) => {
      setLoggedIn(value ?? "");
    });
  });

  console.log(loggedIn, loggedIn === "0" ? "Root" : "LogIn")

  if (typeof loggedIn === "string") {
    return (
      <Stack.Navigator initialRouteName={loggedIn && loggedIn === "0" ? "Root" : "LogIn"}>
        <Stack.Screen
          name="Root"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NotFound"
          component={NotFoundScreen}
          options={{ title: "Oops!" }}
        />
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen name="Setting" component={SettingModal} />
        </Stack.Group>
        <Stack.Screen
          name="LogIn"
          component={LogInScreen}
          options={{ header: () => null }}
        />
      </Stack.Navigator>
    );
  } else {
    return null;
  }
}
