import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import DirectMessage from './directMessage';
import Homepage from './homepage';
import Profile from './profile';
import SharingPlace from './sharingPlace';
import CreatePost from './CreatePost';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
      <Tab.Navigator
        initialRouteName="Homepage"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Homepage') {
              iconName = focused ? 'home-outline' : 'home';
            } else if (route.name === 'SharingPlace') {
              iconName = focused ? 'storefront-outline' : 'storefront';
            } else if (route.name === 'DirectMessage') {
              iconName = focused ? 'chatbox-outline' : 'chatbox';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person-outline' : 'person';
            } else if (route.name === 'CreatePost') {
              iconName = focused ? 'add-circle-outline' : 'add-circle';
            }

            return (
              <View style={[styles.iconContainer, focused && styles.focusedIconContainer]}>
                <Ionicons name={iconName} size={size} color={color} />
              </View>
            );
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'white',
          tabBarStyle: {
            backgroundColor: '#5D7971',
          },
          // tabBarActiveBackgroundColor: 'rgba(255, 255, 255, 0.3)',
          tabBarItemStyle: {
            borderRadius: 50,
          },
          tabBarShowLabel: false,
        })}
      >
        <Tab.Screen options={{ headerShown: false }} name="Homepage" component={Homepage} />
        <Tab.Screen options={{ headerShown: false }} name="SharingPlace" component={SharingPlace} />
        <Tab.Screen options={{ headerShown: false }} name="CreatePost" component={CreatePost} />
        <Tab.Screen options={{ headerShown: false }} name="DirectMessage" component={DirectMessage} />
        <Tab.Screen options={{ headerShown: false }} name="Profile" component={Profile} />
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
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // background color when focused
  },
});

export default Tabs;