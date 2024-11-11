import { View, SafeAreaView, Image, Modal, StyleSheet, TouchableOpacity, ActivityIndicator, Button, ScrollView, Platform } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import StyledText from "../../components/forms/StyledText";
import { useNavigation } from '@react-navigation/native';
import PageHeader from "../../components/events/PageHeader";
// import OrgDisplay from "../../components/OrgDisplay";
import SingleFaq from "../../components/events/SingleFaq";
import EventHeader from "../../components/events/EventHeader";
import RoundBtn from "../../components/forms/RoundBtn";
import { fetchEventById, fetchFaqByEventId, fetchFaqItemById } from "../../apicalls/EventApi";
import { ErrorContext } from '../context/ErrorContext';
import NetworkErrorScreen from '../../components/screen/NetworkErrorScreen';






const EventsPage = ({ route }) => {
  const { username, role } = route.params;
  const { eventId } = route.params;
  console.log(eventId);

  const navigation = useNavigation();

  const [eventDetails, setEventDetails] = useState(null);  // State to hold event details
  const [faqDetails, setFaqDetails] = useState(null);
  const [loading, setLoading] = useState(true);            // State to manage loading status
  const { error, handleError } = useContext(ErrorContext);
  const { clearError } = useContext(ErrorContext);

  const getEventDetails = async () => {
    try {
      setLoading(true);
      clearError();
      const details = await fetchEventDetails(eventId);  // Fetch event details
      setEventDetails(details);                  // Set the fetched details to state
      // console.log(eventDetails);
      const faqIds = await fetchFaqDetails(eventId);
      // console.log(faqIds);
      const faqContentArr = await fetchFaqData(faqIds);
      console.log(faqContentArr);
      setFaqDetails(faqContentArr);
      setLoading(false);                         // Set loading to false once data is fetched
    } catch (error) {
      console.error("Error fetching event details:", error);
      handleError('Server error. Please try again later.');
      setLoading(false);
    }
  };



  // Fetch event details when component mounts
  useEffect(() => {
    

    

    getEventDetails();  // Call the function when component mounts
  }, [eventId]);




  // Fetch event details
  const fetchEventDetails = async (eventId) => {
    try {
      const result = await fetchEventById(eventId);
      // console.log(result.events);
      return result;
    } catch (error) {
      console.error("Error fetching event page details:", error);
      throw error;
    }
    // console.log("eventId is " + eventId)
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve({
    //       eventId: 1,
    //       eventOrganiser: "National Heritage Board",
    //       eventOrgPic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbydUmQ-cFz6feUWRPjQxwoge_MhmhFu2REw&s",
    //       eventName: "Singapore Night Festival",
    //       eventPic: "https://onecms-res.cloudinary.com/image/upload/s--6V38L2Tn--/c_fill,g_auto,h_360,w_640/f_auto,q_auto/v1/8world/images/2023/08/16/article_with_video_website_cover_20.png?itok=4XUH0RhZ",
    //       eventStartDate: "Aug 13",
    //       eventEndDate: "Sep 7",
    //       eventType: "Festival",
    //       eventMode: "Standing",
    //       eventDescription: "The Singapore Night Festival - Singapore’s largest nocturnal experience - returns to the Bras Basah. Happening for three weekends for the first time from 23 August to 7 September, this year’s festival is themed the Art of Play.",
    //       eventArtist: [
    //         {
    //             artistName: "Shazza",
    //             artistPic: "data:image/jpeg;base64,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"
    //         },
    //         {
    //             artistName: "Benjamin Kheng",
    //             artistPic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCscPDHMMXUD9lc1yjW3CG0BX5-0EsrgnCUg&s"
    //         },
    //         {
    //             artistName: "Annette Lee",
    //             artistPic: "https://upload.wikimedia.org/wikipedia/commons/2/25/Annette_Singing_at_canvas_club.jpg"
    //         }
    //       ],
    //       eventFaq: [
    //         {
    //             question: "How much is Singapore Night Festival?",
    //             answer: "The entrance for Singapore Night Festival is FREE!"
    //         },
    //         {
    //             question: "Where is Singapore Night Festival?",
    //             answer: "At Bras Basah"
    //         }
    //       ]
    //     }); 
    //   }, 2000);
    // });
  };

  const fetchFaqDetails = async (eventId) => {
    try {
      const result = await fetchFaqByEventId(eventId);
      if(result.state=="success"){
        console.log("getting faq ids "+result.faqs);
        const faqIdArray = result.faqs.map(item => ({
          questionId: item.faqQuestion,
          answerId: item.faqAnswer
        }));
        console.log("getting faq id array " + faqIdArray);
        return faqIdArray;
      }
      

    } catch (error) {
      console.error("Error fetching FAQ page details:", error);
      throw error;
    }
  };

  const fetchFaqData = async (faqIdArr) => {
    try {
      // Map over each item in faqArray and create two API calls per item
      const results = await Promise.all(
        faqIdArr.map(async (faq) => {
          const [questionResponse, answerResponse] = await Promise.all([
            fetchFaqItemById(faq.questionId),
            fetchFaqItemById(faq.answerId),
          ]);
  
          return {
            questionContent: questionResponse.faqItem.faqItemContent || null, // Fetched question content
            answerContent: answerResponse.faqItem.faqItemContent || null, // Fetched answer content
          };
        })
      );
  
      // console.log("Fetched FAQ contents:", results);
      return results;
    } catch (error) {
      console.error("Error fetching FAQ contents:", error);
      throw error;
    }
  }
  


  const handleNext = async () => {
    try {
      // const result = await submitUserDetails();  // Simulate sending data
      // console.log("User details submitted:", result);
      navigation.navigate('events/BuyTickets', { username: username, role: role, eventDetails: eventDetails });  // Navigate to new page with email
    } catch (error) {
      console.error("Failed to submit details:", error);
      throw error;
    }
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#CA3550" />
        <StyledText size={20} textContent="Loading event details..." />
      </View>
    );
  }
  if (error) {
    return <NetworkErrorScreen onRetry={getEventDetails}/>;
  }


  return (
    <View style={{ flex:1 }}>
      <SafeAreaView style={styles.bgColour}>
        <PageHeader title={"Event Page"} onPress={()=>navigation.goBack()}/>
      </SafeAreaView>
    
      <ScrollView style={styles.scrollCont} bounces={false} alwaysBounceVertical={false} nestedScrollEnabled={true} 
      contentContainerStyle={{ flexGlow: 1, paddingBottom: 50 }} >
        <View style={{ flex:1 }}>
          <SafeAreaView style={[styles.container, {flex: 1}]} >
            {/* <PageHeader title={"Event Page"} onPress={()=>navigation.goBack()}/> */}
            {/* <OrgDisplay 
              eventPic={eventDetails.eventPic} 
              eventOrgPic="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              eventOrg={eventDetails.eventOrganiser ? eventDetails.eventOrganiser : eventDetails.eventGenre} 
            /> */}
            <View style={styles.heroBanner}>
                <Image style={styles.eventBg} source={eventDetails.eventPic? {uri: eventDetails.eventPic} : require('../../assets/images/DefaultEventPic.jpg')}/>
                {/* <Image style={styles.eventBg} source={require('../../assets/images/DefaultEventPic.jpg')}/> */}
            </View>
            <View style={styles.eventCont}>
                <View style={styles.overlap}>
                  <EventHeader 
                  eventStart={new Intl.DateTimeFormat("en-GB", {
                    day: "2-digit",
                    month: "short",
                    // year: "numeric"
                  }).format(new Date(eventDetails.eventStartDate))} 

                  eventEnd={new Intl.DateTimeFormat("en-GB", {
                    day: "2-digit",
                    month: "short",
                    // year: "numeric"
                  }).format(new Date(eventDetails.eventEndDate))} 

                  eventType={eventDetails.eventGenre} 
                  eventMode={eventDetails.eventType} 
                  eventName={eventDetails.eventName}
                  />
                    <View style={styles.eventDesc}>
                      <StyledText size={16} textContent={eventDetails.eventDescription} alignment="left" fontColor="#8B8B8B"/>
                    </View>
                    <View style={styles.artistList}>
                        <StyledText size={16} textContent="Artists" alignment="left" />
                        <View style={styles.artistPics}>
                          {eventDetails.eventArtist.map((artist)=>{
                            return <Image key={artist} style={styles.artistPic} source={artist.artistPic ? {uri: artist.artistPic} : require('../../assets/images/BlankProfile.png')}/>
                            })
                          }
                        </View>
                        <StyledText size={16} textContent={eventDetails.eventArtist[0] + " & more..."} alignment="left" fontColor="#8B8B8B"/>
                        
                    </View>
                    {faqDetails.length != 0 && 
                    <View style={styles.tabOptions}>
                        <TouchableOpacity>
                        <StyledText size={16} textContent="FAQs" alignment="left" fontColor="#000000"/>
                        </TouchableOpacity>
                        {/* <TouchableOpacity>
                        <StyledText size={16} textContent="Posts" alignment="left" fontColor="#8B8B8B"/>
                        </TouchableOpacity> */}
                    </View>}

                    {faqDetails.length != 0 && 
                    <View style={styles.faqs}>
                        <StyledText size={20} textContent="Frequently Asked Questions" />
                        {faqDetails.map((faq)=>{
                          return <SingleFaq key={faq.questionContent} 
                          eventQns={faq.questionContent}
                          eventOrgPic={eventDetails.eventPic ? {uri: eventDetails.eventPic} : require('../../assets/images/DefaultEventPic.jpg')}
                          eventOrg={eventDetails.eventName}
                          eventAns={faq.answerContent} />
                      //     return <View key={faq.questionContent} style={styles.singleFaq}>
                      //     <View style={styles.qns}>
                      //         <View style={styles.Qlogo}>
                      //             <StyledText size={25} textContent="Q" />
                      //         </View>
                      //         <View style={styles.Qtext}>
                      //             <StyledText size={14} textContent={faq.questionContent} alignment="left"/>
                      //         </View>
                      //     </View>
                      //     <View style={styles.ans}>
                      //         <Image style={styles.faqPic} source={eventDetails.eventPic? {uri: eventDetails.eventPic} : require('../../assets/images/DefaultEventPic.jpg')}/>
                      //         <View style={styles.Atext}>
                      //             <View style={styles.orgDetails}>
                      //                 <StyledText size={12} textContent={eventDetails.eventName} fweight='bold' alignment="left"/>
                      //                 <StyledText size={12} textContent="Organiser" fontColor="#8B8B8B" alignment="left"/>
                      //             </View>
                      //             <View style={styles.comment}>
                      //                 <StyledText size={14} textContent={faq.answerContent} alignment="left"/>
                      //             </View>
                      //         </View>
                      //     </View>
                      // </View>
                        })
                        }
                        
                    </View>}


                </View>
            </View>
          </SafeAreaView>
        </View>
      </ScrollView>

      <View style={[styles.bottomButtonContainer, styles.iosShadow, styles.androidShadow]}>
        <View style={styles.bottomText}>
          <StyledText size={12} textContent="book ticket or rsvp now" alignment="left"/>
        </View>
        <View style={styles.bottomBtn}>
          <RoundBtn onPress={handleNext} text="Buy Tickets" icon="ticket-alt"/>
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  scrollCont: {
    backgroundColor: "#FBF3F1",
    // flexGrow: 1,
    // paddingBottom: 350
  },
  container: {
    flex: 1,
    backgroundColor: "#FBF3F1",
    alignItems: 'center',
    justifyContent: 'flex-start',
    // paddingBottom: 1000
    // height: 2000
  },
  bgColour: {
    backgroundColor: "#FBF3F1",
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#FBF3F1",
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
  eventDesc: {
    paddingTop: 10
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
  faqs: {
    paddingVertical: 10,
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  iosShadow: {
    shadowColor: '#000000',
    shadowOffset: { width: -2, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  androidShadow: {
    elevation: 10,
    shadowColor: '#000000',
  },
  bottomText:{
    width:"20%"
  },
  bottomBtn: {
    width: "70%"
  },

  heroBanner: {
    width: "100%",
    height: 200,
    position: "relative",
  },
  eventBg: {
    width: "100%",
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
  // singleFaq: {
  //   width: "100%",
  //   gap: 5,
  //   paddingVertical: 20,
  // },
  // qns: {
  //   width: "100%",
  //   flexDirection: "row",
  //   alignItems: "center",
  //   gap: 10,
  //   position: "relative",
  // },
  // Qlogo: {
  //   // backgroundColor: "#fff",
  //   // height: 45,
  //   width: 30,
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   borderRadius: 100,
  // },
  // Qtext:{
  //   width: "100%",
  //   maxWidth: "100%",
  //   position: "relative",
  //   flex: 1
  // },
  // ans:{
  //   // width: "100%",
  //   display: "flex",
  //   flexDirection: "row",
  //   gap: 10,
  //   maxWidth: "100%",
  //   position: "relative",
  // },
  // Atext: {
  //   flex: 1
  // },
  // orgDetails:{
  //   flexDirection: "row",
  //   gap: 20,
  //   flex: 1
  // },
  // faqPic: {
  //   height: 30,
  //   width: 30,
  //   borderRadius: 50,
  //   padding: 0,
  //   margin: 0,
  //   opacity: 1,
  //   position: "relative",
  // },
  // comment: {
  //   position: "relative",
  //   // width: "100%",
  // },



  

});

export default EventsPage;
