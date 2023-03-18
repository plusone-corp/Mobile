import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable } from "react-native";
import Icon from "../../components/icons/Icon";
import colors from "../../constants/colors";
import useColorScheme from "../../hooks/useColorScheme";
import DiscoveryScreenMainTabScreen from "../../screens/bottomTab/MainTab/DiscoveryScreen";
import MainScreenMainTabScreen from "../../screens/bottomTab/MainTab/MainScreen";
import { MainStackScreenList, MainStackScreenProps } from "../../types";

const Stack = createNativeStackNavigator<MainStackScreenList>();

export default function MainTabStackNavigator() {
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator initialRouteName="MainScreen">
      <Stack.Screen
        name="MainScreen"
        component={MainScreenMainTabScreen}
        options={({ navigation }: MainStackScreenProps<"MainScreen">) => ({
          title: "Home",
          headerTitle: "Home",
          headerRight: () => {
            return (
              <Pressable
                onPress={() => {
                  navigation.navigate("Setting");
                }}
              >
                <Icon name="gear" size={25} color={colors[colorScheme].text} />
              </Pressable>
            );
          },
        })}
      />
      <Stack.Screen
        name="DiscoveryScreen"
        component={DiscoveryScreenMainTabScreen}
        options={({ navigation }: MainStackScreenProps<"DiscoveryScreen">) => ({
          title: "Discovery",
          headerTitle: "Discovery",
          headerRight: () => {
            return (
              <Pressable
                onPress={() => {
                  navigation.navigate("Setting");
                }}
              >
                <Icon name="gear" size={25} color={colors[colorScheme].text} />
              </Pressable>
            );
          },
        })}
      />
    </Stack.Navigator>
  );
}
