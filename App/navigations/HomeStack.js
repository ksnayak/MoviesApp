import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Navbar from '../components/NavBar';
import Home from '../screens/Home';
import Detail from '../screens/Detail';
import Search from '../screens/Search';

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
