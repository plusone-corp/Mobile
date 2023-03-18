import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useMemo, useReducer, useState } from "react";
import { ColorSchemeName } from "react-native/types";
import { RootStackParamList } from "../types";
import LinkingConfig from "./Configs";
import * as SecureStore from "expo-secure-store";
import BottomTabNavigator from "./BottomTab/BottomTab";
import NotFoundScreen from "../screens/root/NotFoundScreen";
import SettingModal from "../screens/root/SettingModal";
import AuthStackNavigator from "./Authentication/Authentication";
import Splash from "../components/components/splash";
import { LogIn } from "../types/forms";
import { AuthContext } from "../constants/AuthContext";
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
  const [state, dispatch] = useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: action.token,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken: string | null;

      try {
        userToken = await SecureStore.getItemAsync("userToken");
        console.log(userToken)
      } catch (e) {
        console.log(e)
        userToken = null;
      }

      dispatch({
        type: "RESTORE_TOKEN",
        token: userToken,
      });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (data: LogIn) => {
        // Call the api and then recieve a generated token from the server
        console.log(data)
        dispatch({ type: "SIGN_IN", token: "randomtoken2" });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async (data: any) => {
        // Call the api and then recieve a generated token from the server
        dispatch({ type: "SIGN_IN", token: "randomtoken3" });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {
          state.isLoading ? (
            <Stack.Screen name="Splash" component={Splash}/>
          ) : (state.userToken != null ? (
            <>
              <Stack.Screen
                name="Root"
                component={BottomTabNavigator}
                options={{ header: () => null }}
              />
              <Stack.Screen
                name="NotFound"
                component={NotFoundScreen}
                options={{ title: "Oops!" }}
              />
              <Stack.Group screenOptions={{ presentation: "modal", headerShown: true }}>
                <Stack.Screen name="Setting" component={SettingModal} />
              </Stack.Group>
            </>
          ) : (
            <Stack.Screen
              name="Authentication"
              component={AuthStackNavigator}
              options={{ header: () => null }}
            />
          ))
        }
      </Stack.Navigator>
    </AuthContext.Provider>
  );
}
