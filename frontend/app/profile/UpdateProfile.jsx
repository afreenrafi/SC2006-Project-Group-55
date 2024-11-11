import { View, SafeAreaView, Modal, StyleSheet, TouchableOpacity, ActivityIndicator, Button, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import React, { useState, useEffect, useCallback, useContext } from "react";
import StyledText from "../../components/forms/StyledText";
import { useNavigation } from '@react-navigation/native';
import StyledInput from "../../components/forms/StyledInput";
import RoundBtn from "../../components/forms/RoundBtn";
import Entypo from '@expo/vector-icons/Entypo';
import SelectInput from "../../components/forms/SelectInput";
import SelectModal from "../../components/forms/SelectModal";
import { registerUser } from "../../apicalls/UserApi";
import PageHeader from "../../components/events/PageHeader";
import { useFocusEffect } from '@react-navigation/native';
import { fetchUserById, updateUser } from "../../apicalls/UserApi";

import { ErrorContext } from '../context/ErrorContext';
import NetworkErrorScreen from '../../components/screen/NetworkErrorScreen';



const UpdateProfile = ({ route }) => {
  const navigation = useNavigation();

  
  const { username } = route.params;
  // console.log(username);


  // const eventUsername = "usernamebro";
  // const [userDetails, setUserDetails] = useState(null);

  const [editedEmail, setEmail] = useState('');
  const [emailError, setEmailError] = useState("");

  const [editedDisplayName, setDisplayName] = useState(''); 
  const [nameError, setNameError] = useState("");

  const [Password, setPassword] = useState('');
  const [pwdError, setPwdError] = useState(""); 

  const [rePassword, setRePassword] = useState('');
  const [rePwdError, setRePwdError] = useState(""); 

  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(true);

  const { error, handleError } = useContext(ErrorContext);
  const { clearError } = useContext(ErrorContext);

  const validateName = (name) => name.trim().length > 0;
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


  const handleEmailChange = (text) => {
    setEmail(text);
    if (validateEmail(text)) {
      setEmailError("");
    } else {
      setEmailError("Invalid email format.");
    }
  };

  const handleNameChange = (text) => {
    setDisplayName(text);
  };

  const validatePassword = (text) => {
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(text)) {
      setPwdError('Password must have at least 8 characters, 1 special character, and 1 number.');
      return false;
    } else {
      setPwdError('');
      return true;
    }
  };

  const validateRePassword = (text) => {
    setRePassword(text);
    if (text !== Password || text == ''){
      setRePwdError('Passwords do not match');
      return false;
    } else {
      setRePwdError('');
      return true;
    }
  };

  const handlePassword = (text) => {
    setPassword(text);
    // validatePassword(text);
    if (validatePassword(text) || text == '') {
      setPwdError("");
    } else {
      setPwdError("Password must have at least 8 characters, 1 special character, and 1 number.");
    }
  };
  const handleRePassword = (text) => validateRePassword(text);




  

  const getHomepageData = async ()=> {
    try{
      setLoading(true);
      clearError();

      console.log("username" + username)
      const user = await fetchUserById(username);
      console.log(JSON.stringify(user));
      setEmail(user.userEmail);
      setDisplayName(user.userName);
      


      setLoading(false);
    } catch (error) {
      console.error("Error fetching homepage details:", error);
      // handleError('Server error. Please try again later.');
      setLoading(false);
      throw error;
    }
  }

  const validateForm = () => {
    const isNameValid = validateName(editedDisplayName);
    const isEmailValid = validateEmail(editedEmail);
    let isPasswordValid = true;
    let isRePasswordValid = true;

    if (!isNameValid) setNameError("Name cannot be empty or just spaces.");
    else setNameError("");
    if (!isEmailValid) setEmailError("Invalid email format.");
    else setEmailError("");


    if (Password != ''){
      isPasswordValid = validatePassword(Password);
      isRePasswordValid = validateRePassword(rePassword);
    }
    console.log("test valid"+ (isNameValid && isEmailValid && isPasswordValid && isRePasswordValid));
    return isNameValid && isEmailValid && isPasswordValid && isRePasswordValid;

    
  };


  const handleNext = async () => {
    if (!validateForm()) {
      // console.error("Please resolve form errors before proceeding.");
      return;
    }
    try{
      const userData = { editedDisplayName, Password, editedEmail };
      console.log(userData);
      const result = await updateUser(username, userData);
      navigation.navigate('tabs', {username: username});
    } catch (error){
      console.error("something went wrong with updating profile.");
      handleError('Unable to update. Please try again later.');
  
    }

    
  };

  useFocusEffect( useCallback( ()=>{
    
    getHomepageData();

  }, [clearError, handleError]));


  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#CA3550" />
        <StyledText size={20} textContent="Loading event details..." />
      </View>
    );
  }
  if (error) {
    return <NetworkErrorScreen onRetry={getHomepageData}/>;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        {/* <StyledText size={30} textContent="Account Setup" /> */}
        <PageHeader title={"Update Profile"} onPress={()=>navigation.goBack()} fontSize={30}/>
        <View style={styles.inputs}>

          {/* <StyledInput label={"Username"} data={Username} onChangeText={handleUsername} edit={false}/>
          {usernameError ? <StyledText size={16} textContent={usernameError} fontColor="#CA3550" alignment="left"/> : null} */}
          {/* <SelectInput label={"Username"} data={Username}/> */}
          <StyledInput label={"Email"} data={editedEmail} onChangeText={handleEmailChange}/>
          {emailError ? <StyledText size={16} textContent={emailError} fontColor="#CA3550" /> : null}
          
          <StyledInput label={"Display Name"} data={editedDisplayName} onChangeText={handleNameChange}/>
          {/* <StyledInput label={"First Name"} data={editedFirstName} onChangeText={setFirstName}/> */}
          {nameError ? <StyledText size={16} textContent={nameError} fontColor="#CA3550" /> : null}

          <StyledInput label={"Password"} pwd={true} data={Password} onChangeText={handlePassword}/>
          {pwdError ? <StyledText size={16} textContent={pwdError} fontColor="#CA3550" alignment="left"/> : null}
          <View style={styles.bullets}>
            <Entypo name="dot-single" size={24} color="#8B8B8B" />
            <StyledText size={18} textContent="must include at least 8 characters" fontColor="#8B8B8B"/>
          </View>
          <View style={styles.bullets}>
            <Entypo name="dot-single" size={24} color="#8B8B8B" />
            <StyledText size={18} textContent="must include at least 1 special character" fontColor="#8B8B8B"/>
          </View>
          <View style={styles.bullets}>
            <Entypo name="dot-single" size={24} color="#8B8B8B" />
            <StyledText size={18} textContent="must include at least 1 number" fontColor="#8B8B8B"/>
          </View>
          {Password.length > 0 && 
          <StyledInput label={"Re-enter Password"} pwd={true} data={rePassword} onChangeText={handleRePassword}/>}
          {rePwdError ? <StyledText size={16} textContent={rePwdError} fontColor="#CA3550" alignment="left"/> : null}
          {/* <StyledInput label={"Email"} data={email} onChangeText={setEmail}/> */}
          {formError ? <StyledText size={16} textContent={formError} fontColor="#CA3550" alignment="left"/> : null}
        </View>
        <View style={styles.btnContainer}>
          <RoundBtn onPress={handleNext} text="Next" icon="arrow-circle-right"/>
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
    paddingBottom: 40,
    paddingHorizontal: "5%",
  },
  btnContainer:{
    width: "100%",
    paddingHorizontal: "5%",
  },
  bullets: {
    display: 'flex',
    flexDirection: 'row'
  },

});

export default UpdateProfile;
