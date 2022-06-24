import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
// import { Avatar, TextInput } from 'react-native-paper';

export default function SignupScreen({navigation}) {
  //
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfPassword, setHideConfPassword] = useState(true);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');

  const currentEyeIcon = displayPassword => {
    return !displayPassword ? (
      <FontAwesomeIcon
        icon={['far', 'fa-eye']}
        size={26}
        style={styles.imageStyle}
      />
    ) : (
      <FontAwesomeIcon
        icon={['far', 'fa-eye-slash']}
        size={26}
        style={styles.imageStyle}
      />
    );
  };

  async function addUser() {
    const user = {
      name: name,
      admin: false,
    };

    // const newReference = database()
    //   .ref('/users/' + auth().currentUser.uid)
    //   .push();

    // newReference.set(user);

    // let options = {
    //   method: 'POST',
    //   body: JSON.stringify(user),
    // };

    // const response = await fetch(
    //   'https://mad-project-26713-default-rtdb.firebaseio.com/users.json',
    //   options,
    // );
    // const data = await response.json();
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .set(user)
      .then(() => console.log('user added to firestore'));
  }

  function resetFields() {
    setName('');
    setEmail('');
    setPassword('');
    setCPassword('');
  }
  const signIn = () => {
    if (!name.length || !email.length || !password.length) {
      Alert.alert('Invalid Inputs', 'Fields can not be empty');
      return;
    }

    if (password === cpassword) {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
          addUser();
          resetFields();
          navigation.navigate('Home');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            Alert.alert('That email address is invalid! ');
          }
          if (error.code === 'auth/invalid-password') {
            Alert.alert('Invalid password. Must be at least 6 charcters long');
          }
        });
    } else {
      Alert.alert('Passwords do not match');
      return;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>BiblioPhile</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="John Doe"
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="johndoe@gmail.com"
          onChangeText={setEmail}
          keyboardType={'email-address'}
        />

        <View style={styles.sectionStyle}>
          <TextInput
            style={{paddingLeft: 15, width: 280, padding: 5}}
            placeholder="Enter your password"
            secureTextEntry={hidePassword}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => {
              setHidePassword(!hidePassword);
            }}>
            {currentEyeIcon(hidePassword)}
          </TouchableOpacity>
        </View>

        <View style={styles.sectionStyle}>
          <TextInput
            style={{paddingLeft: 15, width: 280, padding: 5}}
            placeholder="Confirm your password"
            secureTextEntry={hideConfPassword}
            onChangeText={setCPassword}
          />
          <TouchableOpacity
            onPress={() => {
              setHideConfPassword(!hideConfPassword);
            }}>
            {currentEyeIcon(hideConfPassword)}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            signIn();
          }}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.fb}>
          <Image
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png',
            }}
            style={{height: 20, width: 20}}
          />

          <Text style={{fontSize: 14, color: '#000'}}>Sign Up with Google</Text>
        </View>
      </View>

      <Text style={{marginBottom: 30, textAlign: 'center', fontSize: 16}}>
        Already have an account.{' '}
        <Text
          style={{color: '#E83151'}}
          onPress={() => {
            navigation.navigate('Login');
          }}>
          Log in
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 145,
    color: '#E83151',
  },
  form: {
    flex: 0,
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 50,
    padding: 8,
    paddingLeft: 20,
    fontSize: 15,
    marginBottom: 15,
    marginLeft: 0,
    width: 327,
  },
  button: {
    width: 327,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#387780',
    padding: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 30,
  },
  fb: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    padding: 5,
    width: 170,
    borderRadius: 5,
  },
  sectionStyle: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 327,
    borderWidth: 1,
    borderRadius: 50,
    marginBottom: 15,
    padding: 5,
    fontSize: 14,
  },
  imageStyle: {
    padding: 10,
    margin: 5,
  },
});
