import { View, SafeAreaView, TouchableOpacity, StyleSheet, Modal, Text, Button, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import React, { useState } from "react";
import StyledText from "../../components/forms/StyledText";
import { useNavigation } from '@react-navigation/native';
import StyledInput from "../../components/forms/StyledInput";
import RoundBtn from "../../components/forms/RoundBtn";
import SelectInput from "../../components/forms/SelectInput";
import SelectModal from "../../components/forms/SelectModal";
import PageHeader from "../../components/events/PageHeader";

const Details = ({ route }) => {
  const navigation = useNavigation();
  // const { lastName, firstName, gender, age, email } = route.params;

  const [editedLastName, setLastName] = useState("");
  const [editedFirstName, setFirstName] = useState("");

  const [editedGender, setGender] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [editedAge, setAge] = useState("");

  const [editedEmail, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");  // State to hold email error message

  const handleAgeChange = (text) => {
    // Ensure the input is a valid number and within the allowed range
    const numericAge = text.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    if (numericAge === '' || (parseInt(numericAge) >= 0 && parseInt(numericAge) <= 120)) {
      setAge(numericAge);
    }
  };

  const handleEmailChange = (text) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
    if (!emailRegex.test(text)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");  // Clear error if email is valid
    }
    setEmail(text);  // Update the email state
  };

  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);  // Set the gender value based on the selection
    setModalVisible(false);     // Close the modal
  };


  // Dummy API call that simulates submitting the user details
  const submitUserDetails = async (email, firstName, lastName, age, gender) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Submitting the following data:");
        console.log({ email, firstName, lastName, age, gender });  // Log the data that would be submitted
        resolve({ email });  // Simulate that the email is returned from the API
      }, 2000);  // Simulate a 2-second delay
    });
  };

  const handleNext = async () => {
    try {
      if(emailError==""){
        const userEmail = await submitUserDetails(editedEmail, editedFirstName, editedLastName, editedAge, editedGender);
        console.log("User details submitted:", userEmail);
        navigation.navigate('startup/Setup', { email: userEmail.email, age: editedAge, name: editedFirstName + " " + editedLastName });  // Navigate to new page with email
      }
    } catch (error) {
      console.error("Failed to submit details:", error);
    }
  }



  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        {/* <StyledText size={30} textContent="Your Details" /> */}
        <PageHeader title={"Registration"} onPress={()=>navigation.goBack()} fontSize={30}/>

        <View style={styles.inputs}>
          <StyledInput label={"Last Name"} data={editedLastName} onChangeText={setLastName}/>
          <StyledInput label={"First Name"} data={editedFirstName} onChangeText={setFirstName}/>
          <SelectInput label={"Gender"} data={editedGender} onPress={() => setModalVisible(true)}/>
          <StyledInput label={"Age"} data={editedAge} onChangeText={handleAgeChange} type="numeric"/>
          <StyledInput label={"Email"} data={editedEmail} onChangeText={handleEmailChange}/>
          {emailError ? <StyledText size={16} textContent={emailError} fontColor="#CA3550" /> : null}

        {/* <Image style={styles.logo} source={require('../../assets/logo/singpass_logo.png')} /> */}
        </View>
        <View style={styles.btnContainer}>
          <RoundBtn onPress={handleNext} text="Next" icon="arrow-circle-right"/>
        </View>

        <SelectModal 
        modalTitle="Select Gender" 
        modalVisible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        oneOptPress={() => handleGenderSelect("Male")} 
        twoOptPress={() => handleGenderSelect("Female")} 
        optOne="Male"
        optTwo="Female"
        />

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
  inputs: {
    width: "100%",
    paddingBottom: 40,
    paddingHorizontal: "5%",
  },
  btnContainer:{
    width: "100%",
    paddingHorizontal: "5%",
  },
  // modalOverlay: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: "rgba(0, 0, 0, 0.5)",  // Semi-transparent background
  // },
  // modalView: {
  //   width: 300,
  //   backgroundColor: "white",
  //   borderRadius: 20,
  //   padding: 20,
  //   alignItems: "center",
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 4,
  //   elevation: 5,
  // },
  // modalOptions: {
  //   alignItems: "center",
  //   paddingVertical: 30,
  //   gap: 10
  // },
  // modalItem: {
  //   paddingVertical: 10,
  //   width: "100%",
  //   alignItems: "center",
  //   backgroundColor: "#CA3550",
  //   borderRadius: 20,
  //   padding: 20,
  // },
  // modalText: {
  //   fontSize: 18,
  //   color: "#333",
  // },

});

export default Details;
