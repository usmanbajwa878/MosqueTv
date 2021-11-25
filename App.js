/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import SearchScreen from './src/screens/SearchScreen';
import {Provider} from 'react-redux';
import STORE from './src/store/index';
import {PersistGate} from 'redux-persist/integration/react';
import AppNavigator from './src/navigation';
import SplashScreen  from 'react-native-splash-screen';


const App = () => {

  useEffect(()=>{
    SplashScreen.hide()
  },[])

  return (

   <Provider store={STORE.store}>
      <PersistGate loading={null} persistor={STORE.persistor}>
      <AppNavigator />
      </PersistGate>
    </Provider>
  );
};


export default App;
