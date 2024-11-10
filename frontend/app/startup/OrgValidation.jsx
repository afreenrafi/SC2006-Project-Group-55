import { View, TextInput, Text, SafeAreaView, Alert, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from "react-native";
import React, { useState } from "react";
import StyledText from "../../components/forms/StyledText";
import { useNavigation } from '@react-navigation/native';
import RoundBtn from "../../components/forms/RoundBtn";

const OrgValidation = ({ route }) => {
  const navigation = useNavigation();
  const [permitId, setPermitId] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const uploadEventPermitId = async () => {
    if (!permitId) {
      Alert.alert("Event Permit ID Required", "Please enter an event permit ID.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/authRoute/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          organiserEventPermitId: permitId, // Send the event permit ID
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Upload result:", result);
        Alert.alert("Success", "Event permit ID uploaded successfully.");
        setUploadSuccess(true); // Set success to true on successful upload
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      if (error.response) {
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
        console.log("Response headers:", error.response.headers);
      } else if (error.request) {
        console.log("Request data:", error.request);
      } else {
        console.log("Error message:", error.message);
      }
      console.error("Failed to upload permit ID:", error);
      Alert.alert("Upload Failed", "There was an error uploading the permit ID.");
    }    
  };

  const handleNext = () => {
    if (uploadSuccess) {
      console.log("Navigating to the next screen.");
      navigation.navigate('tabs', { email: email, role: Role });
    } else {
      Alert.alert("Upload Required", "Please upload an event permit ID before proceeding.");
    }
  };
    
  return (
    <SafeAreaView style={styles.container}>
      <StyledText size={30} textContent="Organiser Verification" />
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Event Permit ID:</Text>
        <TextInput 
          style={styles.input}
          placeholder="permitYYYY-###"
          value={permitId}
          onChangeText={setPermitId}
        />
      </View>
  
      <TouchableOpacity style={styles.uploadButton} onPress={uploadEventPermitId}>
        <Text style={styles.uploadButtonText}>Upload Event Permit ID</Text>
      </TouchableOpacity>
  
      <View style={styles.btnContainer}>
        <RoundBtn onPress={handleNext} text="Next" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBF3F1",
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  inputContainer: {
    width: "90%",
    alignItems: "center",
    marginVertical: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
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