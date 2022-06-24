import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';

// You can import from local files
import LoginScreen from './components/users/auth/LoginScreen';
import SignupScreen from './components/users/auth/SignupScreen';
import DrawerNavigator from './components/navigators/DrawerNavigator';

// importing icons and related items
import {library} from '@fortawesome/fontawesome-svg-core';
import {faEye, faEyeSlash} from '@fortawesome/free-regular-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';

// or any pure javascript modules available in npm
import {LogBox} from 'react-native';

// LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();
library.add(far, faEye, faEyeSlash);

export default function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator id="stack" initialRouteName={!user ? 'Login' : 'Home'}>
        <Stack.Screen
          name="Home"
          component={DrawerNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
