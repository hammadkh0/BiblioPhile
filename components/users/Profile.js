import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import Dialog from 'react-native-dialog';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/auth';

export default function Profile({navigation}) {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [operation, setOperation] = useState('');

  const getUser = async () => {
    let obj = {};
    const userid = auth().currentUser.uid;
    const subscriber = firestore()
      .collection('users')
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          if (documentSnapshot.id === userid) {
            obj = {name: documentSnapshot.data().name};
          }
        });
        setUser({...obj, userid});
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  };

  const showDialog = selectedOperation => {
    setOperation(selectedOperation);
    setVisible(true);
  };

  const handleCancel = () => {
    setPassword('');
    setEmail('');
    setVisible(false);
  };

  const handlePasswordChange = async () => {
    if (!password.length) {
      Alert.alert('Invalid Input', 'Fields can not be empty');
      return;
    }
    try {
      await auth().currentUser.updatePassword(password);
      setVisible(false);
      console.log('success');
    } catch (err) {
      Alert.alert(err);
    }
  };
  const handleEmailChange = async () => {
    if (!email.length) {
      Alert.alert('Invalid Input', 'Fields can not be empty');
      return;
    }
    try {
      //   await firebase.auth().currentUser.updateProfile({password: password});
      await auth().currentUser.updateEmail(email);
      setVisible(false);
      console.log('success');
    } catch (err) {
      Alert.alert(err);
    }
  };

  const deleteUser = () => {
    firestore()
      .collection('users')
      .doc(user.userid)
      .delete()
      .then(() => {
        console.log('user deleted');
      });

    // auth()
    //   .signOut()
    //   .then(() => console.log('logged out'));

    firebase
      .auth()
      .currentUser.delete()
      .then(console.log('user deleted from firebase'));

    navigation.getParent('stack').popToTop();
  };

  useEffect(() => {
    getUser();
  }, []);

  if (loading) return <ActivityIndicator />;

  return (
    <View>
      {operation === 'password' ? (
        <Dialog.Container visible={visible}>
          <Dialog.Title>Change Password</Dialog.Title>
          <Dialog.Description>Enter the new password</Dialog.Description>
          <Dialog.Input onChangeText={setPassword} />
          <Dialog.Button label="Cancel" onPress={handleCancel} />
          <Dialog.Button label="Change" onPress={handlePasswordChange} />
        </Dialog.Container>
      ) : (
        <Dialog.Container visible={visible}>
          <Dialog.Title>Change Email</Dialog.Title>
          <Dialog.Description>Enter the new email</Dialog.Description>
          <Dialog.Input onChangeText={setEmail} />
          <Dialog.Button label="Cancel" onPress={handleCancel} />
          <Dialog.Button label="Change" onPress={handleEmailChange} />
        </Dialog.Container>
      )}

      <Avatar.Image
        size={80}
        source={{uri: `https://robohash.org/${Math.random() * 20 + 1}`}}
        style={{margin: 10, backgroundColor: 'gray'}}
      />
      <Text style={styles.heading}>{user.name}</Text>
      <Text style={styles.email}>{auth().currentUser.email}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          Alert.alert(
            'Delete User',
            'Are you sure you want to delete your account',
            [
              {
                text: 'OK',
                onPress: () => deleteUser(),
              },
              {
                text: 'Cancel',
                onPress: () => console.log('canceled'),
              },
            ],
          );
          // deleteUser();
        }}>
        <Text style={styles.buttonText}>REMOVE ACCOUNT</Text>
      </TouchableOpacity>

      <View style={styles.options}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Update User', {user: user});
          }}>
          <Text style={styles.optionButton}>Update Account Information</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            showDialog('password');
          }}>
          <Text style={styles.optionButton}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            showDialog('email');
          }}>
          <Text style={styles.optionButton}>Change Email</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Favorites');
          }}>
          <Text style={styles.optionButton}>Favorites</Text>
        </TouchableOpacity>

        <Text style={styles.optionButton}>Privacy and Security</Text>
        <Text style={styles.optionButton}>Appearance</Text>
        <Text style={styles.optionButton}>Language</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
  },
  heading: {
    fontSize: 30,
    color: '#E83151',
    fontWeight: '700',
    marginLeft: 10,
  },
  email: {
    marginLeft: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    width: 327,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#387780',
    padding: 10,
    marginBottom: 15,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 30,
  },
  options: {
    borderTopWidth: 0.7,
    borderColor: 'gray',
    width: '90%',
    marginLeft: 10,
  },
  optionButton: {
    fontSize: 18,
    color: 'black',
    marginLeft: 15,
    // marginBottom: 11,
    borderColor: 'gray',
    borderBottomWidth: 0.7,
    paddingVertical: 11,
  },
});
