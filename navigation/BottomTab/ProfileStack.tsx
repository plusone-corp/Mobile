import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreenProfileTabScreen from "../../screens/bottomTab/ProfileTab/MainScreen";
import { ProfileTabScreenList } from "../../types";

const Stack = createNativeStackNavigator<ProfileTabScreenList>();

export default function ProfileTabStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="MainScreen">
      <Stack.Screen name="MainScreen" component={MainScreenProfileTabScreen} />
    </Stack.Navigator>
  );
}
