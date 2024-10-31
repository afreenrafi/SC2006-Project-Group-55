import { View, SafeAreaView, Image, Modal, StyleSheet, TouchableOpacity, ActivityIndicator, Button, ScrollView, Platform } from "react-native";
import React, { useState, useEffect } from "react";
import StyledText from "../../components/StyledText";
import { useNavigation } from '@react-navigation/native';
import PageHeader from "../../components/PageHeader";
import OrgDisplay from "../../components/OrgDisplay";
import EventHeader from "../../components/EventHeader";
import RoundBtn from "../../components/RoundBtn";
import SingleDate from "../../components/SingleDate";



const BuyTickets = ({ route }) => {
  const { email, role } = route.params;

  const navigation = useNavigation();

  const [eventDetails, setEventDetails] = useState(null);  // State to hold event details
  const [loading, setLoading] = useState(true);            // State to manage loading status
  const [selectedDate, setSelectedDate] = useState(null); 

  // Fetch event details when component mounts
  useEffect(() => {
    const getEventDetails = async () => {
      try {
        const details = await fetchEventDetails();  // Fetch event details
        setEventDetails(details);                  // Set the fetched details to state

        // Set the initial selected date to the first date in eventDates
        if (details.eventDates && details.eventDates.length > 0) {
            const firstDate = `${details.eventDates[0].day}-${details.eventDates[0].month}`;
            setSelectedDate(firstDate);
        }

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
          eventId: 1,
          eventOrganiser: "National Heritage Board",
          eventOrgPic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbydUmQ-cFz6feUWRPjQxwoge_MhmhFu2REw&s",
          eventName: "Singapore Night Festival",
          eventPic: "https://onecms-res.cloudinary.com/image/upload/s--6V38L2Tn--/c_fill,g_auto,h_360,w_640/f_auto,q_auto/v1/8world/images/2023/08/16/article_with_video_website_cover_20.png?itok=4XUH0RhZ",
          eventStartDate: "Aug 13",
          eventEndDate: "Sep 7",
          eventType: "Festival",
          eventMode: "Standing",
          eventDates: [
            {
                day: "01",
                month: 'SEP'
            },
            {
                day: "02",
                month: 'SEP'
            },
            {
                day: "03",
                month: 'SEP'
            },
            {
                day: "04",
                month: 'SEP'
            },
            {
                day: "05",
                month: 'SEP'
            },
            {
                day: "06",
                month: 'SEP'
            },
            {
                day: "07",
                month: 'SEP'
            },
          ]
          
        }); 
      }, 2000);
    });
  };

  const handleSelectDate = (date) => setSelectedDate(date);


  


  const handleNext = async () => {
    try {
      // const result = await submitUserDetails();  // Simulate sending data
      // console.log("User details submitted:", result);
      navigation.navigate('NextPage', { email: email, role: role });  // Navigate to new page with email
    } catch (error) {
      console.error("Failed to submit details:", error);
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


  return (
    <View style={{ flex:1 }}>
      <SafeAreaView style={styles.bgColour}>
        <PageHeader title={"Buy Tickets"} onPress={()=>navigation.goBack()}/>
      </SafeAreaView>
    
      <ScrollView style={styles.scrollCont} bounces={false} alwaysBounceVertical={false} nestedScrollEnabled={true} 
      contentContainerStyle={{ flexGlow: 1, paddingBottom: 50 }} >
        <View style={{ flex:1 }}>
          <SafeAreaView style={[styles.container, {flex: 1}]} >
            {/* <PageHeader title={"Event Page"} onPress={()=>navigation.goBack()}/> */}
            <OrgDisplay 
              eventPic={eventDetails.eventPic} 
              eventOrgPic={eventDetails.eventOrgPic} 
              eventOrg={eventDetails.eventOrganiser} 
            />
            <View style={styles.eventCont}>
                <View style={styles.overlap}>
                  <EventHeader 
                  eventStart={eventDetails.eventStartDate} 
                  eventEnd={eventDetails.eventEndDate} 
                  eventType={eventDetails.eventType} 
                  eventMode={eventDetails.eventMode} 
                  eventName={eventDetails.eventName} 
                  />
                  <View style={styles.ticketCont}>
                    <View style={styles.datesCont}>
                        <ScrollView style={styles.datesScroll}>
                            {eventDetails.eventDates.map((date, index) => {
                                const dateKey = `${date.day}-${date.month}`;
                                const isAboveSelected = selectedDate && index === eventDetails.eventDates.findIndex(d => `${d.day}-${d.month}` === selectedDate) - 1;

                                return (
                                <SingleDate
                                    key={dateKey}
                                    day={date.day}
                                    month={date.month}
                                    selected={selectedDate === dateKey}
                                    isAboveSelected={isAboveSelected}
                                    onPress={() => handleSelectDate(dateKey)}
                                />
                                );
                            })}
                        </ScrollView>
                    </View>
                    <View style={styles.tixChoose}>
                        <StyledText size={20} textContent="Choose the ticket" />
                        
                    </View>
                    
                  </View>
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
          <RoundBtn text="Checkout" icon="cart-plus"/>
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
    paddingVertical: 10
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
  ticketCont: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-between",
    width: '100%',
    paddingVertical: 20,
  },
  datesCont: {
    width: '20%',
  },
  datesScroll:{
    maxHeight: 230,
  },
  tixChoose: {
    width: '75%',

  },
  



  

});

export default BuyTickets;
