import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

/*
  Root Stack
*/

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Setting: undefined;
  NotFound: undefined;
  Authentication: undefined;
  Splash: undefined
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen, any>;

/* 
  Main Tab
*/

export type RootTabParamList = {
  Main: NavigatorScreenParams<MainTabScreenList> | undefined;
  Profile: NavigatorScreenParams<ProfileTabScreenList> | undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

/*
  Sub main tab
*/

export type MainTabScreenList = {
  MainScreen: undefined;
  DiscoveryScreen: undefined;
};

export type ProfileTabScreenList = {
  MainScreen: undefined;
};

export type MainTabScreenProps<Screen extends keyof MainTabScreenList> =
  CompositeScreenProps<
    NativeStackScreenProps<MainTabScreenList, Screen>,
    CompositeScreenProps<
      BottomTabScreenProps<RootTabParamList>,
      NativeStackScreenProps<RootStackParamList>
    >
  >;

export type ProfileTabScreenProps<Screen extends keyof ProfileTabScreenList> =
  CompositeScreenProps<
    NativeStackScreenProps<ProfileTabScreenList, Screen>,
    CompositeScreenProps<
      BottomTabScreenProps<RootTabParamList>,
      NativeStackScreenProps<RootStackParamList>
    >
  >;

/*
  Authentication Tab
*/

export type AuthStackParamList = {
  LogIn: undefined;
  Register: undefined;
  ForgotPassword: undefined
};

export type AuthStackScreenProps<Screen extends keyof AuthStackParamList> =
  CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;