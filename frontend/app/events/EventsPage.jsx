import { View, SafeAreaView, Image, Modal, StyleSheet, TouchableOpacity, ActivityIndicator, Button, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import React, { useState, useEffect } from "react";
import StyledText from "../../components/StyledText";
import { useNavigation } from '@react-navigation/native';
import StyledInput from "../../components/StyledInput";
import RoundBtn from "../../components/RoundBtn";
import Ionicons from '@expo/vector-icons/Ionicons';
import SelectInput from "../../components/SelectInput";
import { Entypo } from "@expo/vector-icons";


const EventsPage = ({ route }) => {
  const navigation = useNavigation();

  const [eventDetails, setEventDetails] = useState(null);  // State to hold event details
  const [loading, setLoading] = useState(true);            // State to manage loading status

  // Fetch event details when component mounts
  useEffect(() => {
    const getEventDetails = async () => {
      try {
        const details = await fetchEventDetails();  // Fetch event details
        setEventDetails(details);                  // Set the fetched details to state
        setLoading(false);                         // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching event details:", error);
        setLoading(false);
      }
    };

    getEventDetails();  // Call the function when component mounts
  }, []);




  // Fetch event details
  const fetchEventDetails = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          eventOrganiser: "National Heritage Board",
          eventOrgPic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbydUmQ-cFz6feUWRPjQxwoge_MhmhFu2REw&s",
          eventName: "Singapore Night Festival",
          eventPic: "https://onecms-res.cloudinary.com/image/upload/s--6V38L2Tn--/c_fill,g_auto,h_360,w_640/f_auto,q_auto/v1/8world/images/2023/08/16/article_with_video_website_cover_20.png?itok=4XUH0RhZ",
          eventStartDate: "Aug 13",
          eventEndDate: "Sep 7",
          eventType: "Festival",
          eventMode: "Standing",
          eventDescription: "The Singapore Night Festival - Singapore’s largest nocturnal experience - returns to the Bras Basah. Happening for three weekends for the first time from 23 August to 7 September, this year’s festival is themed the Art of Play.",
          eventArtist: [
            {
                artistName: "Shazza",
                artistPic: "data:image/jpeg;base64,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"
            },
            {
                artistName: "Benjamin Kheng",
                artistPic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCscPDHMMXUD9lc1yjW3CG0BX5-0EsrgnCUg&s"
            },
            {
                artistName: "Annette Lee",
                artistPic: "https://upload.wikimedia.org/wikipedia/commons/2/25/Annette_Singing_at_canvas_club.jpg"
            }
          ],
          eventFaq: [
            {
                question: "How much is Singapore Night Festival?",
                answer: "The entrance for Singapore Night Festival is FREE!"
            },
            {
                question: "Where is Singapore Night Festival?",
                answer: "At Bras Basah"
            }
          ]
        }); 
      }, 2000);
    });
  };

  


  const handleNext = async () => {
    // try {
    //   const result = await submitUserDetails();  // Simulate sending data
    //   console.log("User details submitted:", result);
    //   navigation.navigate('NextPage', { email: result.email });  // Navigate to new page with email
    // } catch (error) {
    //   console.error("Failed to submit details:", error);
    // }
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#CA3550" />
        <StyledText size={20} textContent="Loading event details..." />
      </View>
    );
  }


  return (
    <ScrollView style={styles.scrollCont}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <Ionicons name="chevron-back" size={24} color="black" style={styles.backBtn}/>
            <StyledText style={styles.pageTitle} size={30} textContent="Event Page" fontFam="MontserratSemibold"/>
        </View>
        <View style={styles.heroBanner}>
            <Image style={styles.eventBg} source={{uri: eventDetails.eventPic}}/>
            <View style={styles.orgView}>
                <Image style={styles.orgLogo} source={{uri: eventDetails.eventOrgPic}}/>
                <View style={styles.orgNames}>
                    <StyledText style={styles.pageTitle} size={22} textContent={eventDetails.eventOrganiser} fontFam="MontserratSemibold" fontColor="#fff"/>
                    <StyledText style={styles.pageTitle} size={20} textContent="Organiser" fontFam="MontserratRegular" fontColor="#fff"/>
                </View>
            </View>
        </View>
        <View style={styles.eventCont}>
            <View style={styles.overlap}>
                <View style={styles.detailList}>
                    <View style={styles.eventInfo}>
                        <StyledText size={20} textContent={eventDetails.eventStartDate + " - " + eventDetails.eventEndDate} fontFam="CrimsonProRegular" fontColor="#CA3550"/>
                        <Entypo name="dot-single" size={20} color="#CA3550" />
                        <StyledText size={20} textContent={eventDetails.eventType} fontFam="CrimsonProRegular" fontColor="#CA3550"/>
                        <Entypo name="dot-single" size={20} color="#CA3550" />
                        <StyledText size={20} textContent={eventDetails.eventMode} fontFam="CrimsonProRegular" fontColor="#CA3550"/>
                    </View>
                    <StyledText size={32} textContent={eventDetails.eventName} fontFam="CrimsonProRegular" />
                    <StyledText size={16} textContent={eventDetails.eventDescription} fontFam="MontserratRegular" alignment="left" fontColor="#8B8B8B"/>
                </View>
                <View style={styles.artistList}>
                    <StyledText size={25} textContent="Artists" fontFam="CrimsonProRegular" alignment="left" />
                    <View style={styles.artistPics}>
                        <Image style={styles.artistPic} source={{uri: eventDetails.eventArtist[0].artistPic}}/>
                        <Image style={styles.artistPic} source={{uri: eventDetails.eventArtist[1].artistPic}}/>
                        <Image style={styles.artistPic} source={{uri: eventDetails.eventArtist[2].artistPic}}/>
                    </View>
                    <StyledText size={16} textContent={eventDetails.eventArtist[0].artistName + " & more..."} fontFam="MontserratRegular" alignment="left" fontColor="#8B8B8B"/>
                    
                </View>
                <View style={styles.tabOptions}>
                    <TouchableOpacity>
                    <StyledText size={16} textContent="FAQs" fontFam="MontserratRegular" alignment="left" fontColor="#000000"/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <StyledText size={16} textContent="Posts" fontFam="MontserratRegular" alignment="left" fontColor="#8B8B8B"/>
                    </TouchableOpacity>
                </View>
                <View style={styles.faqs}>
                    <StyledText size={24} textContent="Frequently Asked Questions" fontFam="CrimsonProRegular" />
                    <View style={styles.singleFaq}>
                        <View style={styles.qns}>
                            <View style={styles.Qlogo}>
                                <StyledText size={20} textContent="Q" fontFam="CrimsonProRegular" />
                            </View>
                            <View style={styles.Qtext}>
                                <StyledText size={14} textContent={eventDetails.eventFaq[0].question} fontFam="MontserratRegular" />
                            </View>
                        </View>
                        <View style={styles.ans}>
                            <Image style={styles.faqPic} source={{uri: eventDetails.eventOrgPic}}/>
                            <View style={styles.Atext}>
                                <View style={styles.orgDetails}>
                                    <StyledText size={14} textContent={eventDetails.eventOrganiser} fontFam="MontserratSemibold" />
                                    <StyledText size={14} textContent="Organiser" fontFam="MontserratSemibold" fontColor="#8B8B8B"/>
                                </View>
                                <View style={styles.comment}>
                                    <StyledText size={14} textContent={eventDetails.eventFaq[0].answer} fontFam="MontserratRegular" alignment="left"/>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.singleFaq}>
                        <View style={styles.qns}>
                            <View style={styles.Qlogo}>
                                <StyledText size={20} textContent="Q" fontFam="CrimsonProRegular" />
                            </View>
                            <View style={styles.Qtext}>
                                <StyledText size={14} textContent={eventDetails.eventFaq[0].question} fontFam="MontserratRegular" />
                            </View>
                        </View>
                        <View style={styles.ans}>
                            <Image style={styles.faqPic} source={{uri: eventDetails.eventOrgPic}}/>
                            <View style={styles.Atext}>
                                <View style={styles.orgDetails}>
                                    <StyledText size={14} textContent={eventDetails.eventOrganiser} fontFam="MontserratSemibold" />
                                    <StyledText size={14} textContent="Organiser" fontFam="MontserratSemibold" fontColor="#8B8B8B"/>
                                </View>
                                <View style={styles.comment}>
                                    <StyledText size={14} textContent={eventDetails.eventFaq[0].answer} fontFam="MontserratRegular" alignment="left"/>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
        

      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#FBF3F1",
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  scrollCont: {
    backgroundColor: "#FBF3F1",
    flex: 1,
    paddingBottom: 300
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    backgroundColor: "#fff",
  },
  backBtn: {
    position: "absolute",
    left: 30,
  },
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
  eventCont: {
    position: "relative",
    width: "100%",
    backgroundColor: "#FBF3F1",
  },
  overlap: {
    // position: "absolute",
    backgroundColor: "#FBF3F1",
    padding: 30,
    width: "100%",
    top: -30,
    borderRadius: 25,
  },
  eventInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  artistList: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  artistPics:{
    flexDirection: "row",
    position: "relative"
  },
  artistPic: {
    height: 45,
    width: 45,
    borderRadius: 50,
    padding: 0,
    margin: 0,
    opacity: 1,
    position: "relative",
    marginRight: -15,
  },
  tabOptions: {
    flexDirection: "row",
    gap: 30,
    width: "100%",
    borderBottomColor: "#D5D5D5",
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  singleFaq: {
    width: "100%",
    gap: 10,
    paddingVertical: 20,
  },
  qns: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 20
    
  },
  Qlogo: {
    backgroundColor: "#fff",
    height: 45,
    width: 45,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  ans:{
    // width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: 20,
    maxWidth: "100%",
    position: "relative",
  },
  Atext: {
    flex: 1
  },
  orgDetails:{
    flexDirection: "row",
    gap: 30,
    flex: 1
  },
  faqPic: {
    height: 45,
    width: 45,
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



  



  inputs: {
    width: "100%",
    paddingVertical: 40,
    paddingHorizontal: "5%",
  },
  btnContainer:{
    width: "100%",
    paddingHorizontal: "5%",
  },
  bullets: {
    display: 'flex',
    flexDirection: 'row'
  },
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
  },
  modalItem: {
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    color: "#333",
  },

});

export default EventsPage;