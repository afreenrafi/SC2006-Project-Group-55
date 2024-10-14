import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Font from 'expo-font';

const StyledText = ({ size = 20, textContent = "text", alignment="center", fontFam="MontserratBold", fontColor="#000"}) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      'CrimsonProRegular': require('../assets/fonts/CrimsonPro-Regular.ttf'),
      'MontserratBold': require('../assets/fonts/Montserrat-Bold.ttf'),
      'MontserratSemibold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
      'MontserratRegular': require('../assets/fonts/Montserrat-Regular.ttf'),
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return null; // Ensure the fonts are loaded before rendering
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { fontSize: size, textAlign: alignment, fontFamily: fontFam, color: fontColor }]}>
        {textContent}
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
    fontWeight: 'normal',
    
  },
});

export default StyledText;