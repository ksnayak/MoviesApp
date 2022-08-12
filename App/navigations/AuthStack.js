import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

import NotLogin from '../screens/NotLogin';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Profile from '../screens/Profile';

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
  <Stack.Navigator initialRouteName="NotLogin" screenOptions={screenOptions}>
    <Stack.Screen name="NotLogin" component={NotLogin} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Signup" component={Signup} />
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
