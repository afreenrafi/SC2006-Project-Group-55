import { Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const DirectMessage = () => {
  return (
    <SafeAreaView style={styles.fullPage}>
      <Ionicons name="construct" size={200} color={"#fff"}/>
      <Text style={styles.notice}>Stay tune for more</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fullPage:{
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5D7971',
    gap: 30,
  },
  notice:{
    color: "white",
    fontSize: '40',
    fontWeight: '500',
  }
})

export default DirectMessage;
