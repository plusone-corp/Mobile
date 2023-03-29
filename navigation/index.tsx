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
            token: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            token: action.token,
            isLoading: false,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            token: action.token,
          };
        case "SIGN_UP":
          return {
            ...prevState,
            isSignout: true,
            token: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      token: null,
    }
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let token: string | null = null;

      try {
        token = await SecureStore.getItemAsync("token");
      } catch (e) {
        token = null;
      } finally {
        dispatch({
          type: "RESTORE_TOKEN",
          token: token,
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
  
          await SecureStore.setItemAsync("token", "");

  
          dispatch({ type: "SIGN_IN", token });
        } catch (error) {
          console.error(error);
        }
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async (data: any) => {
        try {

          const { navigate, ...userData } = data

          const response = await fetch("https://api.txzje.xyz/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          });
  
          if (!response.ok) {
            throw new Error("Failed to create user");
          }
  
          const token = await response.json();
          
          if (token.status === 202) {
            navigate("Login")
          } else {
            // Error
          }

        } catch (error) {
          console.error(error);
        }
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
        ) : state.token ? (
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
