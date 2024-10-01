import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const ImageComponent = ({ imageUrl, borderRadius }) => {
  // console.log('Rendering image:', imageUrl); // Debugging line

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUrl }}
        style={[styles.image, { borderRadius }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%', // Set the width of the image
    height: '100%', // Set the height of the image
    // height: 300,
    resizeMode: 'cover', // You can change this to 'contain', 'stretch', etc.
  },
});

export default ImageComponent;
