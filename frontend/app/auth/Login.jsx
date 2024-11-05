import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Button, ScrollView, KeyboardAvoidingView, Platform, Touchable } from "react-native";
import React, { useState } from "react";
import StyledText from "../../components/forms/StyledText";
// import SingpassBtn from "../../components/forms/SingpassBtn";
import RoundBtn from "../../components/forms/RoundBtn";
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();

  // Dummy SingpassApi call that returns a user's details
  const fetchSingpass = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          userExist: false,
          lastName: "Doe",
          firstName: "John",
          gender: "Male",
          age: "30",
          email: "user@example.com",
        }); 
      }, 2000);
    });
  };

  const handleSingpassLogin = async () => {
    try{
      const userSingpass = await fetchSingpass();
      console.log("User Details fetched:", userSingpass);
      if(userSingpass.userExist == false){
        navigation.navigate('startup/Details', {...userSingpass});  // Navigate to 'Details' page
      }
      else{
        navigation.navigate('tabs', {...userSingpass});
      }
      
    } catch (error) {
      console.error("Failed to fetch user singpass details:", error);
    }
  };

  const goRegisterPage = async () => {
    navigation.navigate('startup/Details');  // Navigate to 'Details' page
  };

  const goLoginPage = async () => {
    navigation.navigate('startup/LoginAccount');  // Navigate to 'Details' page
  };


  

  return (
    <View style={styles.container}>
      {/* <StyledText size={30} textContent="Registration/Login" fontFam="MontserratBold"/> */}
      <Image style={styles.logo} source={require('../../assets/logo/cultivatelogo.png')}/>
      <StyledText size={40} textContent="Cultivate" />
      <StyledText size={26} textContent="Cultivate Connections," />
      <StyledText size={26} textContent="Celebrate Culture." />
      <View style={styles.actionBtns}>
        <RoundBtn onPress={goRegisterPage} alignment="center" text="Register" />
        {/* <StyledText size={16} textContent="Have an account? Login here!"/> */}
        <View style={styles.loginCont}>
          <StyledText size={16} textContent="Have an account?"/>
          <TouchableOpacity onPress={goLoginPage}>
            <StyledText size={16} textContent="Login here!" underline="true"/>
          </TouchableOpacity>
          
        </View>
      </View>
      
      {/* <SingpassBtn onPress={handleSingpassLogin}/> */}

    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBF3F1",
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    height: 80,
    width: '60%',
    resizeMode: 'contain',
  },
  actionBtns: {
    width: "100%",
    padding: 30,
    gap: 10,
    flexDirection: "column",
    alignItems: "center"
  },
  loginCont: {
    flexDirection: "row",
    gap: 5,
    paddingVertical: 10
  }
 
});

export default Login;
