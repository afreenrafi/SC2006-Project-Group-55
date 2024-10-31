import { View, Text, Image, StyleSheet, TextInput, ActivityIndicator, Button, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import React, { useState } from "react";
import StyledText from "../../components/StyledText";
import SingpassBtn from "../../components/SingpassBtn";
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
  

  return (
    <View style={styles.container}>
      {/* <StyledText size={30} textContent="Registration/Login" fontFam="MontserratBold"/> */}
      <Image style={styles.logo} source={require('../../assets/logo/cultivatelogo.png')}/>
      <StyledText size={40} textContent="Cultivate" />
      <StyledText size={26} textContent="Cultivate Connections," />
      <StyledText size={26} textContent="Celebrate Culture." />
      <SingpassBtn onPress={handleSingpassLogin}/>
      {/* <Image style={styles.logo} source={require('../../assets/logo/singpass_logo.png')} /> */}

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
 
});

export default Login;
