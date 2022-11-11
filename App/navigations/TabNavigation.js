import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeStack from './HomeStack';
import AuthStack from './AuthStack';
import Colors from '../configs/Color';
import FavoritesScreen from '../screens/FavoritesScreen';

const Tab = createBottomTabNavigator();

const screenOptions = {
  headerShown: false,
  tabBarShowLabel: false,
  tabBarInactiveTintColor: Colors.white,
  tabBarActiveTintColor: Colors.secondary,
};

const TabNavigation = () => {
  return (
    <Tab.Navigator initialRouteName="main" screenOptions={screenOptions}>
      <Tab.Screen
        name="Favorite"
        component={FavoritesScreen}
        options={({route}) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
            backgroundColor: Colors.primary,
          },
          tabBarIcon: ({color, size}) => (
            <Ionicons name="ios-star-outline" color={color} size={size} />
          ),
        })}
      />

      <Tab.Screen
        name="main"
        component={HomeStack}
        options={({route}) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
            backgroundColor: Colors.primary,
          },
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Auth"
        component={AuthStack}
        options={({route}) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
            backgroundColor: Colors.primary,
          },
          tabBarIcon: ({color, size}) => (
            <Image
              source={{
                uri: 'https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/48/000000/external-user-user-tanah-basah-basic-outline-tanah-basah-3.png',
              }}
              style={{width: size, height: size, tintColor: color}}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

const getTabBarVisibility = route => {
  const routeName = getFocusedRouteNameFromRoute(route);
  if (
    routeName === 'Detail' ||
    routeName === 'Login' ||
    routeName === 'Signup'
  ) {
    return 'none';
  }
  return 'flex';
};

export default TabNavigation;
