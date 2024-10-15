import React, {useContext} from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { mockSavedEvents } from './mockData'; 


const SavedEventsPage = () => {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Saved Events</Text>
        {mockSavedEvents.length === 0 ? (
          <View style={styles.noEventsContainer}>
            <Text style={styles.noEventsText}>No events saved yet.</Text>
          </View>
        ) : (
          mockSavedEvents.map((event) => (
            <View key={event.id} style={styles.savedEventCard}>
              <Image source={event.image} style={styles.eventImage} />
              <View style={styles.eventDetailsContainer}>
                <Text style={styles.eventType}>{event.type}</Text>
                <Text style={styles.eventName}>{event.name}</Text>
                <Text style={styles.eventDate}>{event.date}</Text>
                <Text style={styles.eventLocation}>{event.location}</Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF3F1',
    paddingHorizontal: 20,
  },
  title: {
    paddingTop: '17%',
    fontSize: 24,
    fontWeight: '600',
    marginVertical: 20,
  },
  noEventsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  noEventsText: {
    fontSize: 18,
    color: '#888',
  },
  savedEventCard: {
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  eventImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  eventDetailsContainer: {
    paddingVertical: 10,
  },
  eventType: {
    color: '#EE1C43',
    fontSize: 14,
    fontWeight: 'bold',
  },
  eventName: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 5,
  },
  eventDate: {
    fontSize: 14,
    color: '#888',
  },
  eventLocation: {
    fontSize: 12,
    color: '#AAA',
  },
});

export default SavedEventsPage;
