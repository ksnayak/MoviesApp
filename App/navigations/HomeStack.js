import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Navbar from '../components/NavBar';
import Home from '../screens/Home';
import Detail from '../screens/Detail';
import Search from '../screens/Search';
import VideoPlayer from '../screens/VideoPlayer';

const Stack = createStackNavigator();

const HomeStack = ({route}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DetailStack"
        component={DetailStack}
        options={{
          headerShown: false,
          // headerTransparent: true,
          // header: ({navigation}) => <Navbar navigation={navigation} />,
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

const DetailStack = () => {
  return (
    <Stack.Navigator initialRouteName="Detail">
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          headerTransparent: true,
          header: ({navigation}) => <Navbar navigation={navigation} />,
        }}
      />
      <Stack.Screen
        name="VideoPlayer"
        component={VideoPlayer}
        options={{
          headerShown: false,
          // headerTransparent: true,
          // header: ({navigation}) => <Navbar navigation={navigation} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
