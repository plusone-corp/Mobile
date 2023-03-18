import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreenProfileTabScreen from "../../screens/bottomTab/ProfileTab/MainScreen";
import { ProfileStackScreenList } from "../../types";

const Stack = createNativeStackNavigator<ProfileStackScreenList>();

export default function ProfileTabStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="MainScreen">
      <Stack.Screen name="MainScreen" component={MainScreenProfileTabScreen} />
    </Stack.Navigator>
  );
}
