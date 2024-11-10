import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import StyledText from '../forms/StyledText';

const SingleFaq = ({ eventQns, eventOrgPic, eventOrg, eventAns }) => {

  return (
     <View style={styles.singleFaq}>
        <View style={styles.qns}>
            <View style={styles.Qlogo}>
                <StyledText size={25} textContent="Q" />
            </View>
            <View style={styles.Qtext}>
                <StyledText size={14} textContent={eventQns} alignment="left"/>
            </View>
        </View>
        <View style={styles.ans}>
            <Image style={styles.faqPic} source={eventOrgPic}/>
            <View style={styles.Atext}>
                <View style={styles.orgDetails}>
                    <StyledText size={12} textContent={eventOrg} fweight='bold' alignment="left"/>
                    <StyledText size={12} textContent="Organiser" fontColor="#8B8B8B" alignment="left"/>
                </View>
                <View style={styles.comment}>
                    <StyledText size={14} textContent={eventAns} alignment="left"/>
                </View>
            </View>
        </View>
    </View>
    // <View style={styles.singleFaq}>
    //     <View style={styles.qns}>
    //         <View style={styles.Qlogo}>
    //             <StyledText size={25} textContent="Q" />
    //         </View>
    //         <View style={styles.Qtext}>
    //             <StyledText size={14} textContent={eventQns} />
    //         </View>
    //     </View>
    //     <View style={styles.ans}>
    //         <Image style={styles.faqPic} source={{uri: eventOrgPic}}/>
    //         <View style={styles.Atext}>
    //             <View style={styles.orgDetails}>
    //                 <StyledText size={12} textContent={eventOrg} fweight='bold'/>
    //                 <StyledText size={12} textContent="Organiser" fontColor="#8B8B8B"/>
    //             </View>
    //             <View style={styles.comment}>
    //                 <StyledText size={14} textContent={eventAns} alignment="left"/>
    //             </View>
    //         </View>
    //     </View>
    // </View>
  );
};

const styles = StyleSheet.create({
      singleFaq: {
        width: "100%",
        gap: 5,
        paddingVertical: 20,
      },
      qns: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        position: "relative",
      },
      Qlogo: {
        // backgroundColor: "#fff",
        // height: 45,
        width: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
      },
      Qtext:{
        width: "100%",
        maxWidth: "100%",
        position: "relative",
        flex: 1,
        // backgroundColor: "#000"
      },
      ans:{
        // width: "100%",
        display: "flex",
        flexDirection: "row",
        gap: 10,
        maxWidth: "100%",
        position: "relative",
      },
      Atext: {
        flex: 1
      },
      orgDetails:{
        flexDirection: "row",
        gap: 20,
        flex: 1
      },
      faqPic: {
        height: 30,
        width: 30,
        borderRadius: 50,
        padding: 0,
        margin: 0,
        opacity: 1,
        position: "relative",
      },
      comment: {
        position: "relative",
        // width: "100%",
      },
});

export default SingleFaq;
