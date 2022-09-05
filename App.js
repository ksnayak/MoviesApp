import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import TabNavigation from './App/navigations/TabNavigation';
import Colors from './App/configs/Color';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.white,
  },
};

const App = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <TabNavigation />
    </NavigationContainer>
  );
};

export default App;
