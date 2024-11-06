import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Homepage from './homepage';
import Profile from './profile';
import Ticket from './ticket';
import TicketDetails from './ticketDetails'; 
import SavedEvents from './savedEvents'
import { DefaultTheme } from '@react-navigation/native';

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

const Tab = createBottomTabNavigator();

const Tabs = ({ route }) => {
  const { username, role } = route.params;
  return (
      <Tab.Navigator
        initialRouteName="Homepage"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Homepage') {
              iconName = focused ? 'home-outline' : 'home';
            } else if (route.name === 'Ticket') {
              iconName = focused ? 'ticket-outline' : 'ticket';
            } else if (route.name === 'SavedEvents') {
              iconName = focused ? 'bookmark-outline' : 'bookmark';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person-outline' : 'person';
            }
            return (
              <View style={[styles.iconContainer, focused && styles.focusedIconContainer]}>
                <Ionicons name={iconName} size={size} color={color} />
              </View>
            );
          },
          tabBarActiveTintColor: '#FFF',
          tabBarInactiveTintColor: '#000',
          tabBarStyle: {
            backgroundColor: '#FFF',
          },
          // tabBarActiveBackgroundColor: 'rgba(255, 255, 255, 0.3)',
          tabBarItemStyle: {
            borderRadius: 50,
          },
          tabBarShowLabel: false,
        })}
      >
        <Tab.Screen options={{ headerShown: false }} name="Homepage" component={Homepage} initialParams={{ username, role }}/>
        <Tab.Screen options={{ headerShown: false }} name="Ticket" component={Ticket} initialParams={{ username, role }}/>
        <Tab.Screen options={{ headerShown: false }} name="SavedEvents" component={SavedEvents} initialParams={{ username, role }}/>
        <Tab.Screen options={{ headerShown: false }} name="Profile" component={Profile} initialParams={{ username, role }}/>

        {/* Add TicketDetails directly to the Tabs but hide tab bar when active */}
      <Tab.Screen 
        name="TicketDetails" 
        component={TicketDetails} 
        options={{
          headerShown: false,
          tabBarButton: () => null, // Hide the tab bar button for TicketDetails
          tabBarStyle: { display: 'none' }, // Hide the tab bar on TicketDetails
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'transparent', // default background color
  },
  focusedIconContainer: {
    backgroundColor: '#CA3550', // background color when focused
  },
});

export default Tabs;