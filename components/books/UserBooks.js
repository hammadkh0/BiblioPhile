import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function UserBookItem(props) {
  return (
    <View style={styles.container1} key={props.book.id}>
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
      </View>
    </View>
  );
}

export default function UserBooks() {
  const [mybooks, setMyBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .onSnapshot(querySnapshot => {
        const bookArray = [];

        querySnapshot.forEach(documentSnapshot => {
          if (documentSnapshot.id === auth().currentUser.uid) {
            if (documentSnapshot.data().myBooks) {
              for (let i = 0; i < documentSnapshot.data().myBooks.length; i++) {
                bookArray.push({
                  ...documentSnapshot.data().myBooks[i],
                });
              }
            }
          }
        });
        console.log(bookArray);
        setMyBooks(bookArray);

        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  const renderItem = ({item}) => {
    return <UserBookItem book={item} />;
  };

  if (loading) return <ActivityIndicator />;
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Books</Text>

      <View style={styles.thirdContainer}>
        <FlatList data={mybooks} renderItem={renderItem} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#D2CCA1',
  },
  container1: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#D2CCA1',
  },
  heading: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 30,
    color: '#E83151',
  },
  thirdContainer: {
    marginHorizontal: 10,
    // flex: 0.8,
    // height: '72%',
    paddingTop: 20,
    paddingHorizontal: 5,
  },
  image: {
    height: 100,
    width: 64,
    marginRight: 10,
  },
});
