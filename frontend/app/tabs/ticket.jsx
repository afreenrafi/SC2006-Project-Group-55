import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { mockUpcomingEvents, mockPopularEvents, mockNearbyEvents } from './mockData';

const allEvents = [
  ...mockUpcomingEvents,
  ...mockPopularEvents,
  ...mockNearbyEvents,
];

// remove duplicate events based on id
const uniqueEvents = Array.from(new Map(allEvents.map(item => [item.id, item])).values());

const TicketsScreen = () => {
  const [displayEvents, setDisplayEvents] = useState(uniqueEvents);
  const [searchQuery, setSearchQuery] = useState("");

  const renderEvent = ({ item }) => (
    <TouchableOpacity style={styles.eventCard}>
      <Text style={styles.eventName}>{item.name}</Text>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.eventImage} />
      </View>
      <View style={styles.eventDetails}>
        <Text style={styles.eventLocation}>{item.location}</Text>
        <Text style={styles.eventDate}>{item.date}</Text>
        <Text style={styles.eventTime}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleSearch = (text) => {
    const filteredEvents = uniqueEvents.filter((event) =>
      event.name.toLowerCase().includes(text.toLowerCase())
    );
    setSearchQuery(text);
    setDisplayEvents(filteredEvents);
  };

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
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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