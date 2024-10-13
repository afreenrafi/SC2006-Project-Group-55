import { View, SafeAreaView, Image, StyleSheet, TextInput, ActivityIndicator, Button, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import React, { useState } from "react";
import StyledText from "../../components/StyledText";
import { useNavigation } from '@react-navigation/native';
import StyledInput from "../../components/StyledInput";
import RoundBtn from "../../components/RoundBtn";


const Setup = ({ route }) => {
  const navigation = useNavigation();
  const { email } = route.params;

 

  // Dummy API call to simulate submitting the user details
//   const submitUserDetails = async () => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve({ editedEmail });  
//       }, 2000);
//     });
//   };

  const handleNext = async () => {
    // try {
    //   const result = await submitUserDetails();  // Simulate sending data
    //   console.log("User details submitted:", result);
    //   navigation.navigate('NextPage', { email: result.email });  // Navigate to new page with email
    // } catch (error) {
    //   console.error("Failed to submit details:", error);
    // }
  }



  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <StyledText size={30} textContent="Your Details" fontFam="MontserratSemibold"/>

        <View style={styles.inputs}>
          <StyledInput label={"Username"} />
          <StyledInput label={"Role"} />
          <StyledInput label={"Password"} />
          <StyledInput label={"Re-enter Password"} />
          {/* <StyledInput label={"Email"} data={email} onChangeText={setEmail}/> */}
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

export default Setup;
