import { View, SafeAreaView, Image, StyleSheet, TextInput, ActivityIndicator, Button, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import React, { useState } from "react";
import StyledText from "../../components/StyledText";
import { useNavigation } from '@react-navigation/native';
import StyledInput from "../../components/StyledInput";
import RoundBtn from "../../components/RoundBtn";
import Entypo from '@expo/vector-icons/Entypo';


const Setup = ({ route }) => {
  const navigation = useNavigation();

  const { email } = route.params;

  const [Username, setUsername] = useState('');
  const [Role, setRole] = useState('');
  const [Password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

 



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
          <StyledInput label={"Password"} pwd="true"/>
          <View style={styles.bullets}>
            <Entypo name="dot-single" size={24} color="#8B8B8B" />
            <StyledText size={18} textContent="must include at least 8 characters" fontFam="MontserratRegular" fontColor="#8B8B8B"/>
          </View>
          <View style={styles.bullets}>
            <Entypo name="dot-single" size={24} color="#8B8B8B" />
            <StyledText size={18} textContent="must include at least 1 special character" fontFam="MontserratRegular" fontColor="#8B8B8B"/>
          </View>
          <View style={styles.bullets}>
            <Entypo name="dot-single" size={24} color="#8B8B8B" />
            <StyledText size={18} textContent="must include at least 1 number" fontFam="MontserratRegular" fontColor="#8B8B8B"/>
          </View>
          <StyledInput label={"Re-enter Password"} pwd="true"/>
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
  },
  bullets: {
    display: 'flex',
    flexDirection: 'row'
  }

});

export default Setup;
