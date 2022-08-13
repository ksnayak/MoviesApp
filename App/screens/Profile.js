import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Colors from '../configs/Color';
import {Avatar} from '@rneui/base/dist/Avatar/Avatar';
import {useFocusEffect} from '@react-navigation/native';
const Profile = () => {
  // const [currentLogInUser, setcurrentLogInUser] = useState(null);

  const PLACEHOLDER_IMG =
    'https://2dbags.co/wp-content/uploads/revslider/lookbook1-demo_slider/placeholder.jpg';

  // const getUserName = () => {
  //   const user = auth().currentUser;
  //   const unsubscribe = firestore()
  //     .collection('users')
  //     .where('owner_uid', '==', user.uid)
  //     .limit(1)
  //     .onSnapshot(snapshot =>
  //       snapshot.docs.map(doc => {
  //         setcurrentLogInUser({
  //           username: doc.data().username,
  //         });
  //       }),
  //     );

  //   return unsubscribe;
  // };
  const [currentLogInUser, setcurrentLogInUser] = useState('');

  const getUserName = () => {
    const user = auth().currentUser;
    console.log('user', user);
    const unsubscribe = firestore()
      .collection('users')
      .where('owner_uid', '==', user?.uid)
      .limit(1)
      .onSnapshot(snapshot =>
        snapshot.docs.map(doc => {
          setcurrentLogInUser({
            username: doc.data().username,
            phoneNUmber: doc.data().phoneNumber,
            // data: doc.data(),
          });
        }),
      );
    console.log('currentUser', currentLogInUser);

    return unsubscribe;
  };

  const handleSignout = async () => {
    try {
      await auth().signOut();
      console.log('Signed Out successfully!');
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getUserName();
    }, []),
  );

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.avatarContainer}>
          <Avatar
            size={100}
            source={{uri: PLACEHOLDER_IMG}}
            icon
            avatarStyle={styles.avatar}
          />
        </View>
        <View style={styles.usernameContainer}>
          <Text style={styles.userName}>{currentLogInUser?.username}</Text>
        </View>
        <View style={styles.usernameContainer}>
          <Text style={styles.userName}>{currentLogInUser?.phoneNUmber}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignout}>
          <Text style={[styles.signoutText, {textAlign: 'center'}]}>
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
  },
  avatar: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: Colors.secondary,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  usernameContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
  },
  buttonContainer: {
    alignItems: 'center',
    width: '60%',
    borderRadius: 20,
    padding: 8,
    backgroundColor: Colors.primary,
  },
  signoutText: {
    fontSize: 20,
    fontWeight: '50',
    color: Colors.white,
  },
});
