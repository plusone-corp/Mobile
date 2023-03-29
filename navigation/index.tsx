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
import * as SplashScreen from "expo-splash-screen";

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
        case "SIGN_UP":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          }
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  const DEF_DELAY = 1000;

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms || DEF_DELAY));
  }
  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken: string | null = null;

      try {
        userToken = await SecureStore.getItemAsync("userToken");
        await sleep(2000);
        console.log(userToken);
      } catch (e) {
        console.log(e);
        userToken = null;
      } finally {
        dispatch({
          type: "RESTORE_TOKEN",
          token: userToken,
        });
      }
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (data: LogIn) => {
        try {
          const response = await fetch("https://api.txzje.xyz/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });

          if (!response.ok) {
            throw new Error("Invalid credentials");
          }

          const token = await response.json();

          await SecureStore.setItemAsync("token", token.token);

          dispatch({ type: "SIGN_IN", token });
        } catch (error) {
          console.error(error);
        }
      },
      signOut: async () => {
        try {
          const response = await fetch("https://api.txzje.xyz/auth/logout", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authentication": `Bearer ${state.token}`
            },
          });

          if (!response.ok) {
            throw new Error("Failed to logout");
          }
          
          await SecureStore.setItemAsync("token", "");

          dispatch({ type: "SIGN_OUT" })
        } catch (error) {
          console.error(error);
        }
      },
      signUp: async (data: any) => {
        // Register
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
        {state.isLoading ? (
          <Stack.Screen name="Splash" component={Splash} />
        ) : state.userToken != null ? (
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
            <Stack.Group
              screenOptions={{ presentation: "modal", headerShown: true }}
            >
              <Stack.Screen name="Setting" component={SettingModal} />
            </Stack.Group>
          </>
        ) : (
          <Stack.Screen
            name="Authentication"
            component={AuthStackNavigator}
            options={{ header: () => null }}
          />
        )}
      </Stack.Navigator>
    </AuthContext.Provider>
  );
}
