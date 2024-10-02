import React, { useState } from 'react';
import { View, Image, StyleSheet, FlatList, Alert, TouchableOpacity, Text, Pressable, ScrollView} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import SearchBar from '../../components/SearchBar'; 
import Icon from 'react-native-vector-icons/MaterialIcons'; 

// Temporary mock data for events
const mockUpcomingEvents = [
  { id: '1', name: 'Hello Future: Building a Wonderland', type: 'Exhibition', date: '01 Dec 2024', location: 'Singapore Arts Museum', image: require('../../assets/events/helloFuture.jpg') },
  { id: '2', name: 'Sea Chanty Project', type: 'Exhibition', date: '05 Dec 2024', location: 'Singapore Arts Museum', image: require('../../assets/events/seaChantyProject.jpg') },
];

const mockPopularEvents = [
  { id: '1', name: 'Singapore Night Festival', type: 'Festival', date: '10 Dec 2024', location: 'Singapore Night Festival', image: require('../../assets/events/SNF.png') },
  { id: '2', name: 'Hello Future: Building a Wonderland', type: 'Exhibition', date: '12 Dec 2024', location: 'Singapore Arts Museum', image: require('../../assets/events/helloFuture.jpg') },
];

const mockNearbyEvents = [
  { id: '1', name: 'Singapore Night Festival', type: 'Festival', date: '10 Dec 2024', location: 'Singapore Night Festival', image: require('../../assets/events/SNF.png') },
  { id: '2', name: 'Hello Future: Building a Wonderland', type: 'Exhibition', date: '01 Dec 2024', location: 'Singapore Arts Museum', image: require('../../assets/events/helloFuture.jpg') },
];

const filters = ['All', 'Museum', 'Exhibition', 'Performance', 'Festival']; // Filter categories

