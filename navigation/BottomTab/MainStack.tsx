import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DiscoveryScreenMainTabScreen from "../../screens/bottomTab/MainTab/DiscoveryScreen";
import MainScreenMainTabScreen from "../../screens/bottomTab/MainTab/MainScreen";
import { MainTabScreenList } from "../../types";

const Stack = createNativeStackNavigator<MainTabScreenList>();

export default function MainTabStackNavigator() {
    return <Stack.Navigator
        initialRouteName="MainScreen"
    >
        <Stack.Screen
            name="MainScreen"
            component={MainScreenMainTabScreen}
        />
        <Stack.Screen
            name="DiscoveryScreen"
            component={DiscoveryScreenMainTabScreen}
        />
    </Stack.Navigator>
}