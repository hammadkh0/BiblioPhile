import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import CartItem from './CartItem';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .onSnapshot(querySnapshot => {
        const cartArray = [];

        querySnapshot.forEach(documentSnapshot => {
          if (documentSnapshot.id === auth().currentUser.uid) {
            if (documentSnapshot.data().cart) {
              for (let i = 0; i < documentSnapshot.data().cart.length; i++) {
                cartArray.push({
                  ...documentSnapshot.data().cart[i],
                });
              }
            }
          }
        });
        console.log(cartArray);
        setCart(cartArray);

        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  const checkout = () => {
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .update({
        myBooks: firestore.FieldValue.arrayUnion(...cart),
      });

    clearAllItems();
  };
  const clearAllItems = () => {
    cart.forEach(cartItem => {
      firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .update({
          cart: firestore.FieldValue.arrayRemove(cartItem),
        });
    });
    setCart([]);
  };

  const renderItem = ({item}) => {
    return <CartItem book={item} />;
  };
  if (loading) return <ActivityIndicator />;
  return (
    <View style={styles.container}>
      <View style={styles.secondContainer}>
        <Text style={{fontWeight: 'bold', fontSize: 25, marginLeft: 12}}>
          In the cart {cart.length} Books
        </Text>
      </View>

      <View style={styles.firstContainer}>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => clearAllItems()}>
          <Text
            style={{
              color: 'grey',
              fontWeight: 'bold',
              fontSize: 20,
              marginLeft: 8,
            }}>
            Clear All
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.thirdContainer}>
        <FlatList data={cart} renderItem={renderItem} />
      </View>

      <TouchableOpacity
        style={{alignSelf: 'center'}}
        onPress={() => checkout()}>
        <View style={styles.checkoutButtonContainer}>
          <Text style={{fontWeight: 'bold', color: 'white'}}>Check Out</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 0,
  },
  firstContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  secondContainer: {
    top: 10,
    alignSelf: 'stretch',
    paddingLeft: 10,
    paddingVertical: 10,
  },
  thirdContainer: {
    top: 0,
    alignSelf: 'stretch',
    marginHorizontal: 10,
    //flex: 0.8,
    height: '72%',
    paddingTop: 20,
    paddingHorizontal: 5,
  },
  renderingContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    height: 120,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#D2CCA1',
  },
  helloButton: {
    width: 40,
    height: 40,
    borderRadius: 100,

    padding: 5,
    alignItems: 'center',
  },
  clearButton: {
    padding: 5,
  },
  bookCover: {
    borderColor: 'black',
    marginLeft: 10,
    marginVertical: 5,
  },
  infoContainer: {
    flex: 0,
    justifyContent: 'space-evenly',
    marginLeft: 10,
    marginVertical: 5,
    paddingRight: 40,
  },
  bookImage: {
    width: 70,
    height: 90,
    flex: 1,
  },
  checkoutButtonContainer: {
    width: 150,
    height: 40,
    backgroundColor: '#E83151',
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
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
