import React from 'react';
import { AppProvider } from './context/AppContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './tabs/_layout'; // Adjust the path if necessary
import Login from './auth/Login'; // Adjust the path if necessary
//startup pages
import LoginAccount from './startup/LoginAccount';
import Details from './startup/Details';
import Setup from './startup/Setup';
import OrgValidation from './startup/OrgValidation';
//event pages
import EventsPage from './events/EventsPage';
import BuyTickets from './events/BuyTickets';
import OrderDetails from './events/OrderDetails';
import BookingComplete from './events/BookingComplete';

const Stack = createNativeStackNavigator();

const MainLayout = () => {
  return (
    <AppProvider>
    <Stack.Navigator initialRouteName="auth">
      <Stack.Screen
        name="auth"
        component={Login}
        options={{ headerShown: false,
          title: 'Login', 
         }}
      />
      <Stack.Screen
        name="startup/LoginAccount"
        component={LoginAccount}
        options={{ headerShown: false,
          title: 'Account Login',
          gestureEnabled: false
         }}
      />
      <Stack.Screen
        name="startup/Details"
        component={Details}
        options={{ headerShown: false,
          title: 'Your Details', 
          
         }}
      />
      <Stack.Screen
        name="startup/Setup"
        component={Setup}
        options={{ headerShown: false,
          title: 'Setup',
          gestureEnabled: false
         }}
      />
      <Stack.Screen
        name="startup/OrgValidation"
        component={OrgValidation}
        options={{ headerShown: false,
          title: 'Organisation Validation',
          gestureEnabled: false
         }}
      />



      <Stack.Screen
        name="events/EventsPage"
        component={EventsPage}
        options={{ headerShown: false,
          title: 'Event Page'
         }}
      />
      <Stack.Screen
        name="events/BuyTickets"
        component={BuyTickets}
        options={{ headerShown: false,
          title: 'Buy Tickets'
         }}
      />
      <Stack.Screen
        name="events/OrderDetails"
        component={OrderDetails}
        options={{ headerShown: false,
          title: 'Order Details'
         }}
      />
      <Stack.Screen
        name="events/BookingComplete"
        component={BookingComplete}
        options={{ headerShown: false,
          title: 'Booking Complete'
         }}
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
