import { View, SafeAreaView, Modal, StyleSheet, TouchableOpacity, ActivityIndicator, Button, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import React, { useState } from "react";
import StyledText from "../../components/forms/StyledText";
import { useNavigation } from '@react-navigation/native';
import StyledInput from "../../components/forms/StyledInput";
import RoundBtn from "../../components/forms/RoundBtn";
import PageHeader from "../../components/events/PageHeader";
import Entypo from '@expo/vector-icons/Entypo';
import SelectInput from "../../components/forms/SelectInput";
import SelectModal from "../../components/forms/SelectModal";
import { loginUser, fetchUserById } from "../../apicalls/UserApi";


const LoginAccount = ({ route }) => {
  const navigation = useNavigation();

  // const { username } = route.params;

  const [Username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState(""); 

  const [Password, setPassword] = useState('');
  const [pwdError, setPwdError] = useState(""); 

  const [Role, setRole] = useState('');

  const [formError, setFormError] = useState('');

  const handleUsername = (text) => {
    setUsername(text);
    if(text != ''){
      setUsernameError('');
    }
  };

  const handlePassword = (text) => {
    setPassword(text);
    if(text != ''){
      setPwdError('');
    }
  };

  const checkEmpty = (text) => {
    if(text == ''){
      return false;
    }
    else{
      return true;
    }
  }

  const validateForm = (username, pwd) => {
    const isUsernameValid = checkEmpty(username);
    const isPasswordValid = checkEmpty(pwd);
  
    if(!isUsernameValid){
      setUsernameError('Username cannot be empty');
    }
    if(!isPasswordValid){
      setPwdError('Password cannot be empty');
    }

    return isUsernameValid && isPasswordValid;
  }

  


  // Dummy API call that simulates submitting the user details
//   const submitAccountDetails = async (email, username, role, password) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         console.log("Submitting the following data:");
//         console.log({ email, username, role, password });  
//         resolve({ 
//           email, role
//         });  
//       }, 2000);  
//     });
//   };


  const handleNext = async () => {
    if(!validateForm(Username, Password)){
      return;
    }
    try{
      const result = await loginUser(Username, Password);
      if(result.success){
        const assignRole = await fetchUserById(Username);
        setRole(assignRole.userRole);
        navigation.navigate('tabs', { username: Username, role: assignRole.userRole });
        setFormError('');
      }
      else{
        setFormError('Your username/password is incorrect or does not exist.');
      }
    } catch( error ){
        console.log("Failed to login user:", error);
    }
    
    

    
  }



  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        {/* <StyledText size={30} textContent="Account Setup" /> */}
        <PageHeader title={"Account Setup"} onPress={()=>navigation.goBack()} fontSize={30}/>
        <View style={styles.inputs}>
          <StyledInput label={"Username"} data={Username} onChangeText={handleUsername}/>
          {usernameError ? <StyledText size={16} textContent={usernameError} fontColor="#CA3550" /> : null}
          
          <StyledInput label={"Password"} pwd={true} data={Password} onChangeText={handlePassword}/>
          {pwdError ? <StyledText size={16} textContent={pwdError} fontColor="#CA3550" /> : null}

          {formError ? <StyledText size={16} textContent={formError} fontColor="#CA3550" /> : null}
          
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

export default LoginAccount;
