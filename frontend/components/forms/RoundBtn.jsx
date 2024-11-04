import React, { useState, useEffect } from 'react';
import { Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const RoundBtn = ({ alignment = "center", onPress, text, icon, disabled=false }) => {
 

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} 
    style={[styles.container, styles.iosShadow, styles.androidShadow, 
    {justifyContent: alignment, backgroundColor: disabled ? "#5C5C5C" : "#CA3550"}]}>
      <FontAwesome5 name={icon}  size={24} color="#ffffff"/>
      <Text style={[styles.text]}>
        {text}
        {/* name="arrow-circle-right" */}
      </Text>
      {/* <Image style={styles.logo} source={require('../assets/logo/singpass_logo.png')} /> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#CA3550',
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
    color: "#ffffff",
    fontSize: 24,
    textAlign: "center"
  },
  
});

export default RoundBtn;
