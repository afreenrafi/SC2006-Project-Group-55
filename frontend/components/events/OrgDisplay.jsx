import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import StyledText from './StyledText';

const OrgDisplay = ({ eventPic, eventOrgPic, eventOrg }) => {

  return (
    <View style={styles.heroBanner}>
        <Image style={styles.eventBg} source={{uri: eventPic}}/>
        <View style={styles.orgView}>
            <Image style={styles.orgLogo} source={{uri: eventOrgPic}}/>
            <View style={styles.orgNames}>
                <StyledText style={styles.pageTitle} size={22} textContent={eventOrg} fontColor="#fff"/>
                <StyledText style={styles.pageTitle} size={20} textContent="Organiser" fontColor="#fff"/>
            </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    heroBanner: {
        width: "100%",
        height: 350,
        position: "relative"
      },
      eventBg: {
        height: "100%",
      },
      orgView: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        padding: 30,
        backgroundColor: "#000000",
        opacity: 0.8,
        position: "absolute",
        bottom: 0,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        gap: 20,
        paddingBottom: 70,
      },
      orgLogo: {
        height: 60,
        width: 60,
        borderRadius: 10,
        padding: 0,
        margin: 0,
        opacity: 1,
      },
      orgNames: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
        position: "relative",
        opacity: 1,
      },
});

export default OrgDisplay;
