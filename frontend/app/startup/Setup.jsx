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

  // const registerUser = async (email, age, name, username, role, password, eventPermitId = null, artistVerified = false) => {
  //   // Prepare JSON object with the form fields
  //   const jsonData = {
  //     userId: username,
  //     userName: name,
  //     userPassword: password,
  //     userEmail: email,
  //     userAge: age,
  //     userRole: role,
  //   };
  
  //   // Append role-specific data if needed
  //   if (role === "Organiser" && eventPermitId) {
  //     jsonData.organiserEventPermitId = eventPermitId;
  //   } else if (role === "Artist") {
  //     jsonData.artistVerified = artistVerified;
  //   }
  
  //   try {
  //     const response = await fetch("http://localhost:5001/api/authRoute/register", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(jsonData), // Send JSON-encoded data
  //     });
  
  //     const message = await response.json();
  //     if (response.ok) {
  //       console.log("User registered successfully:", message);
  //       // Navigate or handle success
  //     } else {
  //       console.error("Registration failed:", message.message || "Unknown error");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
  


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
        console.log("Proceeding with:", email, age, name, Username, Role, Password);
        // const result = await submitAccountDetails(email, Username, Role, Password);
        try{
          await registerUser(email, age, name, Username, Role, Password);
          
          if(Role == 'Organiser'){
            navigation.navigate('startup/OrgValidation', { email: email, role: Role });
          }
          else{
            //to tabs
            navigation.navigate('tabs', { email: email, role: Role });
            //for testing
            // navigation.navigate('events/EventsPage', { email: result.email, role: result.role })
            }
        } catch (error){
          console.error("Failed to submit details:", error);
        }
        // console.log("Account details submitted:", result);
       
        
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
        <StyledText size={30} textContent="Account Setup" />
        <View style={styles.inputs}>
          <StyledInput label={"Username"} data={Username} onChangeText={handleUsername}/>
          {usernameError ? <StyledText size={16} textContent={usernameError} fontColor="#CA3550" /> : null}
          
          <SelectInput label={"Role"} data={Role} onPress={() => setModalVisible(true)}/>

          <StyledInput label={"Password"} pwd="true" data={Password} onChangeText={handlePassword}/>
          {pwdError ? <StyledText size={16} textContent={pwdError} fontColor="#CA3550" /> : null}
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

          <StyledInput label={"Re-enter Password"} pwd="true" data={rePassword} onChangeText={handleRePassword}/>
          {rePwdError ? <StyledText size={16} textContent={rePwdError} fontColor="#CA3550" /> : null}
          {/* <StyledInput label={"Email"} data={email} onChangeText={setEmail}/> */}
          
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

        {/* <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}  // Close the modal on request
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalView}>
              <StyledText size={24} textContent="Select Role" />
              <View style={styles.modalOptions}>
                <TouchableOpacity style={styles.modalItem} onPress={() => handleRoleSelect("General Public")}>
                  <StyledText size={20} textContent="General Public" fontColor="#FFF"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalItem} onPress={() => handleRoleSelect("Organiser")}>
                  <StyledText size={20} textContent="Organiser" fontColor="#FFF"/>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal> */}

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

});

export default Setup;
