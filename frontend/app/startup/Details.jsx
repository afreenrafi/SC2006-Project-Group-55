import { View, SafeAreaView, TouchableOpacity, StyleSheet, Modal, Text, Button, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import React, { useState } from "react";
import StyledText from "../../components/StyledText";
import { useNavigation } from '@react-navigation/native';
import StyledInput from "../../components/StyledInput";
import RoundBtn from "../../components/RoundBtn";
import SelectInput from "../../components/SelectInput";

const Details = ({ route }) => {
  const navigation = useNavigation();
  const { lastName, firstName, gender, age, email } = route.params;

  const [editedLastName, setLastName] = useState(lastName);
  const [editedFirstName, setFirstName] = useState(firstName);

  const [editedGender, setGender] = useState(gender);
  const [modalVisible, setModalVisible] = useState(false);

  const [editedAge, setAge] = useState(age);

  const [editedEmail, setEmail] = useState(email);
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
        navigation.navigate('startup/Setup', { email: userEmail.email });  // Navigate to new page with email
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
        <StyledText size={30} textContent="Your Details" />

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

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}  // Close the modal on request
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalView}>
              <StyledText size={24} textContent="Select Gender" />
              <View style={styles.modalOptions}>
                <TouchableOpacity style={styles.modalItem} onPress={() => handleGenderSelect("Male")}>
                  {/* <Text style={styles.modalText}>Male</Text> */}
                  <StyledText size={20} textContent="Male" underline="true"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalItem} onPress={() => handleGenderSelect("Female")}>
                  {/* <Text style={styles.modalText}>Female</Text> */}
                  <StyledText size={20} textContent="Female" underline="true"/>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

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
    paddingVertical: 40,
    paddingHorizontal: "5%",
  },
  btnContainer:{
    width: "100%",
    paddingHorizontal: "5%",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",  // Semi-transparent background
  },
  modalView: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalOptions: {
    alignItems: "center",
    paddingVertical: 30,
  },
  modalItem: {
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    color: "#333",
  },

});

export default Details;
