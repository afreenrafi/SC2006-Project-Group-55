import { View, Text, SafeAreaView, Alert, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from "react-native";
import React, { useState } from "react";
import StyledText from "../../components/forms/StyledText";
import { useNavigation } from '@react-navigation/native';
import RoundBtn from "../../components/forms/RoundBtn";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const OrgValidation = ({ route }) => {
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // // Dummy API call that simulates submitting the user details
  // const submitAccountDetails = async (email, username, role, password) => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       console.log("Submitting the following data:");
  //       console.log({ email, username, role, password });  
  //       resolve({ 
  //         email, role
  //       });  
  //     }, 2000);  
  //   });
  // };

  const handleImageUpload = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
  
    if (!result.canceled) {
      setImageUri(result.uri);
      const base64 = await FileSystem.readAsStringAsync(result.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setBase64Image(base64);  // Store the base64 encoded image
      console.log("Image converted to base64:", base64);
    }
  };

  const uploadImage = async () => {
    if (!base64Image) {
      Alert.alert("Image Required", "Please select an image to upload.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/authRoute/uploadEventPermit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          organiserEventPermitId: base64Image, // Send the image as base64
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Upload result:", result);
        Alert.alert("Success", "Event permit uploaded successfully.");
        setUploadSuccess(true); // Set success to true on successful upload
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Failed to upload image:", error);
      Alert.alert("Upload Failed", "There was an error uploading the image.");
    }
  };


  const handleNext = () => {
    if (uploadSuccess) {
      console.log("Navigating to the next screen.");
      navigation.navigate('tabs');
    } else {
      Alert.alert("Upload Required", "Please upload an event permit before proceeding.");
    }
  };
    
    // try {
    //   const result = await submitUserDetails();  // Simulate sending data
    //   console.log("User details submitted:", result);
    //   navigation.navigate('NextPage', { email: result.email });  // Navigate to new page with email
    // } catch (error) {
    //   console.error("Failed to submit details:", error);
    // }

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={styles.container}>
          <StyledText size={30} textContent="Organiser Verification" />
          
          <View style={styles.imageUploadContainer}>
            <TouchableOpacity style={styles.imageUpload} onPress={handleImageUpload}>
              {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.uploadedImage} />
              ) : (
                <StyledText size={18} textContent="Image upload" />
              )}
            </TouchableOpacity>
          </View>
  
          <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
            <Text style={styles.uploadButtonText}>Upload Event Permit</Text>
          </TouchableOpacity>
  
          <View style={styles.btnContainer}>
            <RoundBtn onPress={handleNext} text="Next" />
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  };
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBF3F1",
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  imageUploadContainer: {
    width: "90%",
    alignItems: "center",
    marginVertical: 20,
    backgroundColor: "#FFF",
  },
  imageUpload: {
    width: "100%",
    height: 150,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadedImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  uploadButton: {
    backgroundColor: "#FFF",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 10,
    width: '50%',
  },
  uploadButtonText: {
    color: "#000",
    fontSize: 12,
    fontWeight: "bold",
  },
  btnContainer:{
    width: "100%",
    paddingHorizontal: "5%",
    marginVertical: 10,
  },
});

export default OrgValidation;
