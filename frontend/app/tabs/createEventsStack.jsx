import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateEvents from './createEvents';
import EventCreationForm from './eventCreationForm';

const CreateEventsStack = createNativeStackNavigator();

const CreateEventsNavigator = () => {
  return (
    <CreateEventsStack.Navigator>
      <CreateEventsStack.Screen 
        name="CreateEvents" 
        component={CreateEvents} 
        options={{ headerShown: false }} 
      />
      <CreateEventsStack.Screen 
        name="EventCreationForm" 
        component={EventCreationForm} 
        options={{ headerShown: false }} 
      />
    </CreateEventsStack.Navigator>
  );
};

export default CreateEventsNavigator;
