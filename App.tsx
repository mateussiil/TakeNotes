
import React from 'react';
import { Routes } from './src/routes';
import { NavigationContainer } from '@react-navigation/native';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  )
}

export default App;
