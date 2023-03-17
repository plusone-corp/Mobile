import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "../../constants/colors";
import useColorScheme from "../../hooks/useColorScheme";
import { RootTabParamList } from "../../types";
import MainTabStackNavigator from "./MainStack";
import ProfileTabStackNavigator from "./ProfileStack";

const BottomTab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

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
