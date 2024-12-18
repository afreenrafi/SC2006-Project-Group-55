import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, SafeAreaView, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import PageHeader from '../../components/events/PageHeader';
import StyledText from '../../components/StyledText';
import RoundBtn from '../../components/forms/RoundBtn';

import { ErrorContext } from '../context/ErrorContext';
import NetworkErrorScreen from '../../components/screen/NetworkErrorScreen';

const BookingComplete = ({ route }) => {
    const navigation = useNavigation();
    const { username, role, eventDetails, selectedDate, eventTime, ticketDetails, quantities } = route.params;
    const [isQrModalVisible, setQrModalVisible] = useState(false);
    const [eventDate, setEventDate] = useState(null);

    const { error, handleError } = useContext(ErrorContext);
    const [loading, setLoading] = useState(true);            // State to manage loading status
    const { clearError } = useContext(ErrorContext);

  

    

    console.log(eventTime);

    const handleNext = async () => {
        try {
            navigation.navigate('tabs', { 
            username: username, 
            role: role, 
            // eventDetails: eventDetails,
            // selectedDate: selectedDate
            });
        } catch (error) {
            console.error("Failed to submit details:", error);
            handleError('Server error. Please try again later.');
        }
    };

    useEffect(() => {
      setLoading(true);
      clearError();
      const date = new Date(selectedDate);

      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      setEventDate(date.toLocaleDateString('en-US', options));
      setLoading(false);
      
    }, []);

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
        <SafeAreaView style={{ flex:1, backgroundColor: "#FBF3F1" }}>
            {/* <PageHeader title={"Booking Complete"} onPress={()=>navigation.goBack()}/> */}
            <View style={styles.headerTitle}>
              <StyledText size={20} textContent={"Booking Complete"}/>
            </View>
            <View style={styles.container}>
                {/* Ticket Image and Title */}
                <View style={styles.ticketContainer}>
                <Image source={eventDetails.eventPic? {uri: eventDetails.eventPic} : require('../../assets/images/DefaultEventPic.jpg')} style={styles.ticketImage} />
                <Text style={styles.ticketTitle}>{eventDetails.eventName}</Text>
        
                {/* Ticket Info */}
                <View style={styles.ticketInfoContainer}>
                    <View style={styles.infoColumn}>
                    <Text style={styles.infoLabel}>Date</Text>
                    <Text style={styles.infoText}>{eventDate}</Text>
                    </View>
                    <View style={styles.infoColumn}>
                    <Text style={styles.infoLabel}>Time</Text>
                    <Text style={styles.infoText}>{eventTime}</Text>
                    </View>
                    <View style={styles.infoColumn}>
                    <Text style={styles.infoLabel}>Venue</Text>
                    <Text style={styles.infoText}>{eventDetails.eventLocation}</Text>
                    </View>
                      <View style={styles.infoColumn}>
                      <Text style={styles.infoLabel}>Tickets</Text>
                      {ticketDetails.map((option) => {
                          const qty = quantities[option.ticketType];
                          if (qty > 0) {
                              return (
                                <Text style={styles.infoText} key={option.ticketType}>{qty}x {option.ticketType} Ticket</Text>
                              // <View style={styles.priceItem} key={option.ticketType}>
                              //     <StyledText size={20} textContent={`${qty} x ${option.ticketType} Ticket`} alignment="left" />
                              //     <StyledText size={20} textContent={`$${(qty * option.ticketPrice).toFixed(2)}`} alignment="left" fweight="bold" />
                              // </View>
                              );
                          }
                          return null;
                      })}
                    </View>
                </View>
        
                {/* Show QR Code Button */}
                <TouchableOpacity style={styles.qrButton} onPress={() => setQrModalVisible(true)}>
                    <FontAwesome name="qrcode" size={18} color="#FFF" />
                    <Text style={styles.qrButtonText}>Show QR Code</Text>
                </TouchableOpacity>
                
                {/* Download Image Button */}
                {/* <TouchableOpacity style={styles.downloadButton}>
                    <FontAwesome name="download" size={18} color="#CA3550" />
                    <Text style={styles.downloadButtonText}>Download Image</Text>
                </TouchableOpacity> */}

                {/* QR Code Modal */}
                <Modal
                    visible={isQrModalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setQrModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                    <View style={styles.qrCodeModal}>
                        <Text style={styles.modalTitle}>Your QR Code</Text>
                        <QRCode
                        value={eventDetails.qrCodeValue ? String(eventDetails.qrCodeValue) : 'Event QR Code'}
                        size={250}
                        />
                        <TouchableOpacity style={styles.closeButton} onPress={() => setQrModalVisible(false)}>
                        <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </Modal>
                </View>

                


            </View>
            <View style={[styles.bottomButtonContainer, styles.iosShadow, styles.androidShadow]}>
                <View style={styles.bottomBtn}>
                    <RoundBtn onPress={handleNext} text="Back to Home" icon="home"/>
                </View>
            </View>
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  headerTitle: {
    padding: 30,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  container: {
    flex: 1,
    backgroundColor: '#FBF3F1',
    paddingHorizontal: 16,
    // marginTop: "10%",
  },
  backButton: {
    position: 'absolute',
    top: 28,
    left: 16,
    zIndex: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
    color: '#000',
  },
  ticketContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 16,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  ticketImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  ticketTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
    marginVertical: 8,
  },
  ticketInfoContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  infoColumn: {
    marginVertical: 5,
  },
  infoLabel: {
    fontSize: 12,
    color: '#888',
  },
  infoText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  qrButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CA3550',
    paddingVertical: 10,
    borderRadius: 20,
    marginVertical: 10,
  },
  qrButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    marginLeft: 8,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#CA3550',
    marginVertical: 5,
  },
  downloadButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#CA3550',
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  qrCodeModal: {
    width: 300,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#CA3550',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
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
  bottomBtn: {
    width: "100%"
  },
});

export default BookingComplete;