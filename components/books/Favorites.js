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

function FavoriteBookItem(props) {
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

export default function Favorites() {
  const [mybooks, setMyBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const subscriber = firestore()
      .collection('favorites')
      .where('userid', '==', auth().currentUser.uid)
      .get()
      .then(querySnapshot => {
        const array = [];
        querySnapshot.forEach(documentSnapshot => {
          console.log(documentSnapshot.data());
          array.push(documentSnapshot.data());
        });
        setMyBooks(array);
        setLoading(false);
      });
  }, []);

  const renderItem = ({item}) => {
    return <FavoriteBookItem book={item} />;
  };

  if (loading) return <ActivityIndicator />;
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Favorites</Text>

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
