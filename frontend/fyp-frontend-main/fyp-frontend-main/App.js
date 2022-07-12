import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import MyNav from './Navigation/MyNav';
import AuthProvider from './context/AuthContext';
import {
  LogBox,
} from 'react-native';
LogBox.ignoreAllLogs();

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider >
        <MyNav />
      </AuthProvider >
    </NavigationContainer>
  );
};

export default App;
