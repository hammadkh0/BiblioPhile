import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Book = props => {
  const [user, setUser] = useState('');
  //

  const removeBook = bookId => {
    firestore()
      .collection('books')
      .doc(bookId)
      .delete()
      .then(() => {
        console.log('Book deleted!');
      });
  };

  const getUser = async () => {
    const userDocuments = await firestore()
      .collection('users')
      .doc('' + auth().currentUser.uid)
      .get();
    setUser(userDocuments.data());
    // console.log(userDocuments.data());
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={{uri: `asset:/BookCovers/${props.book.cover}`}}
          style={styles.image}
        />

        <View>
          <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 5}}>
            {props.book.title}
          </Text>
          <Text style={{color: 'gray', fontSize: 14, marginBottom: 5}}>
            {props.book.author}
          </Text>
          <Text style={{color: 'gray', fontSize: 14, marginBottom: 15}}>
            $ {props.book.price}
          </Text>
          <View style={{width: 50}}>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={props.book.rating}
              fullStarColor={'#E83151'}
              starSize={25}
            />
          </View>
        </View>
      </View>

      {user.admin ? (
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              removeBook(props.book.bookid);
            }}>
            <Text style={styles.buttonText}>Remove</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // props.updateBook(props);
              props.navigation.navigate('EditBook', {
                book: props.book,
              });
            }}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default Book;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#D2CCA1',
  },
  image: {
    height: 115,
    width: 70,
    marginRight: 10,
  },
  buttons: {
    flex: 0,
    justifyContent: 'space-around',
  },
  button: {
    borderWidth: 2,
    borderColor: '#387780',
    padding: 5,
    borderRadius: 50,
    width: 80,
  },
  buttonText: {
    textAlign: 'center',
  },
});
