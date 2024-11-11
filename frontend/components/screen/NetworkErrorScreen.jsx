import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { ErrorContext } from '../../app/context/ErrorContext';
import { useNavigation } from '@react-navigation/native';


const NetworkErrorScreen = ({ onRetry }) => {

  const { clearError } = useContext(ErrorContext);
  const navigation = useNavigation();

  const handleRetry = () => {
    clearError();  // Clear the error state
    onRetry();     // Call the retry function
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.errorMessage}>Network Error. Please try again later.</Text>
      <Button title="Retry" onPress={handleRetry}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FBF3F1',
  },
  errorMessage: {
    fontSize: 18,
    color: '#CA3550',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default NetworkErrorScreen;
