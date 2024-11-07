import { View, SafeAreaView, Modal, StyleSheet, TouchableOpacity, ActivityIndicator, Button, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import React, { useState } from "react";
import StyledText from "../../components/forms/StyledText";
import { useNavigation } from '@react-navigation/native';
import StyledInput from "../../components/forms/StyledInput";
import RoundBtn from "../../components/forms/RoundBtn";
import Entypo from '@expo/vector-icons/Entypo';
import SelectInput from "../../components/forms/SelectInput";
import SelectModal from "../../components/forms/SelectModal";
import { registerUser } from "../../apicalls/UserApi";
import PageHeader from "../../components/events/PageHeader";


const Setup = ({ route }) => {
  const navigation = useNavigation();

  const { email, age, name } = route.params;

  const [Username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState(""); 

  const [Role, setRole] = useState('Public');
  const [modalVisible, setModalVisible] = useState(false);

  const [Password, setPassword] = useState('');
  const [pwdError, setPwdError] = useState(""); 

  const [rePassword, setRePassword] = useState('');
  const [rePwdError, setRePwdError] = useState(""); 

  const [formError, setFormError] = useState('');

  // Validation functions
  const validateUsername = (text) => {
    const validUsername = text.replace(/[^a-zA-Z0-9]/g, '');
    setUsername(validUsername);
    if (validUsername.length < 8) {
      setUsernameError('Username must be at least 8 characters long and alphanumeric.');
      return false;
    } else {
      setUsernameError('');
      return true;
    }
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
    if (text !== Password) {
      setRePwdError('Passwords do not match');
      return false;
    } else {
      setRePwdError('');
      return true;
    }
  };

  const handleUsername = (text) => validateUsername(text);
  const handlePassword = (text) => {
    setPassword(text);
    // validatePassword(text);
    if (validatePassword(text)) {
      setPwdError("");
    } else {
      setPwdError("Password must have at least 8 characters, 1 special character, and 1 number.");
    }
  };
  const handleRePassword = (text) => validateRePassword(text);

  const validateForm = () => {
    const isUsernameValid = validateUsername(Username);
    const isPasswordValid = validatePassword(Password);
    const isRePasswordValid = validateRePassword(rePassword);
    console.log(isUsernameValid + isPasswordValid + isRePasswordValid);

    // setFormError(!(isUsernameValid && isPasswordValid && isRePasswordValid));
    return isUsernameValid && isPasswordValid && isRePasswordValid;
  };


  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);  // Set the gender value based on the selection
    setModalVisible(false);     // Close the modal
  };


  const handleNext = async () => {
    if (!validateForm()) {
      // console.error("Please resolve form errors before proceeding.");
      return;
    }

    try {
      const registered = await registerUser(email, age, name, Username, Role, Password);
      if (registered == "success") {
        navigation.navigate(
          Role === 'Organiser' ? 'startup/OrgValidation' : 'tabs',
          { username: Username, role: Role }
        );
      }
      else if(registered == "taken"){
        console.log('username is already taken');
        setUsernameError('username is already taken');
        setFormError('');
      }
      else if(registered == "failed"){
        setFormError('Network error. Please try again later.');
        setUsernameError('');
      }
    } catch (error) {
      setFormError('Something went wrong');
      setUsernameError('');
      // console.error("Failed to submit details:", error);
    }
  };

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
          {usernameError ? <StyledText size={16} textContent={usernameError} fontColor="#CA3550" alignment="left"/> : null}
          
          <SelectInput label={"Role"} data={Role} onPress={() => setModalVisible(true)}/>

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

          <StyledInput label={"Re-enter Password"} pwd={true} data={rePassword} onChangeText={handleRePassword}/>
          {rePwdError ? <StyledText size={16} textContent={rePwdError} fontColor="#CA3550" alignment="left"/> : null}
          {/* <StyledInput label={"Email"} data={email} onChangeText={setEmail}/> */}
          {formError ? <StyledText size={16} textContent={formError} fontColor="#CA3550" alignment="left"/> : null}
        </View>
        <View style={styles.btnContainer}>
          <RoundBtn onPress={handleNext} text="Next" icon="arrow-circle-right"/>
        </View>

        <SelectModal 
        modalTitle="Select Role" 
        modalVisible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        oneOptPress={() => handleRoleSelect("Public")} 
        twoOptPress={() => handleRoleSelect("Organiser")} 
        optOne="Public"
        optTwo="Organiser"
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
  bullets: {
    display: 'flex',
    flexDirection: 'row'
  },

});

export default Setup;
