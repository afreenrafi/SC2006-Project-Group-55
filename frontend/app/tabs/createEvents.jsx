import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { AppContext } from '../context/AppContext'; // Assuming saved events are stored in context
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const CreateEvents = () => {
  const { createdEvents } = useContext(AppContext); // Assuming `createdEvents` holds organizer's events
  const navigation = useNavigation();
  const handleCreateEvent = () => {
    navigation.navigate('EventCreationForm'); // Ensure the name matches exactly
  };

  const renderEvent = ({ item }) => (
    <View style={styles.eventCard}>
      {/*<Image source={{ uri: item.imageUrl }} style={styles.eventImage} />*/}
      <View style={styles.eventInfo}>
        <Text style={styles.eventName}>{item.name}</Text>
        <Text style={styles.eventDistance}>{item.distance} away from you</Text>
        <Text style={styles.eventDate}>Last viewed on {item.lastViewedDate}</Text>
        <Text style={styles.eventDate}>Saved on {item.savedDate}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Events</Text>
      
      <FlatList
        data={createdEvents} // Array of events created by the organizer
        renderItem={renderEvent}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />

      {/* Floating Action Button to add a new event */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={handleCreateEvent}
      >
        <Ionicons name="add" size={30} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF3F1',
  },
  header: {
    paddingTop: '15%',
    fontSize: 24,
    fontWeight: '600',
    marginVertical: 10,
    color: '#333',
    textAlign: 'center',
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  eventImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  eventInfo: {
    flex: 1,
    paddingLeft: 15,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  eventDistance: {
    fontSize: 14,
    color: '#777',
    marginVertical: 5,
  },
  eventDate: {
    fontSize: 12,
    color: '#777',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#CA3550',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
});
export default CreateEvents;
