/* eslint-disable react-native/no-inline-styles */ /* eslint-disable prettier/prettier */

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
import auth from '@react-native-firebase/auth';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
// import {faEye, faEyeSlash} from '@fortawesome/free-regular-svg-icons';

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

export default function LoginScreen({navigation}) {
  //
  const [hidePassword, setHidePassword] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function resetFields() {
    setEmail('');
    setPassword('');
    setHidePassword(true);
  }
  const logIn = () => {
    if (!email.length || !password.length) {
      Alert.alert('Invalid Inputs', 'Fields can not be empty');
      return;
    }
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        resetFields();
        navigation.navigate('Home');
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(errorCode, errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>BiblioPhile</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType={'email-address'}
        />

        <View style={styles.sectionStyle}>
          <TextInput
            style={{paddingLeft: 15, width: 280, borderWidth: 0, padding: 5}}
            placeholder="Enter your password"
            value={password}
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

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            logIn();
          }}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      </View>

      <Text style={{marginBottom: 30, textAlign: 'center', fontSize: 16}}>
        Dont have an account.{' '}
        <Text
          style={{color: '#E83151'}}
          onPress={() => {
            navigation.navigate('Signup');
          }}>
          Sign Up
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
    padding: 10,
    paddingLeft: 20,
    fontSize: 14,
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
