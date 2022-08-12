import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import HomeStack from './HomeStack';
import AuthStack from './AuthStack';
import Colors from '../configs/Color';

const Tab = createBottomTabNavigator();

const screenOptions = {
  headerShown: false,
  tabBarShowLabel: false,
  tabBarStyle: {
    backgroundColor: Colors.primary,
  },
  tabBarInactiveTintColor: Colors.white,
  tabBarActiveTintColor: Colors.secondary,
};

const TabNavigation = () => {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <Tab.Screen
        name="main"
        component={HomeStack}
        options={({route}) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
            backgroundColor: Colors.primary,
            borderTopEndRadius: 10,
            borderTopStartRadius: 10,
          },
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Auth"
        component={AuthStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={{
                uri: 'https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/48/000000/external-user-user-tanah-basah-basic-outline-tanah-basah-3.png',
              }}
              style={{width: size, height: size, tintColor: color}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const getTabBarVisibility = route => {
  const routeName = getFocusedRouteNameFromRoute(route);
  return routeName === 'Detail' ? 'none' : 'flex';
};

export default TabNavigation;
