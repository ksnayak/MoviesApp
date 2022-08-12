import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigation from './App/navigations/TabNavigation';
import NotLogin from './App/screens/NotLogin';

const App = () => {
  return (
    <NavigationContainer>
      <TabNavigation />
    </NavigationContainer>
    // <NotLogin />
  );
};

export default App;
