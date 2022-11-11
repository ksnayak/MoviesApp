import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';

import Home from './Home';

const reducers = combineReducers({
  Home: Home,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['Home'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export default store;