const Homepage = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [currentUpcomingEventIndex, setCurrentUpcomingEventIndex] = useState(0); // To toggle between upcoming events

  // Filter the events based on selected filter
  const filteredPopularEvents = selectedFilter === 'All' ? mockPopularEvents : mockPopularEvents.filter(event => event.type === selectedFilter);
  const filteredNearbyEvents = selectedFilter === 'All' ? mockNearbyEvents : mockNearbyEvents.filter(event => event.type === selectedFilter);

  const renderEventCard = ({ item }) => {
    return (
      <View style={styles.eventCard}>
        <Image source={item.image} style={styles.eventImage} />
        <Text style={styles.eventType}>{item.type}</Text>
        <View style={styles.eventDetailsContainer}>
          <Text style={styles.eventName}>{item.name}</Text>
          <View style={styles.eventDateLocation}>
            <Icon name="location-on" size={16} color="#888" />
            <Text style={styles.eventLocation}>{item.location}</Text>
          </View>
          <Text style={styles.eventDate}>{item.date}</Text>
        </View>
        <TouchableOpacity style={styles.bookmarkButton}>
          <FontAwesome name="bookmark-o" size={20} color="#888" />
        </TouchableOpacity>
      </View>
    );
  };

  const renderUpcomingEvent = () => {
    const event = mockUpcomingEvents[currentUpcomingEventIndex];
    return (
      <View>
        {/* Upcoming Event Card */}
        <View style={styles.upcomingEventCard}>
          <Image source={event.image} style={styles.eventImage} />
          <Text style={styles.upcomingEventTitle}>{event.name}</Text>
          <Text style={styles.upcomingEventLocation}>{event.location}</Text>
        </View>
  
        {/* Date and Action Buttons in One Row */}
        <View style={styles.eventRow}>
          {/* Date Toggle Buttons */}
          <View style={styles.dateToggleContainer}>
            {mockUpcomingEvents.map((upEvent, index) => (
              <TouchableOpacity
                key={upEvent.id}
                onPress={() => setCurrentUpcomingEventIndex(index)}
                style={[
                  styles.dateButton,
                  currentUpcomingEventIndex === index && styles.activeDateButton,
                ]}
              >
                <Text style={styles.dateButtonText}>{upEvent.date}</Text>
              </TouchableOpacity>
            ))}
          </View>
  
          {/* Share and Details Buttons */}
          <View style={styles.eventActionsContainer}>
            <TouchableOpacity style={styles.shareButton}>
              <Text style={styles.shareButtonText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  
  const handleSearchPress = (searchQuery) => {
    if (searchQuery.trim()) {
      navigation.navigate('utils/SearchItem', { inputItem: searchQuery });
    } else {
      Alert.alert('Please enter a search query');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header with location and icons */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.openDrawer()}>
          <FontAwesome name="bars" size={24} color="black" />
        </Pressable>
        <Text style={styles.location}>📍 Boon Lay, Jurong</Text>
        <Pressable onPress={() => navigation.navigate('Notifications')}>
          <FontAwesome name="bell" size={24} color="black" />
        </Pressable>
      </View>

      {/* Filter Buttons */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContainer}>
        {filters.map(filter => (
          <TouchableOpacity key={filter} onPress={() => setSelectedFilter(filter)}>
            <Text style={[styles.filterButton, selectedFilter === filter && styles.activeFilterButton]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>


      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <SearchBar onSearchPress={handleSearchPress} />
      </View>

       {/* Upcoming Events */}
       <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Upcoming Events</Text>
        {renderUpcomingEvent()}
      </View>

      {/* Popular Events Section */}
      <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Most Popular</Text>
          </View>
          <FlatList 
            horizontal
            data={filteredPopularEvents}
            renderItem={renderEventCard}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.flatListContainer}
          />
        </View>

      {/* Nearby Events Section */}
      <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearby</Text>
          </View>
          <FlatList 
            horizontal
            data={filteredNearbyEvents}
            renderItem={renderEventCard}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.flatListContainer}
          />
        </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF3F1',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingBottom: '5%',
    paddingTop: '15%',
    backgroundColor: '#FBF3F1',
  },
  location: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5D7971',
  },
  filterContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FF93B3',
    color: '#EE1C43',
    fontWeight: '500',
    backgroundColor: 'transparent',
  },
  activeFilterButton: {
    backgroundColor: '#EE1C43',
    color: '#FFFFFF',
  },
  searchBarContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  section: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  flatListContainer: {
    paddingVertical: 5,
  },
  eventCard: {
    width: 200,
    height: 210,
    backgroundColor: '#fff',
    marginBottom: 10,
    marginRight: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  eventImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  eventType: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#EE1C43',
    color: '#fff',
    padding: 5,
    borderRadius: 10,
    fontSize: 12,
    fontWeight: 'bold',
  },
  eventDetailsContainer: {
    padding: 10,
  },
  eventName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventDateLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventLocation: {
    marginLeft: 5,
    fontSize: 12,
    color: '#888',
  },
  eventDate: {
    padding: 5,
    fontSize: 10,
    color: '#888',
  },
  bookmarkButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  upcomingEventCard: {
    width: '100%',
    height: 175,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  upcomingEventImage: {
    width: '100%',
    height: 130,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  upcomingEventTitle: {
    fontSize: 16,
    fontWeight: '600',
    padding: 10,
    paddingBottom: 3,
  },
  upcomingEventLocation: {
    fontSize: 12,
    color: '#AAA',
    paddingLeft: 10,
  },
  eventRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 10, 
  },
  dateToggleContainer: {
    flexDirection: 'row', 
  },
  dateButton: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 5,
    borderRadius: 5,
  },
  activeDateButton: {
    backgroundColor: '#FF93B3',
  },
  dateButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 10,
  },
  eventActionsContainer: {
    flexDirection: 'row',
  },
  shareButton: {
    backgroundColor: '#FF93B3',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  shareButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 12,
  },
  detailsButton: {
    backgroundColor: '#EE1C43',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  detailsButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 12,

  },
});

export default Homepage;