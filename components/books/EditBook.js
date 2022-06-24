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

const EditBook = ({route, navigation}) => {
  const {book} = route.params;
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [price, setPrice] = useState(book.price.toString());
  const [description, setDescription] = useState(book.description);
  const [rating, setRating] = useState(book.rating.toString());

  const updatedBook = {
    title,
    author,
    description,
    rating: parseInt(rating),
    price: parseInt(price),
    // cover: book.cover,
    // category: book.category,
  };

  const updateBook = updatedBook => {
    if (
      !title.length ||
      !author.length ||
      !price.length ||
      !description.length ||
      !rating.length
    ) {
      Alert.alert('Invalid Input', 'Fields can not be empty');
      return;
    }
    if (parseInt(rating) > 5) {
      Alert.alert('Invalid Rating', 'Rating cannot be greater than 5');
      return;
    }
    firestore()
      .collection('books')
      .doc(book.bookid)
      .update(updatedBook)
      .then(() => {
        console.log('Book updated!');
      });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Update Book</Text>
      <View style={styles.updateInfoContainer}>
        <Text style={{color: 'grey', marginLeft: 12}}>Book Title:</Text>
        <TextInput
          style={styles.updateTextInputs}
          placeholder={'Enter new title'}
          onChangeText={setTitle}
          value={title}
        />

        <Text style={{color: 'grey', marginLeft: 12}}>Book Author:</Text>
        <TextInput
          style={styles.updateTextInputs}
          placeholder={'Enter new author name'}
          value={author}
          onChangeText={setAuthor}
        />

        <Text style={{color: 'grey', marginLeft: 12}}>Book Description:</Text>
        <TextInput
          style={[styles.updateTextInputs, styles.updateDesc]}
          placeholder={'Enter new description'}
          value={description}
          multiline={true}
          onChangeText={setDescription}
        />
        <Text style={{color: 'grey', marginLeft: 12}}>Book Price:</Text>
        <TextInput
          style={[styles.updateTextInputs]}
          placeholder={'Enter new Price'}
          value={price}
          keyboardType={'numeric'}
          onChangeText={setPrice}
        />

        <Text style={{color: 'grey', marginLeft: 12}}>Book Rating:</Text>
        <TextInput
          style={styles.updateTextInputs}
          placeholder={'Enter new rating'}
          value={rating}
          onChangeText={setRating}
          keyboardType={'numeric'}
          maxLength={1}
        />

        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => {
            updateBook(updatedBook);
          }}>
          <Text style={{color: 'white', lineHeight: 27}}>Update</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
};

export default EditBook;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 10,
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
  updateDesc: {
    height: 100,
    borderRadius: 10,
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
