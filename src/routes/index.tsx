import { DrawerScreenProps, createDrawerNavigator } from '@react-navigation/drawer';

import CalendarScreen from "../pages/Calendar";
import Drawing from '../pages/Drawing';
import NewEvent from '../pages/NewEvent';

export type RootDrawerParamList = {
  Calendar: undefined;
  Drawing: undefined;
  Event: undefined
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

export type DefaultScreenProps = DrawerScreenProps<RootDrawerParamList>;

export const Routes = () => {
  return (
    <Drawer.Navigator initialRouteName="Calendar">
      <Drawer.Screen name="Calendar" component={CalendarScreen} />
      <Drawer.Screen name="Drawing" component={Drawing} />
      <Drawer.Screen name="Event" component={NewEvent} />
    </Drawer.Navigator>
  )
}