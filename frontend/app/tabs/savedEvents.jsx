import React, { useContext, useEffect, useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { AppContext } from '../context/AppContext';

import { ErrorContext } from '../context/ErrorContext';
import NetworkErrorScreen from '../../components/screen/NetworkErrorScreen';
import { useFocusEffect } from '@react-navigation/native';
import { getBookmarkedEvents } from '../../apicalls/EventApi';
import StyledText from '../../components/forms/StyledText';
import { useNavigation } from '@react-navigation/native';





const SavedEvents = ({ route }) => {
  const navigation = useNavigation();
  const { username } = route.params;

  // const { savedEvents } = useContext(AppContext);
  const { error, handleError } = useContext(ErrorContext);
  const { clearError } = useContext(ErrorContext);

  const [loading, setLoading] = useState(true);
  const [ savedEvents, setSavedEvents] = useState(null);

  const toEventPage = async (eventId) => {
    navigation.navigate('events/EventsPage', { eventId: eventId, username: username });
  };


  const fetchBookmarkedEvents = async () => {
    try {
      setLoading(true);
      clearError();
      const bookmarked = await getBookmarkedEvents(username);
      console.log(bookmarked);
      setSavedEvents(bookmarked);
      setLoading(false);
      // Process result
    } catch (e) {
      handleError('Unable to fetch events. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect( useCallback( ()=>{
    // console.log("saved " + savedEvents);
    fetchBookmarkedEvents();
  }, [clearError, handleError]));


  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#CA3550" />
        <StyledText size={20} textContent="Loading event details..." />
      </View>
    );
  }
  if (error) {
    return <NetworkErrorScreen onRetry={fetchBookmarkedEvents}/>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Saved Events</Text>
      {savedEvents.length === 0 ? (
        <View style={styles.noEventsContainer}>
          <Text style={styles.noEventsText}>No events saved yet.</Text>
        </View>
      ) : (
        savedEvents.map((event) => (
          <TouchableOpacity key={event.eventId} onPress={() => toEventPage(event.eventId)}>
          <View style={styles.savedEventCard}>
            <Image source={event.eventPic ? {uri: event.eventPic} : require('../../assets/images/DefaultEventPic.jpg')} style={styles.eventImage} />
            <View style={styles.eventDetailsContainer}>
              <Text style={styles.eventType}>{event.eventGenre}</Text>
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
          </TouchableOpacity>
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
