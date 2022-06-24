import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const BookDetail = ({route, navigation}) => {
  const {book} = route.params;

  const addToCart = book => {
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .update({
        cart: firestore.FieldValue.arrayUnion(book),
      });
  };

  const addToFavorites = book => {
    firestore()
      .collection('favorites')
      .add({...book, userid: auth().currentUser.uid})
      .then(() => {
        console.log('Added To Favorites');
      });
  };
  return (
    <ScrollView style={styles.container}>
      <View style={{flex: 0, alignItems: 'center'}}>
        <View style={styles.imageView}>
          <Image
            source={{uri: `asset:/BookCovers/${book.cover}`}}
            style={styles.image}
          />
        </View>
        <Text style={styles.bookTitle}>{book.title}</Text>
        <Text style={styles.bookAuthor}>{book.author}</Text>
      </View>

      <View
        style={{marginLeft: 32, marginBottom: 18, marginTop: 18, width: 80}}>
        <StarRating
          disabled={true}
          maxStars={5}
          rating={book.rating}
          fullStarColor={'#E83151'}
          starSize={25}
        />
        <Text>124 reviews</Text>
      </View>
      <View style={{marginLeft: 32, marginBottom: 10, marginRight: 15}}>
        <Text style={{fontSize: 20, color: 'black'}}>Description:</Text>
        <Text>{book.description}</Text>
      </View>
      <View style={{flex: 0, alignItems: 'center'}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            addToFavorites(book);
            navigation.popToTop();
          }}>
          <Text style={styles.buttonText}>Add to Favorites</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button2}
          onPress={() => {
            addToCart(book);
            navigation.popToTop();
          }}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default BookDetail;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  image: {
    width: 174,
    height: 260,
  },
  imageView: {
    padding: 40,
    // backgroundColor: 'rgba(56, 119, 128, 0.8)',
    backgroundColor: '#728A7C',
    marginLeft: 57,
    marginRight: 57,
    marginTop: 57,
    marginBottom: 10,
    borderRadius: 10,
  },
  bookTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  bookAuthor: {
    fontSize: 16,
    fontWeight: '300',
    color: 'black',
  },
  button: {
    width: 260,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#387780',
    padding: 10,
    marginBottom: 14,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 30,
  },
  button2: {
    width: 160,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#D2CCA1',
    padding: 10,
    marginBottom: 14,
  },
});
