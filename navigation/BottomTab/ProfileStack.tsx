import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Pressable } from "react-native";
import Icon from "../../components/icons/Icon";
import colors from "../../constants/colors";
import useColorScheme from "../../hooks/useColorScheme";
import { Text } from '../../components/components/themed'
import MainScreenProfileTabScreen from "../../screens/bottomTab/ProfileTab/MainScreen";
import { ProfileStackScreenList, ProfileStackScreenProps } from "../../types";

const Stack = createNativeStackNavigator<ProfileStackScreenList>();

export default function ProfileTabStackNavigator() {
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator
      initialRouteName="MainScreen"
      screenOptions={({ navigation }: ProfileStackScreenProps<any>) => ({
        title: "",
        headerTitle: "",
        headerRight: () => {
          return (
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Pressable
                style={{
                  marginRight: 15,
                }}
              >
                <Icon
                  name="th-large"
                  size={25}
                  color={colors[colorScheme].text}
                />
              </Pressable>
              <Pressable
                onPress={() => {
                  navigation.navigate("Setting");
                }}
              >
                <Icon name="gear" size={25} color={colors[colorScheme].text} />
              </Pressable>
            </View>
          );
        },
        headerLeft: () => {
          return (
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "600",
                }}
              >
                PlusOne
              </Text>
            </View>
          );
        },
      })}
    >
      <Stack.Screen name="MainScreen" component={MainScreenProfileTabScreen} />
    </Stack.Navigator>
  );
}
