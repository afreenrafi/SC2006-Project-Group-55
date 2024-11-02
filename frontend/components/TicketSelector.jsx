import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import StyledText from './StyledText';

const TicketSelector = ({ ticketType, ticketPrice, ticketSlots, eventLocation, imageUri, quantity, onQtyChange, openModal }) => {
    const minusTicketCount = () => {
        if (quantity > 0) {
            onQtyChange(quantity - 1); // Call the callback with the new quantity
        }
    };

    const plusTicketCount = () => {
        if (quantity < ticketSlots) {
            onQtyChange(quantity + 1); // Call the callback with the new quantity
        }
    };

  return (
    <View style={styles.selectCont}>
      <Image style={styles.selectBg} source={{ uri: imageUri }} />
      <View style={styles.selectView}>
        <View style={styles.selectDetails}>
          <StyledText size={20} textContent={`${ticketType} Ticket`} fontColor="#fff" />
          <StyledText style={styles.pageTitle} size={14} textContent={ticketPrice} fontColor="#fff" fweight="bold" />
        </View>
        <StyledText style={styles.pageTitle} size={14} textContent={eventLocation} fontColor="#fff" />
        <View style={styles.selectQty}>
          <StyledText style={styles.pageTitle} size={12} textContent={`${ticketSlots} slots left`} fontColor="#fff" />
        </View>
        <View style={styles.selectNum}>
          <TouchableOpacity onPress={minusTicketCount}>
            <FontAwesome5 name="minus" size={26} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.qtyCount} onPress={openModal}>
            <StyledText style={styles.pageTitle} size={26} textContent={quantity.toString()} fontColor="#fff" fweight="bold" alignment="center" />
          </TouchableOpacity>
          <TouchableOpacity onPress={plusTicketCount}>
            <FontAwesome5 name="plus" size={26} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Same styles as before
  selectCont: {
    width: "100%",
    height: 180,
    position: "relative",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 10
  },
  selectBg: {
    height: "100%",
  },
  selectView: {
    width: "100%",
    position: "absolute",
    backgroundColor: "#5F525D",
    bottom: 0,
    borderRadius: 10,
    // height: '50%',
    padding: 10
    // display: "flex",
    // flexDirection: "row",
    // alignContent: "center",
    // padding: 30,
    // paddingBottom: 70,
  },
  selectDetails: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: 'space-between'
  },
  selectQty: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  selectNum: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    gap: 20,
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  qtyCount: {
    minWidth: 30,
    alignItems: "center",
    justifyContent: "center"
  },
});

export default TicketSelector;
