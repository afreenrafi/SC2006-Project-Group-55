import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import { fetchAllEvents } from '../../apicalls/EventApi';

import { ErrorContext } from '../context/ErrorContext';
import NetworkErrorScreen from '../../components/screen/NetworkErrorScreen';

const TicketsScreen = () => {
  const [allEvents, setAllEvents] = useState(null);
  const [displayEvents, setDisplayEvents] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const { error, handleError } = useContext(ErrorContext);
  const { clearError } = useContext(ErrorContext);

  const navigation = useNavigation();

  const toEventPage = async (eventId) => {
    navigation.navigate('events/EventsPage', { eventId: eventId });
  };

  const getAllEvents = async () => {
    try{
      setLoading(true);
      clearError();
      const events = await fetchAllEvents();
      if (events) {
        const uniqueEvents = Array.from(new Map(events.map(item => [item.eventId, item])).values());
        setAllEvents(uniqueEvents);
        setDisplayEvents(uniqueEvents);
      }
      setLoading(false);
    } catch (error){
      handleError('Server error. Please try again later.');
      setLoading(false);
    }
    
  };


  useEffect(() => {
    getAllEvents();
  }, []);


  const renderEvent = ({ item }) => (
    <TouchableOpacity style={styles.eventCard} onPress={() => toEventPage(item.eventId)}>
      <Text style={styles.eventName}>{item.eventName}</Text>
      <View style={styles.imageContainer}>
        <Image source={item.eventPic ? {uri: item.eventPic} : require('../../assets/images/DefaultEventPic.jpg')} style={styles.eventImage} />
      </View>
      <View style={styles.eventDetails}>
        <Text style={styles.eventLocation}>{item.eventLocation}</Text>
        <Text style={styles.eventDate}>{new Date(item.eventStartDate).toLocaleDateString()}</Text>
        <Text style={styles.eventTime}>{new Date(item.eventOpen).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text === "") {
      setDisplayEvents(allEvents);
    } else {
      const filteredEvents = allEvents.filter((event) =>
        event.eventName.toLowerCase().includes(text.toLowerCase())
      );
      setDisplayEvents(filteredEvents);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#CA3550" />
        <Text>Loading event details...</Text>
      </View>
    );
  }
  if (error) {
    return <NetworkErrorScreen onRetry={getAllEvents}/>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Events</Text>
      <View style={styles.searchBar}>
        <FontAwesome name="search" size={20} color="#ababab" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#ababab"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <FlatList
        data={displayEvents}
        renderItem={renderEvent}
        keyExtractor={(item) => item.eventId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#FBF3F1",
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FBF3F1',
  },
  title: {
    paddingTop: '10%',
    fontSize: 24,
    fontWeight: '600',
    marginVertical: 20,
    textAlign: 'center',
  },
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 7,
  },
  searchInput: {
    flex: 1,
  },
  eventCard: {
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  imageContainer: {
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  eventImage: {
    width: "95%",
    alignSelf: "center",
    height: 150,
    borderRadius: 10,
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  eventDetails: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 10,
  },
  eventLocation: {
    fontSize: 14,
    color: "#555",
  },
  eventDate: {
    fontSize: 14,
    color: "#555",
  },
  eventTime: {
    fontSize: 14,
    color: "#555",
  },
});

export default TicketsScreen;
