import React, { useState, useEffect } from 'react';
import { TextInput, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';
import StyledText from './StyledText';
import { Ionicons } from '@expo/vector-icons';

const PageHeader = ({ title, onPress }) => {
  // const [text, onChangeText] = React.useState({data});

  return (
    <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onPress}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <StyledText size={30} textContent={title}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: "100%",
    paddingVertical: 5,
  },
  input: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#000000",
    height: 40,
    width: "100%",
    borderStyle: 'solid',
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 26,
    marginBottom: 5
  },
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    // backgroundColor: "#fff",
    position: "relative",
  },
  backBtn: {
    position: "absolute",
    left: 30,
  },
});

export default PageHeader;
