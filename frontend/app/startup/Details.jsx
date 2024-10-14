import { View, SafeAreaView, Image, StyleSheet, TextInput, ActivityIndicator, Button, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import React, { useState } from "react";
import StyledText from "../../components/StyledText";
import { useNavigation } from '@react-navigation/native';
import StyledInput from "../../components/StyledInput";
import RoundBtn from "../../components/RoundBtn";
// import GenderPicker from "../../components/GenderPicker";

const Details = ({ route }) => {
  const navigation = useNavigation();
  const { lastName, firstName, gender, age, email } = route.params;

  const [editedLastName, setLastName] = useState(lastName);
  const [editedFirstName, setFirstName] = useState(firstName);
  const [editedGender, setGender] = useState(gender);
  const [editedAge, setAge] = useState(age);
  const [editedEmail, setEmail] = useState(email);

  const handleAgeChange = (text) => {
    // Ensure the input is a valid number and within the allowed range
    const numericAge = text.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    if (numericAge === '' || (parseInt(numericAge) >= 0 && parseInt(numericAge) <= 120)) {
      setAge(numericAge);
    }
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
      const userEmail = await submitUserDetails();  // Simulate sending data
      console.log("User details submitted:", userEmail);
      navigation.navigate('startup/Setup', { email: userEmail.email });  // Navigate to new page with email
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
        <StyledText size={30} textContent="Your Details" fontFam="MontserratSemibold"/>

        <View style={styles.inputs}>
          <StyledInput label={"Last Name"} data={editedLastName} onChangeText={setLastName}/>
          <StyledInput label={"First Name"} data={editedFirstName} onChangeText={setFirstName}/>
          <StyledInput label={"Gender"} data={editedGender} onChangeText={setGender}/>
          {/* <GenderPicker label="Gender" selectedValue={gender} onValueChange={setGender} /> */}
          <StyledInput label={"Age"} data={editedAge} onChangeText={handleAgeChange} type="numeric"/>
          <StyledInput label={"Email"} data={editedEmail} onChangeText={setEmail}/>
        {/* <Image style={styles.logo} source={require('../../assets/logo/singpass_logo.png')} /> */}
        </View>
        <View style={styles.btnContainer}>
          <RoundBtn onPress={handleNext}/>
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
  inputs: {
    width: "100%",
    paddingVertical: 40,
    paddingHorizontal: "5%",
  },
  btnContainer:{
    width: "100%",
    paddingHorizontal: "5%",
  }

});

export default Details;
