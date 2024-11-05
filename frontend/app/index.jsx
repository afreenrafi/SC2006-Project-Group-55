import React from 'react';
import { AppProvider } from './context/AppContext';
import { NavigationContainer } from '@react-navigation/native';
import MainLayout from './_layout'; // Adjust the path if necessary

const linking = {
  prefixes: ['cultivate://'], // Custom scheme you defined in app.json
  config: {
    screens: {
      Home: 'home',
      Profile: 'profile/:id', // Example of a deep link to a profile with an ID
    },
  },
};


const App = () => {
  

  return (
    <AppProvider>
      <NavigationContainer linking={linking}>
        <MainLayout />
      </NavigationContainer>
    </AppProvider> 
  );
};

export default App;
