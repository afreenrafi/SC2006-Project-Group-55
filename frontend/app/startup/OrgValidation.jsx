import { View, SafeAreaView, Modal, StyleSheet, TouchableOpacity, ActivityIndicator, Button, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import React, { useState } from "react";
import StyledText from "../../components/StyledText";
import { useNavigation } from '@react-navigation/native';
import StyledInput from "../../components/StyledInput";
import RoundBtn from "../../components/RoundBtn";
import Entypo from '@expo/vector-icons/Entypo';
import SelectInput from "../../components/SelectInput";


const OrgValidation = ({ route }) => {
  const navigation = useNavigation();

  const { email } = route.params;

  const [Username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState(""); 

  const [Role, setRole] = useState('General Public');
  const [modalVisible, setModalVisible] = useState(false);

  const [Password, setPassword] = useState('');
  const [pwdError, setPwdError] = useState(""); 

  const [rePassword, setRePassword] = useState('');
  const [rePwdError, setRePwdError] = useState(""); 



  const handleUsername = (text) => {
    const validUsername = text.replace(/[^a-zA-Z0-9_]/g, '');  // Remove any character that isn't a letter, number, or underscore
    setUsername(validUsername);  // Update the state with the valid username
  };

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);  // Set the gender value based on the selection
    setModalVisible(false);     // Close the modal
  };

  const handlePassword = (text) => {
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;  // At least 1 special character, 1 number, and minimum 8 characters
    if (!passwordRegex.test(text)) {
      setPwdError('Password must have at least 8 characters, 1 special character, and 1 number.');
    } else {
      setPwdError('');  // Clear the error if the password is valid
    }
    setPassword(text);

    if (rePassword !== '' && text !== rePassword) {
      setRePwdError('Passwords do not match');
    } else {
      setRePwdError('');
    }
  };

  const handleRePassword = (text) => {
    setRePassword(text);
    if (text !== Password) {
      setRePwdError('Passwords do not match');
    } else {
      setRePwdError('');
    }
  }


  // Dummy API call that simulates submitting the user details
  const submitAccountDetails = async (email, username, role, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Submitting the following data:");
        console.log({ email, username, role, password });  
        resolve({ 
          email, role
        });  
      }, 2000);  
    });
  };


  const handleNext = async () => {
    try{
      if (Username === '') {
        setUsernameError('Username cannot be empty');
        setPwdError('');
        setRePwdError('');
      } 
      else if(Password === ''){
        setPwdError('Password cannot be empty');
        setUsernameError('');  
        setRePwdError('');
      }
      else if(rePassword === ''){
        setRePwdError('Password cannot be empty');
        setUsernameError('');  
        setPwdError('');
      }
      else {
        setUsernameError('');  
        setPwdError('');
        setRePwdError('');
        console.log("Proceeding with:", Username, Role, Password);
        const result = await submitAccountDetails(email, Username, Role, Password);
        console.log("Account details submitted:", result);
        if(Role == 'Organiser'){
          navigation.navigate('startup/OrgValidation', { email: result.email, role: result.role });
        }
        else{
          //to home page
          // navigation.navigate('Home page', { email: result.email, role: result.role });
        }
        
      }

    } catch (error){
      console.error("Failed to submit account details:", error);
    }
    
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
        <StyledText size={30} textContent="Organisation Validation" fontFam="MontserratSemibold"/>
        <View style={styles.inputs}>
          <StyledInput label={"Username"} data={Username} onChangeText={handleUsername}/>
          {usernameError ? <StyledText size={16} textContent={usernameError} fontFam="MontserratSemibold" fontColor="#CA3550" /> : null}
          
          <SelectInput label={"Role"} data={Role} onPress={() => setModalVisible(true)}/>

          <StyledInput label={"Password"} pwd="true" data={Password} onChangeText={handlePassword}/>
          {pwdError ? <StyledText size={16} textContent={pwdError} fontFam="MontserratSemibold" fontColor="#CA3550" /> : null}
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

          <StyledInput label={"Re-enter Password"} pwd="true" data={rePassword} onChangeText={handleRePassword}/>
          {rePwdError ? <StyledText size={16} textContent={rePwdError} fontFam="MontserratSemibold" fontColor="#CA3550" /> : null}
          {/* <StyledInput label={"Email"} data={email} onChangeText={setEmail}/> */}
          
        </View>
        <View style={styles.btnContainer}>
          <RoundBtn onPress={handleNext}/>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}  // Close the modal on request
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalView}>
              <StyledText size={24} textContent="Select Gender" fontFam="MontserratBold" />
              <View style={styles.modalOptions}>
                <TouchableOpacity style={styles.modalItem} onPress={() => handleRoleSelect("General Public")}>
                  {/* <Text style={styles.modalText}>Male</Text> */}
                  <StyledText size={20} textContent="General Public" fontFam="MontserratRegular" underline="true"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalItem} onPress={() => handleRoleSelect("Organiser")}>
                  {/* <Text style={styles.modalText}>Female</Text> */}
                  <StyledText size={20} textContent="Organiser" fontFam="MontserratRegular" underline="true"/>
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
  bullets: {
    display: 'flex',
    flexDirection: 'row'
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

export default OrgValidation;
