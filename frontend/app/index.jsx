import React from 'react';
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
    <NavigationContainer linking={linking}>
      <MainLayout />
    </NavigationContainer>
  );
};

export default App;
