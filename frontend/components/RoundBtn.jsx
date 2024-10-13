import React, { useState, useEffect } from 'react';
import { Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Font from 'expo-font';

const RoundBtn = ({ alignment = "center", onPress }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      'MontserratBold': require('../assets/fonts/Montserrat-Bold.ttf'),
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return null; // Ensure the fonts are loaded before rendering
  }

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, styles.iosShadow, styles.androidShadow, {justifyContent: alignment}]}>
      <FontAwesome5 name="arrow-circle-right" size={24} color="#ffffff"/>
      <Text style={[styles.text]}>
        Next
      </Text>
      {/* <Image style={styles.logo} source={require('../assets/logo/singpass_logo.png')} /> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#CA3550',
    borderRadius: 50,
    paddingHorizontal: 30,
    height: 50,
    width: "100%",
    gap: 10
  },
  iosShadow: {
    shadowColor: '#000000',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  androidShadow: {
    elevation: 10,
    shadowColor: '#000000',
  },
  text: {
    fontFamily: 'MontserratBold', // Ensure the correct font is applied
    color: "#ffffff",
    fontSize: 24,
    textAlign: "center"
  },
  
});

export default RoundBtn;
