export const getUser = async () => {
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
      setUser({...obj, userid});
      setLoading(false);
    });

  // Unsubscribe from events when no longer in use
  return () => subscriber();
};
