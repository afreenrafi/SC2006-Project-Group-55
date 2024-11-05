import { View, SafeAreaView, Image, Modal, StyleSheet, TouchableOpacity, ActivityIndicator, Button, ScrollView, Platform } from "react-native";
import React, { useState, useEffect } from "react";
import StyledText from "../../components/forms/StyledText";
import { useNavigation } from '@react-navigation/native';
import { useStripe } from '@stripe/stripe-react-native';
import PageHeader from "../../components/events/PageHeader";
// import OrgDisplay from "../../components/OrgDisplay";
// import EventHeader from "../../components/EventHeader";
import RoundBtn from "../../components/forms/RoundBtn";
// import SingleDate from "../../components/SingleDate";
// import StyledInput from "../../components/StyledInput";
// import TicketSelector from "../../components/TicketSelector";
import { FontAwesome5 } from "@expo/vector-icons";




const OrderDetails = ({ route }) => {
  const { email, role, totalPrice, totalQty, selectedDate, quantities } = route.params;


  const navigation = useNavigation();

  const [eventDetails, setEventDetails] = useState(null);  // State to hold event details
  const [loading, setLoading] = useState(true);            // State to manage loading status
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
//   const [selectedDate, setSelectedDate] = useState(null); 
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedTicketType, setSelectedTicketType] = useState(null); // Track which ticket type is selected
//   const [quantities, setQuantities] = useState({}); // Object to store quantities for each ticket type
//   const [inputQty, setInputQty] = useState(0);
//   const [totalQty, setTotalQty] = useState(0);
//   const [totalPrice, setTotalPrice] = useState(0);




  


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
          eventId: 1,
          eventOrganiser: "National Heritage Board",
          eventOrgPic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbydUmQ-cFz6feUWRPjQxwoge_MhmhFu2REw&s",
          eventName: "Singapore Night Festival",
          eventPic: "https://onecms-res.cloudinary.com/image/upload/s--6V38L2Tn--/c_fill,g_auto,h_360,w_640/f_auto,q_auto/v1/8world/images/2023/08/16/article_with_video_website_cover_20.png?itok=4XUH0RhZ",
          eventStartDate: "Aug 13",
          eventEndDate: "Sep 7",
          eventType: "Festival",
          eventMode: "Standing",
          eventLocation: "Bras Basah, Bugis",
          eventTime: "7pm - 11pm",
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
          ],
          ticketOptions: [
            {
                ticketType: "Adult",
                ticketPrice: 11,
                ticketSlots: 20,
            },
            {
                ticketType: "Child",
                ticketPrice: 0,
                ticketSlots: 20,
            },
            {
                ticketType: "Elderly",
                ticketPrice: 11,
                ticketSlots: 20,
            },
          ]
          
        }); 
      }, 2000);
    });
  };

  const createPaymentIntent = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/payments/intents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: Math.floor(totalPrice * 100) }),
      });
      const data = await response.json();
      if (response.ok) {
        return data.paymentIntent;
      } else {
        throw new Error(data.message || 'Failed to create payment intent');
      }
    } catch (error) {
      console.error('Error creating payment intent:', error);
      return null;
    }
  };

  const createOrder = async (orderDetails) => {
    try {
      const response = await fetch('http://localhost:5001/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Order created successfully:', data);
      } else {
        console.error('Order creation failed:', data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const onCheckout = async () => {
    const clientSecret = await createPaymentIntent();
    if (!clientSecret) return;
    const { error } = await initPaymentSheet({
      merchantDisplayName: 'YourAppName',
      paymentIntentClientSecret: clientSecret,
    });
    if (error) {
      console.error('Error initializing payment sheet:', error.message);
      return;
    }
    const paymentResponse = await presentPaymentSheet();
    if (paymentResponse.error) {
      console.error(`Error code: ${paymentResponse.error.code}`, paymentResponse.error.message);
      return;
    }
    const orderDetails = {
      items: Object.keys(quantities).map(type => ({ type, quantity: quantities[type] })),
      total: totalPrice,
      customer: { email, role },
      date: selectedDate,
    };
    await createOrder(orderDetails);
  };

  const handleNext = async () => {
    try {
      await onCheckout();
      // navigation.navigate('events/BookingComplete', { 
      //   email: email, 
      //   role: role, 
      //   eventDetails: eventDetails,
      //   selectedDate: selectedDate
      // });
    } catch (error) {
      console.error("Failed to submit details:", error);
    }
  };
  

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
        <PageHeader title={"Order Details"} onPress={()=>navigation.goBack()}/>
      </SafeAreaView>
    
      <ScrollView style={styles.scrollCont} bounces={false} alwaysBounceVertical={false} nestedScrollEnabled={true} 
      contentContainerStyle={{ flexGlow: 1, paddingBottom: 50 }} >
        <View style={{ flex:1 }}>
          <SafeAreaView style={[styles.container, {flex: 1}]} >
          <View style={styles.eventSummary}>
                <View style={styles.selectCont}>
                    <Image style={styles.selectBg} source={{ uri: eventDetails.eventPic }} />
                    <View style={styles.selectView}>
                        <StyledText size={20} textContent={eventDetails.eventName} fontColor="#fff" fweight="bold"/>                        
                        <StyledText style={styles.pageTitle} size={14} textContent={eventDetails.eventLocation} fontColor="#fff" />
                        <View style={styles.selectDetails}>
                            <View style={[styles.sumDate, styles.sumTags]}>
                                <FontAwesome5 name="calendar-alt" size={14} color="#ffffff" />
                                <StyledText style={styles.pageTitle} size={14} textContent={selectedDate} fontColor="#fff" />
                            </View>
                            <View style={[styles.sumTime, styles.sumTags]}>
                                <FontAwesome5 name="clock" size={14} color="#ffffff" />
                                <StyledText style={styles.pageTitle} size={14} textContent={eventDetails.eventTime} fontColor="#fff" />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.summary}>
                    <View style={styles.divTitle}>
                        <StyledText size={26} textContent="Order Summary" alignment="left"/>
                    </View>
                    {eventDetails.ticketOptions.map((option) => {
                        const qty = quantities[option.ticketType];
                        if (qty > 0) {
                            return (
                            <View style={styles.priceItem} key={option.ticketType}>
                                <StyledText size={20} textContent={`${qty} x ${option.ticketType} Ticket`} alignment="left" />
                                <StyledText size={20} textContent={`$${(qty * option.ticketPrice).toFixed(2)}`} alignment="left" fweight="bold" />
                            </View>
                            );
                        }
                        return null;
                    })}
                    {/* <View style={styles.priceItem}>
                        <StyledText size={20} textContent={"2" + "x Adult Ticket"} alignment="left"/>
                        <StyledText size={20} textContent={"$" + "0.00"} alignment="left" fweight="bold"/>
                    </View>
                    <View style={styles.priceItem}>
                        <StyledText size={20} textContent={"2" + "x Child Ticket"} alignment="left"/>
                        <StyledText size={20} textContent={"$" + "0.00"} alignment="left" fweight="bold"/>
                    </View>
                    <View style={styles.priceItem}>
                        <StyledText size={20} textContent={"2" + "x Elderly Ticket"} alignment="left"/>
                        <StyledText size={20} textContent={"$" + "0.00"} alignment="left" fweight="bold"/>
                    </View> */}
                    <View style={styles.totalItem}>
                        <StyledText size={20} textContent={"Total"} alignment="left"/>
                        <StyledText size={20} textContent={"$" + String(totalPrice)} alignment="left" fweight="bold" fontColor="#CA3550"/>
                    </View>
                </View>
                

            </View>  
          
            
            
          </SafeAreaView>
        </View>
      </ScrollView>

      <View style={[styles.bottomButtonContainer, styles.iosShadow, styles.androidShadow]}>
        <View style={styles.bottomText}>
          <StyledText size={20} textContent={"$"+String(totalPrice)} alignment="left" fontColor="#CA3550" fweight="bold"/>
          <StyledText size={12} textContent={`for ${String(totalQty)} items`} alignment="left"/>
        </View>
        <View style={styles.bottomBtn}>
          <RoundBtn onPress={handleNext} text="Pay Now" icon="credit-card"/>
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
  eventSummary: {
    paddingHorizontal: 30,
    justifyContent: 'center',
    borderColor: 'red',
    position: "relative",
    width: "100%",
  },  
  bgColour: {
    backgroundColor: "#FBF3F1",
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
//   eventCont: {
//     position: "relative",
//     width: "100%",
//     backgroundColor: "#FBF3F1",
//   },
//   overlap: {
//     // position: "absolute",
//     backgroundColor: "#FBF3F1",
//     padding: 30,
//     width: "100%",
//     top: -30,
//     borderRadius: 25,
//   },
//   eventDesc: {
//     paddingTop: 10
//   },
//   artistList: {
//     flexDirection: "row",
//     gap: 20,
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingVertical: 20,
//   },
//   artistPics:{
//     flexDirection: "row",
//     position: "relative"
//   },
//   artistPic: {
//     height: 45,
//     width: 45,
//     borderRadius: 50,
//     padding: 0,
//     margin: 0,
//     opacity: 1,
//     position: "relative",
//     marginRight: -15,
//   },
//   tabOptions: {
//     flexDirection: "row",
//     gap: 30,
//     width: "100%",
//     borderBottomColor: "#D5D5D5",
//     borderBottomWidth: 1,
//     paddingVertical: 10,
//   },
//   faqs: {
//     paddingVertical: 10
//   },
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
    width:"30%"
  },
  bottomBtn: {
    width: "70%"
  },
//   ticketCont: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: "space-between",
//     width: '100%',
//     paddingVertical: 20,
//   },
//   datesCont: {
//     width: '20%',
//   },
//   datesScroll:{
//     maxHeight: 230,
//   },
//   tixChoose: {
//     width: '80%',
//   },

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
        backgroundColor: "rgba(0,0,0,0.8)",
        bottom: 0,
        borderRadius: 10,
        padding: 10
      },
      selectDetails: {
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        justifyContent: 'space-between',
        paddingTop: 10
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
      sumTags: {
        flexDirection: "row",
        gap: 5
      },
      summary: {
        paddingVertical: 5
      },
      divTitle: {
        paddingVertical: 10
      },
      priceItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
      },
      totalItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15,
        backgroundColor: "#FFFFFF",
        borderRadius: 30,
        marginVertical: 10,
      }
  
  
  



  

});

export default OrderDetails;
