import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const UpdateUser = ({route, navigation}) => {
  const {user} = route.params;
  const [name, setName] = useState(user.name);

  const updatedUser = {
    name,
  };

  const updateUser = updatedUser => {
    if (!name.length) {
      Alert.alert('Field can not be empty');
      return;
    }
    firestore()
      .collection('users')
      .doc(user.userid)
      .update(updatedUser)
      .then(() => {
        console.log('User updated!');
      });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Update User</Text>
      <View style={styles.updateInfoContainer}>
        <Text style={{color: 'grey', marginLeft: 12}}>User Name:</Text>
        <TextInput
          style={styles.updateTextInputs}
          placeholder={'Enter new title'}
          onChangeText={setName}
          value={name}
        />

        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => {
            updateUser(updatedUser);
          }}>
          <Text style={{color: 'white', lineHeight: 27}}>Update</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
};

export default UpdateUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 30,
    color: '#000',
  },
  updateInfoContainer: {
    marginBottom: 50,
    marginTop: 20,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  updateTextInputs: {
    borderWidth: 1,
    borderColor: 'black',
    margin: 10,
    borderRadius: 50,
    paddingLeft: 10,
    height: 40,
  },

  updateButton: {
    backgroundColor: '#E83151',
    margin: 20,
    alignItems: 'center',
    borderRadius: 50,
    height: 40,
    padding: 5,
    marginHorizontal: 80,
  },
});
