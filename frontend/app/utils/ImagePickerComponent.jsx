import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';

const ImagePickerComponent = ({ route }) => {
  const { handleUploadedImage } = route.params;
  const [selectedImage, setSelectedImage] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      const imagePickerStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (imagePickerStatus.status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  const handleOpenCamera = async () => {
    if (hasPermission) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log('Camera result:', result);  // Log the entire result

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setSelectedImage({ uri });
        handleUploadedImage(uri);
        console.log('URI:', uri);
        navigation.goBack();  // Navigate back to the previous screen
      } else {
        alert('Image capture was cancelled');
      }
    } else {
      alert('Camera permissions not granted');
    }
  };

  const handleOpenGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log('Gallery result:', result);  // Log the entire result

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setSelectedImage({ uri });
      handleUploadedImage(uri);
      console.log('URI:', uri);
      navigation.goBack();  // Navigate back to the previous screen
    } else {
      alert('Image selection was cancelled');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {selectedImage && <Image source={selectedImage} style={styles.image} />}
      <TouchableOpacity style={styles.button} onPress={handleOpenCamera}>
        <Text style={styles.buttonText}>Open Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleOpenGallery}>
        <Text style={styles.buttonText}>Upload Image</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    height: '100%',
    width: '100%',
    backgroundColor: '#5D7971',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#3E6B48',
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 50,
    marginVertical: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 19,
  },
});

export default ImagePickerComponent;

