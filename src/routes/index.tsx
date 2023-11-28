import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Drawing from "../drawing";
import { Text } from "react-native";

const Drawer = createDrawerNavigator();

const Hello = () => {
  return <Text>Olá</Text>
}

export const Routes = () => {
  return (
    <Drawer.Navigator initialRouteName="Drawing">
      <Drawer.Screen name="Drawing" component={Drawing} />
      <Drawer.Screen name="Hello" component={Hello} />
    </Drawer.Navigator>
  )
}