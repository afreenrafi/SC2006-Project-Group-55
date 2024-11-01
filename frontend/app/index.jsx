import React from 'react';
import { AppProvider } from './context/AppContext';
import { NavigationContainer } from '@react-navigation/native';
import MainLayout from './_layout'; // Adjust the path if necessary

const App = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <MainLayout />
      </NavigationContainer>
    </AppProvider> 
  );
};

export default App;
