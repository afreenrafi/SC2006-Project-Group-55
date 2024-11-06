import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';


const SelectInput = ({ label, data, onPress }) => {
 

  return (
    <View style={styles.container}>
      {label && <Text style={styles.text}>{label}</Text>}
      <TouchableOpacity style={styles.inputCont} onPress={onPress}>
        <Text 
            style={styles.input}
            // value={data}
            // placeholder={label}
            // onChangeText={onChangeText}
            // keyboardType={type}
            // secureTextEntry={pwd}
            // editable={false}
        >
            {data}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: "100%",
    paddingVertical: 5,
  },
  inputCont:{
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent:"center",
    borderWidth: 1,
    borderColor: "#000000",
    height: 40,
    borderStyle: 'solid',
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  input: {
   
  },
  text: {
    fontSize: 26,
    marginBottom: 5
  }
});

export default SelectInput;
