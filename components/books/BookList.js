import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  ActivityIndicator,
} from 'react-native';

import Book from './Book';
import BookDetail from './BookDetail';
import Profile from '../users/Profile';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Avatar} from 'react-native-paper';
import EditBook from './EditBook';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const DUMMY_BOOKS = [
  {
    title: 'AIFI',
    author: 'Jane Cooper',
    rating: 4,
    description:
      'akjsciuaegfkzd bsdjfhgzd ughisoub xofh sfjbh sourhb xchb srohbxb bs',
    cover: 'pexels-george-kascheev-12052041.jpg',
    category: 'Adventure',
    price: 20,
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    rating: 4,
    description:
      'The Alchemist is a classic novel in which a boy named Santiago embarks on a journey seeking treasure in the Egyptian pyramids after having a recurring dream about it and on the way meets mentors, falls in love, and most importantly, learns the true importance of who he is and how to improve himself',
    cover: 'THE-ALCHEMIST-pdf-free-download.jpg',
    category: 'Adventure',
    price: 15,
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    rating: 2,
    description:
      'he Alchemist is a classic novel in which a boy named Santiago embarks on a journey seeking treasure in the Egyptian pyramids after having a recurring dream about it and on the way meets mentors, falls in love, and most importantly, learns the true importance of who he is and how to improve himself',
    cover: 'THE-ALCHEMIST-pdf-free-download.jpg',
    category: 'Adventure',
    price: 25,
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    rating: 3,
    description:
      'The Alchemist is a classic novel in which a boy named Santiago embarks on a journey seeking treasure in the Egyptian pyramids after having a recurring dream about it and on the way meets mentors, falls in love, and most importantly, learns the true importance of who he is and how to improve himself',
    cover: 'THE-ALCHEMIST-pdf-free-download.jpg',
    category: 'Adventure',
    price: 20,
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    rating: 3,
    description:
      'he Alchemist is a classic novel in which a boy named Santiago embarks on a journey seeking treasure in the Egyptian pyramids after having a recurring dream about it and on the way meets mentors, falls in love, and most importantly, learns the true importance of who he is and how to improve himself',
    cover: 'THE-ALCHEMIST-pdf-free-download.jpg',
    category: 'Adventure',
    price: 35,
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    rating: 4,
    description:
      'The Alchemist is a classic novel in which a boy named Santiago embarks on a journey seeking treasure in the Egyptian pyramids after having a recurring dream about it and on the way meets mentors, falls in love, and most importantly, learns the true importance of who he is and how to improve himself',
    cover: 'book-cover-To-Kill-a-Mockingbird-many-1961.jpg',
    category: 'Adventure',
    price: 15,
  },
];

function Book_List({navigation}) {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState('');
  const [search, setSearch] = useState('');
  const [apiBooks, setAPIBooks] = useState([]);
  const [img, setImg] = useState('');

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
        setUser({...obj, userid}); //{name,id}
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  };

  const getBooks = () => {
    const subscriber = firestore()
      .collection('books')
      .onSnapshot(querySnapshot => {
        const bookArray = [];

        querySnapshot.forEach(documentSnapshot => {
          bookArray.push({
            ...documentSnapshot.data(),
            bookid: documentSnapshot.id,
          });
        });

        setBooks(bookArray);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  };

  // const booklist = books;
  const searchBooks = () => {
    if (!search.length) {
      getBooks();
    } else {
      const BOOKS = books.filter(book =>
        book.title.toLowerCase().includes(search),
      );
      console.log(BOOKS);
      setBooks(BOOKS);
    }
  };

  // const addBooks = () => {
  //   DUMMY_BOOKS.forEach(book => {
  //     firestore()
  //       .collection('books')
  //       .add(book)
  //       .then(() => {
  //         console.log('Book added!');
  //       });
  //   });
  // };

  const fetchImage = () => {
    fetch(`https://robohash.org/${Math.random() * 20 + 1}`)
      .then(img => {
        console.log(img.url);
        setImg(img.url);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    console.log(search);
    searchBooks();
  }, [search]);

  useEffect(() => {
    fetchImage();
    getUser();
    getBooks();
    // addBooks();
  }, []);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.bookCard}
        onPress={() => {
          navigation.navigate('Book Details', {book: item});
        }}>
        <Book book={item} navigation={navigation} />
      </TouchableOpacity>
    );
  };

  if (loading) return <ActivityIndicator />;

  return (
    <View
      style={{flex: 1, justifyContent: 'center', backgroundColor: '#387780'}}>
      <View style={styles.user}>
        <Avatar.Image
          size={80}
          style={{backgroundColor: 'gray'}}
          source={{
            uri: img,
          }}
        />

        <Text style={{color: '#fff', fontSize: 22}}>{user.name}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate(Profile);
          }}>
          <Text style={styles.buttonText}>View Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 20,
            marginBottom: 0,
            alignItems: 'center',
          }}>
          <Text style={styles.text}>Book List</Text>
          <View style={styles.sectionStyle}>
            <TextInput
              style={{paddingLeft: 15, width: 170, padding: 5}}
              placeholder="Search Item"
              onChangeText={setSearch}
            />
            <MaterialIcons name="search" size={30} />
          </View>
        </View>
        <FlatList
          data={books}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}

const Stack = createNativeStackNavigator();
const BookList = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Book List"
        component={Book_List}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Book Details"
        component={BookDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditBook"
        component={EditBook}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default BookList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  user: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#387780',
    paddingTop: 15,
    marginTop: 20,
  },
  text: {
    fontSize: 24,
    // margin: 15,
    marginBottom: 5,
    color: '#000',
    fontWeight: '700',
  },
  bookCard: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 5,
    marginLeft: 10,
    width: '93%',
  },
  button: {
    width: 170,
    height: 40,
    borderRadius: 50,
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 15,
    marginTop: 5,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 20,
  },
  sectionStyle: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 200,
    // borderWidth: 1,
    backgroundColor: 'lightgray',
    borderRadius: 50,
    marginBottom: 15,
    // padding: 5,
    fontSize: 14,
  },
});
