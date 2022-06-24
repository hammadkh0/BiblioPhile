import React, {useState, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// You can import from local files
import BookList from '../books/BookList';
import UserBooks from '../books/UserBooks';
import Cart from '../users/Cart';

// importing icons and related items
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import ProfileStack from './ProfileStack';

const Tab = createBottomTabNavigator();

function TabHomeNavigator({route, navigation}) {
  return (
    <Tab.Navigator
      id="tabnavigator"
      screenOptions={{
        tabBarStyle: {
          borderTopWidth: 1.5,
          paddingBottom: 5,
          height: 55,
        },
        tabBarActiveTintColor: '#e91e63',
      }}>
      <Tab.Screen
        name="BookList"
        component={BookList}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}, iconName) => (
            <MaterialCommunityIcons
              name={'book-alphabet'}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Your Books"
        component={UserBooks}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}, iconName) => (
            <MaterialCommunityIcons
              name={'bookshelf'}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="cart-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabHomeNavigator;
