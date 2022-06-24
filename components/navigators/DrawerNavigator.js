import 'react-native-gesture-handler';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Logout from '../users/auth/Logout';
import TabHomeNavigator from './TabHomeNavigator';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator({navigation}) {
  return (
    <Drawer.Navigator id="drawer">
      <Drawer.Screen
        name="Dashboard"
        component={TabHomeNavigator}
        options={{
          headerStyle: {
            backgroundColor: '#387780',
            elevation: 0, //removes the white shadow on android
          },
          headerTitle: '',
          headerTintColor: '#fff',
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={Logout}
        options={{
          headerTitle: '',
        }}
      />
    </Drawer.Navigator>
  );
}
