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

  const [editedDisplayName, setDisplayName] = useState(""); 
  const [nameError, setNameError] = useState("");

  const [editedGender, setGender] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [genderError, setGenderError] = useState("");

  const [editedAge, setAge] = useState("");
  const [ageError, setAgeError] = useState(0);

  const [editedEmail, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");  // State to hold email error message

  // Validation functions
  const validateName = (name) => name.trim().length > 0;
  const validateAge = (age) => /^[0-9]+$/.test(age) && parseInt(age) >= 0 && parseInt(age) <= 100;
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateGender = (gender) => !!gender; // Checks if gender is selected

  const handleNameChange = (text) => {
    setDisplayName(text);
  };
  
  const handleAgeChange = (text) => {
    const numericAge = text.replace(/[^0-9]/g, '');
    if (validateAge(numericAge) || text === '') {
      setAge(numericAge);
      setAgeError("");
    } else {
      setAgeError("Age must be a number between 0 and 120.");
    }
  };
  
  const handleEmailChange = (text) => {
    setEmail(text);
    if (validateEmail(text)) {
      setEmailError("");
    } else {
      setEmailError("Invalid email format.");
    }
  };
  
  const handleGenderSelect = (selectedGender) => {
    if (validateGender(selectedGender)) {
      setGender(selectedGender);
      setGenderError("");
      setModalVisible(false);
    } else {
      setGenderError("Gender cannot be empty.");
    }
  };


  // Dummy API call that simulates submitting the user details
  // const submitUserDetails = async (email, displayName, age, gender) => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       console.log("Submitting the following data:");
  //       console.log({ email, displayName, age, gender });  // Log the data that would be submitted
  //       resolve({ email });  // Simulate that the email is returned from the API
  //     }, 2000);  // Simulate a 2-second delay
  //   });
  // };

  const handleNext = async () => {
    const isNameValid = validateName(editedDisplayName);
    const isAgeValid = validateAge(editedAge);
    const isEmailValid = validateEmail(editedEmail);
    const isGenderValid = validateGender(editedGender);
  
    if (!isNameValid) setNameError("Name cannot be empty or just spaces.");
    else setNameError("");
    if (!isAgeValid) setAgeError("Age must be a number between 0 and 120.");
    if (!isEmailValid) setEmailError("Invalid email format.");
    if (!isGenderValid) setGenderError("Gender cannot be empty.");
  
    // If all validations pass, proceed
    if (isNameValid && isAgeValid && isEmailValid && isGenderValid) {
      try {
        // const userEmail = await submitUserDetails(editedEmail, editedDisplayName, editedAge, editedGender);
        const trimName = editedDisplayName.trim(); 
        console.log({ editedEmail, trimName, editedAge, editedGender });  
        navigation.navigate('startup/Setup', {
          email: editedEmail,
          name: trimName,
          age: editedAge,
          gender: editedGender,
        });
      } catch (error) {
        console.error("Failed to submit details:", error);
      }
    } else {
      console.error("Please correct the errors before proceeding.");
    }
  };



  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        {/* <StyledText size={30} textContent="Your Details" /> */}
        <PageHeader title={"Registration"} onPress={()=>navigation.goBack()} fontSize={30}/>

        <View style={styles.inputs}>
          <StyledInput label={"Display Name"} data={editedDisplayName} onChangeText={handleNameChange}/>
          {/* <StyledInput label={"First Name"} data={editedFirstName} onChangeText={setFirstName}/> */}
          {nameError ? <StyledText size={16} textContent={nameError} fontColor="#CA3550" /> : null}

          <SelectInput label={"Gender"} data={editedGender} onPress={() => setModalVisible(true)}/>
          {genderError ? <StyledText size={16} textContent={genderError} fontColor="#CA3550" /> : null}

          <StyledInput label={"Age"} data={editedAge} onChangeText={handleAgeChange} type="numeric"/>
          {ageError ? <StyledText size={16} textContent={ageError} fontColor="#CA3550" /> : null}

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
  

});

export default Details;
