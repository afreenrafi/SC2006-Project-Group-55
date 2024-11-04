import React, { useState, useEffect } from 'react';
import { Modal, View, TouchableOpacity, StyleSheet } from 'react-native';
import StyledText from './StyledText';
const SelectModal = ({ modalTitle, modalVisible, onRequestClose, oneOptPress, twoOptPress, optOne, optTwo }) => {


  return (
    <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onRequestClose}  // Close the modal on request
    >
        <View style={styles.modalOverlay}>
        <View style={styles.modalView}>
            <StyledText size={24} textContent={modalTitle} />
            <View style={styles.modalOptions}>
            <TouchableOpacity style={styles.modalItem} onPress={oneOptPress}>
                <StyledText size={20} textContent={optOne} fontColor="#FFF"/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem} onPress={twoOptPress}>
                <StyledText size={20} textContent={optTwo} fontColor="#FFF"/>
            </TouchableOpacity>
            </View>
        </View>
        </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
        gap: 10
    },
    modalItem: {
        paddingVertical: 10,
        width: "100%",
        alignItems: "center",
        backgroundColor: "#CA3550",
        borderRadius: 20,
        padding: 20,
    },
    modalText: {
        fontSize: 18,
        color: "#333",
    },
  
});

export default SelectModal;
