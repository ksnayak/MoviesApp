import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

import NotLoggedin from '../screens/Login/NotLoggedin';
import Login from '../screens/Login/Login';
import Signup from '../screens/Login/Signup';
import Profile from '../screens/Profile';

import Navbar from '../components/NavBar';

const Stack = createStackNavigator();

const screenOptions = {
  headerShown: false,
};

const SignedInStack = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen name="Profile" component={Profile} />
  </Stack.Navigator>
);

const SignedOutStack = () => (
  <Stack.Navigator initialRouteName="NotLoggedin">
    <Stack.Screen
      name="NotLoggedin"
      component={NotLoggedin}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Login"
      component={Login}
      options={{
        headerTransparent: true,
        header: ({navigation}) => <Navbar navigation={navigation} />,
      }}
    />
    <Stack.Screen
      name="Signup"
      component={Signup}
      options={{
        headerTransparent: true,
        header: ({navigation}) => <Navbar navigation={navigation} />,
      }}
    />
  </Stack.Navigator>
);

const AuthStack = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const userHandler = user =>
    user ? setCurrentUser(user) : setCurrentUser(null);

  useEffect(() => auth().onAuthStateChanged(user => userHandler(user)), []);

  return <>{currentUser ? <SignedInStack /> : <SignedOutStack />}</>;
};

export default AuthStack;
