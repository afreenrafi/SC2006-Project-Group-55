import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { mockUpcomingEvents } from './mockData';  

const Ticket = () => {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Your Tickets</Text>
  
        {mockUpcomingEvents.map(ticket => (
          <View key={ticket.id} style={styles.ticketCard}>
            {/* Ticket Image */}
            <Image source={ticket.image} style={styles.barcodeImage} />
  
            {/* Ticket Information */}
            <View style={styles.ticketInfo}>
              <Text style={styles.eventName}>{ticket.name}</Text>
              <Text style={styles.eventLocation}>{ticket.location}</Text>
              <Text style={styles.eventDate}>{ticket.date}</Text>
            </View>
  
            {/* Action Buttons */}
            <View style={styles.eventActionsContainer}>
            <TouchableOpacity style={styles.shareButton}>
              <FontAwesome name="share" size={12} color="#EE1C43" />
              <Text style={styles.shareButtonText}> Share</Text> 
            </TouchableOpacity>
            <TouchableOpacity style={styles.detailsButton}>
              <FontAwesome name="info" size={12} color="#FFF" />
              <Text style={styles.detailsButtonText}> Details</Text> 
            </TouchableOpacity>
          </View>
        </View>
        ))}
      </ScrollView>
    );
  };

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F9F3EC',
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
      marginBottom: 20,
      paddingTop: '15%',
    },
    ticketCard: {
      backgroundColor: '#FFFFFF',
      borderRadius: 15,
      padding: 20,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    barcodeImage: {
      width: '100%',
      height: 120,
      borderRadius: 10,
      marginBottom: 20,
    },
    ticketInfo: {
      marginBottom: 10,
    },
    eventName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
    },
    eventLocation: {
      fontSize: 14,
      color: '#666',
      marginTop: 5,
    },
    eventDate: {
        fontSize: 10,
        color: '#888',
        marginTop: 5,
    },
    eventActionsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    shareButton: {
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: '#FFF',
        borderColor: '#FF93B3',
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        marginRight: 5,
      },
      shareButtonText: {
        color: '#EE1C43',
        fontWeight: '600',
        fontSize: 12,
        marginLeft: 3,
      },
      detailsButton: {
        flexDirection: 'row', 
        alignItems: 'center',
        backgroundColor: '#EE1C43',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
      },
      detailsButtonText: {
        color: '#FFF',
        fontWeight: '600',
        fontSize: 12,
        marginLeft: 3,
      },
  });
  
  export default Ticket;
