import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Font from 'expo-font';

const StyledText = ({ size = 20, textContent = "text", alignment="center" }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      'CrimsonProRegular': require('../assets/fonts/CrimsonPro-Regular.ttf'),
    }).then(() => setFontsLoaded(true));
  }, []);


  return (
    <View style={styles.container}>
      <Text style={[styles.text, {fontSize: size, textAlign: alignment }]}>
        { textContent }
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  text: {
    fontFamily: 'CrimsonProRegular',
    fontWeight: 'normal',
  },
});

export default StyledText;