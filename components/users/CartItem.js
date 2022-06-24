import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const CartItem = props => {
  //

  const removeCartItem = book => {
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .update({
        cart: firestore.FieldValue.arrayRemove(book),
      });
  };

  return (
    <View style={styles.container} key={props.book.id}>
      <View></View>
      <Image
        source={{uri: `asset:/BookCovers/${props.book.cover}`}}
        style={styles.image}
      />

      <View>
        <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 5}}>
          {props.book.title}
        </Text>
        <Text style={{color: 'gray', fontSize: 14, marginBottom: 20}}>
          {props.book.author}
        </Text>

        <View style={styles.bookRemoveContainer}>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => {
              removeCartItem(props.book);
            }}>
            <Text style={{fontSize: 13, color: 'black'}}>Remove</Text>
          </TouchableOpacity>

          <Text style={styles.priceContainer}>{'$' + props.book.price}</Text>
        </View>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#D2CCA1',
  },
  image: {
    height: 100,
    width: 64,
    marginRight: 10,
  },
  priceContainer: {
    padding: 5,
  },
  bookRemoveContainer: {
    flexDirection: 'row',
    width: '73%',
    justifyContent: 'space-between',
  },
  removeButton: {
    width: 80,
    padding: 5,
    borderRadius: 50,
    alignItems: 'center',
    // backgroundColor: '#f74a68',
    borderWidth: 2,
    borderColor: '#f74a68',
  },
});
