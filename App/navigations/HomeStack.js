import React, {useState, useCallback} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useFocusEffect} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import Navbar from '../components/NavBar';
import Home from '../screens/Home';
import Detail from '../screens/Detail';
import Search from '../screens/Search';

const Stack = createStackNavigator();

const HomeStack = ({route}) => {
  const [currentLogInUser, setcurrentLogInUser] = useState('');

  const getUserName = () => {
    const user = auth().currentUser;
    console.log('user', user);
    if (user) {
      const unsubscribe = firestore()
        .collection('users')
        .where('owner_uid', '==', user?.uid)
        .limit(1)
        .onSnapshot(snapshot =>
          snapshot.docs.map(doc => {
            setcurrentLogInUser({
              username: doc.data().username,
            });
          }),
        );
      console.log('currentUser', currentLogInUser);
      return unsubscribe;
    } else {
      setcurrentLogInUser('');
    }
  };
  useFocusEffect(
    useCallback(() => {
      getUserName();
    }, []),
  );

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: ({navigation}) => (
            <Navbar
              navigation={navigation}
              main={true}
              name={currentLogInUser.username}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          headerTransparent: true,
          header: ({navigation}) => <Navbar navigation={navigation} />,
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerTransparent: true,
          header: ({navigation}) => <Navbar navigation={navigation} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
