import React from 'react';
import { AppProvider } from './context/AppContext';
import { NavigationContainer } from '@react-navigation/native';
import MainLayout from './_layout'; // Adjust the path if necessary
import { StripeProvider } from '@stripe/stripe-react-native'; // Import StripeProvider
import 'react-native-get-random-values';

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
    <StripeProvider publishableKey="pk_test_51QAT4iFJii7b5f1yg8TXWw5pk1snYe3SzS1yRsD50msnjFX70C1lpRXHN5h3OO7gsjEGmbVEpJyRvpLOAQp1M90r003Sn6VETM">
    <AppProvider>
      <NavigationContainer linking={linking}>
        <MainLayout />
      </NavigationContainer>
    </AppProvider> 
    </StripeProvider>
  );
};

export default App;
