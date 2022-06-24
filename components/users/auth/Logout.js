import React, {useEffect} from 'react';
import auth from '@react-native-firebase/auth';

export default function Logout({navigation}) {
  const drawerNavigation = navigation.getParent('stack');
  useEffect(() => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        console.log(drawerNavigation);
        navigation.closeDrawer();
        drawerNavigation?.popToTop();
      })
      .catch(err => console.log(err));

    // navigation.navigate('Logout', {screen: 'Home'});
  }, []);
  return null;
}
