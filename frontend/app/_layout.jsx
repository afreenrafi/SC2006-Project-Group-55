import React from 'react';
import { AppProvider } from './context/AppContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './tabs/_layout'; // Adjust the path if necessary
import Login from './auth/Login'; // Adjust the path if necessary

const Stack = createNativeStackNavigator();

const MainLayout = () => {
  return (
    <AppProvider>
      <Stack.Navigator initialRouteName="auth">
        <Stack.Screen
          name="auth"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="tabs"
          component={Tabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </AppProvider>
  );
};

export default MainLayout;
