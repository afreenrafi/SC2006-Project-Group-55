import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Install this package if you don't have it
import * as Font from 'expo-font';

const GenderPicker = ({ label, selectedValue, onValueChange }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      'CrimsonProRegular': require('../assets/fonts/CrimsonPro-Regular.ttf'),
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return null; // Prevent rendering until fonts are loaded
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          style={styles.picker}
          onValueChange={(itemValue) => onValueChange(itemValue)}
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          {/* <Picker.Item label="Other" value="Other" />
          <Picker.Item label="Prefer not to say" value="Prefer not to say" /> */}
        </Picker>
      </View>
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
  pickerContainer: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#000000",
    height: 50,
    width: "100%",
    justifyContent: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  text: {
    fontFamily: "CrimsonProRegular",
    fontSize: 26,
    marginBottom: 5
  },
});

export default GenderPicker;
