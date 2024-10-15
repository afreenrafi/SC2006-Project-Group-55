import React, { useState, useEffect } from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import * as Font from 'expo-font';

const StyledInput = ({ label, data, onChangeText, type="string", pwd="false", edit="true" }) => {
  // const [text, onChangeText] = React.useState({data});
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
      <TextInput 
        style={styles.input}
        value={data}
        placeholder={label}
        onChangeText={onChangeText}
        keyboardType={type}
        secureTextEntry={pwd}
        editable={edit}
      />
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
    fontFamily: "CrimsonProRegular",
    fontSize: 26,
    marginBottom: 5
  }
});

export default StyledInput;
