import React, {useEffect, useState} from 'react';

import Profile from '../users/Profile';
import UpdateUser from '../users/UpdateUser';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Favorites from '../books/Favorites';

const Stack = createNativeStackNavigator();
const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Update User"
        component={UpdateUser}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
