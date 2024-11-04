import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import StyledText from './StyledText';

const SingleDate = ({ day, month, selected, isAboveSelected, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.singleDate, selected && styles.selectedDate, isAboveSelected && styles.noBorder]}>
      <StyledText size={20} textContent={day} fontColor={selected ? "#FFFFFF" : "#000000"} />
      <StyledText size={12} textContent={month} fontColor={selected ? "#FFFFFF" : "#000000"} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  singleDate: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
    width: 50,
    height: 50,
    padding: 10,
    backgroundColor: "transparent",
  },
  selectedDate: {
    backgroundColor: "#CA3550",
    borderRadius: 10,
    borderBottomWidth: 0,  // Remove border for selected date itself
  },
  noBorder: {
    borderBottomWidth: 0,  // Remove border for the date above selected
  },
});

export default SingleDate;
