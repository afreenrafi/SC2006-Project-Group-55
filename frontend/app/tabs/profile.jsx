import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

const Profile = () => {
  const [isPushEnabled, setIsPushEnabled] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const navigation = useNavigation();

  const toggleSwitch = async () => {
    const newValue = !isPushEnabled;
    setIsPushEnabled(newValue);
    try {
      await AsyncStorage.setItem('pushNotificationsEnabled', JSON.stringify(newValue));
    } catch (error) {
      console.error('Error saving push notification setting:', error);
    }
  };


  const handleLogout = () => {
    AsyncStorage.clear();
    navigation.reset({
      index: 0,
      routes: [{ name: 'auth' }],
    });
  };

  const handleDeleteAccount = async () => {
    try {
      setDeleteModalVisible(false);
      
      // Optional: Show a loading indicator here if you want to indicate deletion in progress
      
      // Clear AsyncStorage and wait for it to complete
      await AsyncStorage.clear();
  
      // Navigate to the auth screen only after storage is cleared
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'auth' }],
        });
      }, 100); // Adjust the timeout as needed
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  useEffect(() => {
    const loadSwitchState = async () => {
      try {
        const storedValue = await AsyncStorage.getItem('pushNotificationsEnabled');
        if (storedValue !== null) {
          setIsPushEnabled(JSON.parse(storedValue));
        }
      } catch (error) {
        console.error('Error loading push notification setting:', error);
      }
    };

    loadSwitchState();
  }, []);

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.headCont}>
        <Text style={styles.title}>Profile</Text>
      </View>

      {/* Profile Options */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionCard}>
          <FontAwesome name="id-card" size={30} color="#333" style={styles.icon} />
          <Text style={styles.optionTitle}>Personal Information</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionCard}>
          <FontAwesome name="credit-card" size={30} color="#333" style={styles.icon} />
          <Text style={styles.optionTitle}>Payment Methods</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionCard}>
          <MaterialIcons name="lock" size={30} color="#333" style={styles.icon} />
          <Text style={styles.optionTitle}>Change Password</Text>
        </TouchableOpacity>

        {/* Push Notifications Switch */}
        <View style={styles.optionCard}>
          <FontAwesome name="bell" size={30} color="#333" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.optionTitle}>Push Notifications</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#88C34A" }}
              thumbColor={isPushEnabled ? "#fff" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isPushEnabled}
              style={styles.switch}
            />
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.optionCard} onPress={handleLogout}>
          <MaterialIcons name="logout" size={30} color="#333" style={styles.icon} />
          <Text style={styles.optionTitle}>Logout</Text>
        </TouchableOpacity>

        {/* Delete Account Option */}
        <TouchableOpacity
          style={[styles.optionCard, { borderColor: 'red' }]}
          onPress={() => setDeleteModalVisible(true)}
        >
          <MaterialIcons name="delete" size={30} color="red" style={styles.icon} />
          <Text style={[styles.optionTitle, { color: 'red' }]}>Terminate Account</Text>
        </TouchableOpacity>
      </View>

      {/* Delete Account Confirmation Modal */}
      <Modal
        transparent={true}
        visible={deleteModalVisible}
        animationType="fade"
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Would you like to delete your account permanently?
            </Text>
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#e63946" }]}
                onPress={handleDeleteAccount}
              >
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#6c757d" }]}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f4f1',
    padding: 16,
  },
  headCont: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  headBg: {
    width: '100%',
    height: 180,
    position: 'absolute',
    top: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    paddingTop: '15%',
  },
  optionsContainer: {
    marginTop: 20,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#FFF',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  icon: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  switch: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  modalButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default Profile;
