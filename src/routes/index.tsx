import { createDrawerNavigator } from '@react-navigation/drawer';
import CalendarPage from "../pages/Calendar";
import Drawing from '../pages/Drawing';

const Drawer = createDrawerNavigator();

export const Routes = () => {
  return (
    <Drawer.Navigator initialRouteName="Calendar">
      <Drawer.Screen name="Calendar" component={CalendarPage} />
      <Drawer.Screen name="Drawing" component={Drawing} />
    </Drawer.Navigator>
  )
}