import React from 'react';
import { View, StyleSheet } from 'react-native';
import StyledText from './StyledText';
import { Entypo } from '@expo/vector-icons';

const EventHeader = ({ eventStart, eventEnd, eventType, eventMode, eventName }) => {

  return (
    <View style={styles.detailList}>
      <View style={styles.eventInfo}>
          <StyledText size={16} textContent={eventStart + " - " + eventEnd} fontColor="#CA3550"/>
          <Entypo name="dot-single" size={16} color="#CA3550" />
          <StyledText size={16} textContent={eventType} fontColor="#CA3550"/>
          <Entypo name="dot-single" size={16} color="#CA3550" />
          <StyledText size={16} textContent={eventMode} fontColor="#CA3550"/>
      </View>
      <StyledText size={26} textContent={eventName} alignment="left"/>
    </View>
  );
};

const styles = StyleSheet.create({
  eventInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
});

export default EventHeader;
