import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import {StatusBar} from 'react-native';

import store from './App/store/store';
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
  let persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer theme={MyTheme}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={Colors.primary}
          />
          <TabNavigation />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
