
import React from 'react';
import { Routes } from './src/routes';
import { NavigationContainer } from '@react-navigation/native';
import FloatButton from './src/components/FloatButton';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Routes />
      <FloatButton />
    </NavigationContainer>
  )
}

export default App;
