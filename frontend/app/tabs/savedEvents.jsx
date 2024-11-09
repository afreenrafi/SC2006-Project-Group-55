import React, {useContext} from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { AppContext } from '../context/AppContext';

const SavedEvents = () => {
  const { savedEvents } = useContext(AppContext);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Saved Events</Text>
      {savedEvents.length === 0 ? (
        <View style={styles.noEventsContainer}>
          <Text style={styles.noEventsText}>No events saved yet.</Text>
        </View>
      ) : (
        savedEvents.map((event) => (
          <View key={event.eventId} style={styles.savedEventCard}>
            <Image source={event.eventPic ? {uri: event.eventPic} : require('../../assets/images/DefaultEventPic.jpg')} style={styles.eventImage} />
            <View style={styles.eventDetailsContainer}>
              <Text style={styles.eventType}>{event.eventType}</Text>
              <Text style={styles.eventName}>{event.eventName}</Text>
              <Text style={styles.eventDate}>{
                new Intl.DateTimeFormat("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric"
                }).format(new Date(event.eventStartDate))}
            </Text>
              <Text style={styles.eventLocation}>{event.eventLocation}</Text>
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
    paddingTop: '15%',
    fontSize: 24,
    fontWeight: '600',
    marginVertical: 20,
    textAlign: 'center',
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

export default SavedEvents;
