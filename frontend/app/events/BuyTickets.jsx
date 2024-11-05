import { View, SafeAreaView, Modal, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import StyledText from "../../components/forms/StyledText";
import { useNavigation } from '@react-navigation/native';
// import { useStripe } from '@stripe/stripe-react-native';

import PageHeader from "../../components/events/PageHeader";
import OrgDisplay from "../../components/OrgDisplay";
import EventHeader from "../../components/events/EventHeader";
import RoundBtn from "../../components/forms/RoundBtn";
import SingleDate from "../../components/SingleDate";
import StyledInput from "../../components/forms/StyledInput";
import TicketSelector from "../../components/events/TicketSelector";




const BuyTickets = ({ route }) => {
  const { email, role } = route.params;

  const navigation = useNavigation();

  const [eventDetails, setEventDetails] = useState(null);  // State to hold event details
  const [loading, setLoading] = useState(true);            // State to manage loading status
  const [selectedDate, setSelectedDate] = useState(null); 
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTicketType, setSelectedTicketType] = useState(null); // Track which ticket type is selected
  // const [adultQty, setAdultQty] = useState(0);
  // const [childQty, setChildQty] = useState(0);
  const [quantities, setQuantities] = useState({}); // Object to store quantities for each ticket type
  const [inputQty, setInputQty] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // const { initPaymentSheet, presentPaymentSheet } = useStripe();


  // const dispatch = useDispatch();
  // const [createOrder, { data, error, isLoading }] = useCreateOrderMutation();
  // const [createPaymentIntent] = useCreatePaymentIntentMutation();
  // const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const handleQtyChange = (ticketType, qty) => {
    setQuantities(prev => {
      const updatedQuantities = { ...prev, [ticketType]: qty };

      // Update total quantity and total price
      const updatedTotalQty = Object.values(updatedQuantities).reduce((acc, val) => acc + val, 0);
      const updatedTotalPrice = eventDetails.ticketOptions.reduce((acc, option) => {
        const quantity = updatedQuantities[option.ticketType] || 0;
        return acc + quantity * option.ticketPrice;
      }, 0);

      setTotalQty(updatedTotalQty);
      setTotalPrice(updatedTotalPrice.toFixed(2));

      return updatedQuantities;
    });
  };


  const handleInputChange = (text) => {
    if (!eventDetails) return; // Exit if eventDetails is not yet loaded
  
    // const maxSlots = selectedTicketType === 'Adult' 
    //   ? eventDetails.ticketOptions[0].ticketSlots 
    //   : eventDetails.ticketOptions[1].ticketSlots;
    const ticket = eventDetails.ticketOptions.find(option => option.ticketType === selectedTicketType);
    const maxSlots = ticket ? ticket.ticketSlots : 0;
  
    // Ensure the input is a valid number and within the allowed range
    const numericQty = text.replace(/[^0-9]/g, ''); // Remove non-numeric characters
  
    if (numericQty === '' || (parseInt(numericQty) >= 0 && parseInt(numericQty) <= maxSlots)) {
      setInputQty(numericQty);
    } else if (parseInt(numericQty) > maxSlots) {
      setInputQty(maxSlots.toString()); // Set to max slots if input exceeds the limit
    }
  };
  
  const openModalForTicketType = (type) => {
    setSelectedTicketType(type);
    setInputQty(quantities[type] || 0);
    setModalVisible(true);
  };

  const handleModalDone = () => {
    const quantity = parseInt(inputQty) || 0;
    
    // Call handleQtyChange with the selected ticket type and the new quantity
    handleQtyChange(selectedTicketType, quantity);
    
    setModalVisible(false); // Close the modal
  };
  


  useEffect(() => {
    const getEventDetails = async () => {
      try {
        const details = await fetchEventDetails();  // Fetch event details
        setEventDetails(details);                  // Set the fetched details to state

        // Initialize quantities object for each ticket type
        const initialQuantities = {};
        details.ticketOptions.forEach(option => {
          initialQuantities[option.ticketType] = 0;
        });
        setQuantities(initialQuantities);

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
          eventLocation: "Bras Basah, Bugis",
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

  const handleSelectDate = (date) => setSelectedDate(date);

  // const createPaymentIntent = async () => {
  //   try {
  //     const response = await fetch('http://localhost:5001/api/payments/intents', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ amount: Math.floor(totalPrice * 100) }),
  //     });
  //     const data = await response.json();
  //     if (response.ok) {
  //       return data.paymentIntent;
  //     } else {
  //       throw new Error(data.message || 'Failed to create payment intent');
  //     }
  //   } catch (error) {
  //     console.error('Error creating payment intent:', error);
  //     return null;
  //   }
  // };

  // const createOrder = async (orderDetails) => {
  //   try {
  //     const response = await fetch('http://localhost:5001/api/orders', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(orderDetails),
  //     });
  //     const data = await response.json();
  //     if (response.ok) {
  //       console.log('Order created successfully:', data);
  //     } else {
  //       console.error('Order creation failed:', data.message || 'Unknown error');
  //     }
  //   } catch (error) {
  //     console.error('Error creating order:', error);
  //   }
  // };

  // const onCheckout = async () => {
  //   const clientSecret = await createPaymentIntent();
  //   if (!clientSecret) return;
  //   const { error } = await initPaymentSheet({
  //     merchantDisplayName: 'YourAppName',
  //     paymentIntentClientSecret: clientSecret,
  //   });
  //   if (error) {
  //     console.error('Error initializing payment sheet:', error.message);
  //     return;
  //   }
  //   const paymentResponse = await presentPaymentSheet();
  //   if (paymentResponse.error) {
  //     console.error(`Error code: ${paymentResponse.error.code}`, paymentResponse.error.message);
  //     return;
  //   }
  //   const orderDetails = {
  //     items: Object.keys(quantities).map(type => ({ type, quantity: quantities[type] })),
  //     total: totalPrice,
  //     customer: { email, role },
  //     date: selectedDate,
  //   };
  //   await createOrder(orderDetails);
  // };
  
  

  const handleNext = async () => {
    try {
      navigation.navigate('events/OrderDetails', { 
        email: email, 
        role: role, 
        totalPrice: totalPrice, 
        totalQty: totalQty,
        selectedDate: selectedDate,
        quantities: quantities
      });
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
                        {eventDetails.ticketOptions.map((option) => (
                          <TicketSelector
                            key={option.ticketType}
                            ticketType={option.ticketType}
                            ticketPrice={option.ticketPrice}
                            ticketSlots={option.ticketSlots}
                            eventLocation={eventDetails.eventLocation}
                            imageUri={eventDetails.eventPic}
                            quantity={quantities[option.ticketType]}
                            onQtyChange={(qty) => handleQtyChange(option.ticketType, qty)}
                            openModal={() => openModalForTicketType(option.ticketType)}
                          />
                        ))}

                      
                    </View>
                    
                  </View>
                </View>
            </View>
          </SafeAreaView>
        </View>
      </ScrollView>

      <View style={[styles.bottomButtonContainer, styles.iosShadow, styles.androidShadow]}>
        <View style={styles.bottomText}>
          <StyledText size={20} textContent={(totalQty > 0) && `$ ${String(totalPrice)}` } alignment="left" fontColor="#CA3550" fweight="bold"/>
          <StyledText size={12} textContent={(totalQty > 0) ? `you're going +${totalQty}` : "select ticket to continue"} alignment="left"/>
        </View>
        <View style={styles.bottomBtn}>
          <RoundBtn onPress={handleNext} text="Checkout" icon="shopping-cart" disabled={(totalQty > 0) ? false : true}/>
        </View>
      </View>
      
      <Modal
            animationType="none"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}  // Close the modal on request
        >
            <View style={styles.modalOverlay}>
            <View style={styles.modalView}>
                <StyledText size={24} textContent="Type Quantity" />
                <View style={styles.modalOptions}>
                    <StyledInput data={String(inputQty)} onChangeText={handleInputChange} type="numeric"/>

                {/* <TouchableOpacity style={styles.modalItem} onPress={() => handleRoleSelect("General Public")}>
                    <StyledText size={20} textContent="General Public" fontColor="#FFF"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalItem} onPress={() => handleRoleSelect("Organiser")}>
                    <StyledText size={20} textContent="Organiser" fontColor="#FFF"/>
                </TouchableOpacity> */}
                </View>
                <RoundBtn text="done" onPress={handleModalDone}/>
            </View>
            </View>
        </Modal>

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
    width:"30%"
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
    width: '80%',
  },

  // selectCont: {
  //   width: "100%",
  //   height: 180,
  //   position: "relative",
  //   borderRadius: 10,
  //   overflow: "hidden",
  //   marginVertical: 10
  // },
  // selectBg: {
  //   height: "100%",
  // },
  // selectView: {
  //   width: "100%",
  //   position: "absolute",
  //   backgroundColor: "#5F525D",
  //   bottom: 0,
  //   borderRadius: 10,
  //   padding: 10
  // },
  // selectDetails: {
  //   display: "flex",
  //   flexDirection: "row",
  //   alignContent: "center",
  //   justifyContent: 'space-between'
  // },
  // selectQty: {
  //   display: "flex",
  //   flexDirection: "row",
  //   alignContent: "center",
  //   justifyContent: 'space-between',
  //   paddingTop: 10,
  // },
  // selectNum: {
  //   display: "flex",
  //   flexDirection: "row",
  //   alignContent: "center",
  //   gap: 20,
  //   position: "absolute",
  //   bottom: 10,
  //   right: 10,
  // },
  // qtyCount: {
  //   minWidth: 30,
  //   alignItems: "center",
  //   justifyContent: "center"
  // },

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
        paddingVertical: 10,
        gap: 10,
        width: '25%'
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

export default BuyTickets;
