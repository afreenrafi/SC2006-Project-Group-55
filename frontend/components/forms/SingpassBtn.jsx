import React, { useState, useEffect } from 'react';
import { Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as Font from 'expo-font';

const SingpassBtn = ({ size = 20, alignment = "center", onPress }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, styles.iosShadow, styles.androidShadow]}>
      <Text style={[styles.text, { fontSize: size, textAlign: alignment }]}>
        Login with
      </Text>
      <Image style={styles.logo} source={require('../../assets/logo/singpass_logo.png')} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 50,
    paddingHorizontal: 30,
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
  logo: {
    height: 50,
    width: '35%',
    marginLeft: 10,
    marginTop: 5,
    resizeMode: 'contain',
  },
});

export default SingpassBtn;
