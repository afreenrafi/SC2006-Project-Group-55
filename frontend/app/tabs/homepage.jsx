import React, { useState, useContext, useEffect } from 'react';
import { View, Image, StyleSheet, FlatList, TouchableOpacity, Text, ScrollView, ActivityIndicator} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';
// import { mockUpcomingEvents, mockPopularEvents, mockNearbyEvents } from './mockData';
import { useNavigation } from '@react-navigation/native';
import { fetchEvents } from '../../apicalls/EventApi';
import StyledText from "../../components/forms/StyledText";


const filters = ['All', 'Museums', 'Exhibitions', 'Performances', 'Festivals']; // Filter categories

const Homepage = ({ route }) => {
  const navigation = useNavigation();

  const { username } = route.params;
  console.log("username is "+ username);

  const { savedEvents, toggleBookmark } = useContext(AppContext);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [currentUpcomingEventIndex, setCurrentUpcomingEventIndex] = useState(0); // To toggle between upcoming events

  const [loading, setLoading] = useState(true);            // State to manage loading status

  const [mockPopularEvents, setPageFreeEvents] = useState(null);
  const [mockNearbyEvents, setPagePaidEvents] = useState(null);
  const [mockUpcomingEvents, setUpcomingEvents] = useState(null);

  // Filter the events based on selected filter
  const filteredPopularEvents = selectedFilter === 'All' ? mockPopularEvents : mockPopularEvents.filter(event => event.eventGenre === selectedFilter);
  const filteredNearbyEvents = selectedFilter === 'All' ? mockNearbyEvents : mockNearbyEvents.filter(event => event.eventGenre === selectedFilter);

  // const allEvents = [
  //   ...mockUpcomingEvents,
  //   ...mockPopularEvents,
  //   ...mockNearbyEvents,
  // ];

  const getFreeEvents = async () => {
    try {
      const result = await fetchEvents({ eventType: "Free" });
      // console.log(result.events);
      return result.events;

    } catch (error) {
      console.error("Error fetching free event details:", error);
    }
  };
  const getPaidEvents = async () => {
    try {
      const result = await fetchEvents({ eventType: "Chargeable" });
      // console.log(result.events);
      return result.events;

    } catch (error) {
      console.error("Error fetching free event details:", error);
    }
  };

  const getHomepageData = async ()=> {
    try{
      const freeEvents = await getFreeEvents();
      setPageFreeEvents(freeEvents);
      const paidEvents = await getPaidEvents();
      setPagePaidEvents(paidEvents);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching homepage details:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getHomepageData();
  }, []);


  

  



  const toEventPage = async (eventId) => {
    navigation.navigate('events/EventsPage', { eventId: eventId })
  }

  const renderEventCard = ({ item }) => {
    // console.log("eventcard rendering"+item.eventId);
    const isBookmarked = savedEvents.some((e) => e.eventId === item.eventId);
    const dateString = item.eventStartDate;
    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }).format(date);


    return (
      <TouchableOpacity key={item.eventId} style={styles.eventCard} onPress={() => toEventPage(item.eventId)}>
        <Image source={{uri: item.eventPic}} style={styles.eventImage} />
        <Text style={styles.eventType}>{item.eventGenre}</Text>
        <View style={styles.eventDetailsContainer}>
          <Text style={styles.eventName}>{item.eventName}</Text>
          <Text style={styles.eventLocation}>{item.eventLocation}</Text>
          <Text style={styles.eventDate}>{formattedDate}</Text>
        </View>
        <TouchableOpacity onPress={() => toggleBookmark(item)} style={styles.bookmarkButton}>
          <FontAwesome name={isBookmarked ? "bookmark" : "bookmark-o"} size={20} color={isBookmarked ? "#EE1C43" : "#FFF"} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const handleDetailsPress = (event) => {
    navigation.navigate('TicketDetails', { event });
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#CA3550" />
        <StyledText size={20} textContent="Loading event details..." />
      </View>
    );
  }

  const renderUpcomingEvent = () => {
    const event = mockUpcomingEvents[currentUpcomingEventIndex];
    return (
      <View>
        {/* Upcoming Event Card */}
        <View style={styles.upcomingEventCard}>
          <Image source={event.image} style={styles.eventImage} />
          <Text style={styles.upcomingEventTitle}>{event.name}</Text>
          <Text style={styles.upcomingEventLocation}>{event.location}</Text>
          {/* Date Toggle Buttons */}
          <View style={styles.dateToggleContainer}>
            {mockUpcomingEvents.map((upEvent, index) => {
              const formattedDate = upEvent.date.split(' ').slice(0, 2).join(' '); // Extract day and month only
              return (
                <TouchableOpacity
                  key={upEvent.id}
                  onPress={() => setCurrentUpcomingEventIndex(index)}
                  style={[
                    styles.dateButton,
                    currentUpcomingEventIndex === index && styles.activeDateButton,
                  ]}
                >
                  <Text style={styles.dateButtonText}>{formattedDate}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
      </View>
  
          {/* Share and Details Buttons */}
          <View style={styles.eventActionsContainer}>
            <TouchableOpacity style={styles.shareButton}>
              <FontAwesome name="share" size={12} color="#EE1C43" />
              <Text style={styles.shareButtonText}> Share</Text> 
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => handleDetailsPress(event)} // Pass the exact event data
            >
              <FontAwesome name="info" size={12} color="#FFF" />
              <Text style={styles.detailsButtonText}> Details</Text> 
            </TouchableOpacity>
          </View>
        </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header with location and icons */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log("Menu icon pressed")}>
          <FontAwesome name="bars" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.location}>📍 Boon Lay, Jurong</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <FontAwesome name="bell" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <View style={styles.mainHeader}>
        <Text style={styles.mainTitle}>Community Connection</Text>
        <Text style={styles.mainSubtitle}>Enjoy Arts & Culture.</Text>
      </View>

      {/* Filter Buttons */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.filterContainer}
      >
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter}
          onPress={() => setSelectedFilter(filter)}
          style={[
            styles.filterButton, 
            selectedFilter === filter && styles.activeFilterButton,
          ]}
        >
          <Text style={selectedFilter === filter ? styles.activeFilterText : styles.inactiveFilterText}>
            {filter}
          </Text>
        </TouchableOpacity>
      ))}
</ScrollView>

      {/* Upcoming Events */}
       <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Upcoming Events</Text>
        {/* {renderUpcomingEvent()} */}
      </View>

      {/* Popular Events Section */}
      {console.log(filteredPopularEvents.length)}
      {filteredPopularEvents.length > 0 && 
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Free Events</Text>
        </View>
        <FlatList 
          horizontal
          data={filteredPopularEvents}
          renderItem={renderEventCard}
          keyExtractor={(item) => item.eventId}
          contentContainerStyle={styles.flatListContainer}
        />
      </View>
      }

      {/* Nearby Events Section */}
      {filteredNearbyEvents.length > 0 && 
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Paid Events</Text>
        </View>
        <FlatList 
          horizontal
          data={filteredNearbyEvents}
          renderItem={renderEventCard}
          keyExtractor={(item) => item.eventId}
          contentContainerStyle={styles.flatListContainer}
        />
      </View>
      }
    </ScrollView>
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
    backgroundColor: '#FBF3F1',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '6%',
    paddingBottom: '5%',
    paddingTop: '17%',
    backgroundColor: '#FBF3F1',
  },
  location: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  mainHeader: {
    paddingHorizontal: '5%',
    paddingBottom: 3,
  },
  mainTitle:{
    fontSize: 24,
    fontWeight: '700',
  },
  mainSubtitle:{
    fontSize: 14,
    color: '#666',
  },
  filterContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
    flexDirection: 'row',
    marginHorizontal: 5,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginRight: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#CA3550',
  },
  activeFilterButton: {
    backgroundColor: '#CA3550', 
    borderColor: '#CA3550',
  },
  activeFilterText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  inactiveFilterText: {
    color: '#CA3550', 
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 7,
    marginTop: 7,
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
    backgroundColor: '#CA3550',
    color: '#fff',
    padding: 5,
    fontSize: 12,
    fontWeight: 'bold',
  },
  eventDetailsContainer: {
    padding: 10,
  },
  eventName: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  eventDateLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventLocation: {
    marginLeft: 3,
    fontSize: 11,
    color: '#888',
  },
  eventDate: {
    padding: 5,
    fontSize: 10,
    color: '#888',
  },
  bookmarkButton: {
    position: 'absolute',
    bottom: 100,
    right: 10,
    backgroundColor: '#BBB',
    padding: 5,
    borderRadius: 5,
    fontSize: 12,
    fontWeight: 'bold',
  },
  upcomingEventCard: {
    width: '100%',
    height: 175,
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 10,
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
    paddingBottom: 5,
  },
  eventRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: '#FFFFFF',
    marginTop: -10,
  },
  dateToggleContainer: {
    flexDirection: 'row', 
    justifyContent: 'flex-start',
    left: -1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  dateButton: {
    backgroundColor: '#DDD',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginTop:3,
    marginRight: 3,
    borderWidth: 1,
    borderColor: '#EEE', // Similar color to blend
    borderTopWidth: 0, // Removing top border to "merge"
    
  },
  activeDateButton: {
    backgroundColor: '#FFFFFF',
  },
  dateButtonText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 10,
  },
  eventActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', 
    alignItems: 'center',
    marginTop: -5,
    paddingHorizontal: 10, // Ensure proper alignment with the card width
  },
  shareButton: {
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFF',
    borderColor: '#CA3550',
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 12, // Padding to adjust button size
    borderRadius: 20,
    marginRight: 10,
  },  
  shareButtonText: {
    color: '#CA3550',
    fontWeight: '600',
    fontSize: 12,
    marginLeft: 3,
  },
  detailsButton: {
    flexDirection: 'row', 
    alignItems: 'center',
    backgroundColor: '#CA3550',
    paddingVertical: 5,
    paddingHorizontal: 12, // Padding to adjust button size
    borderRadius: 20,
  },  
  detailsButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 12,
    marginLeft: 3,
  },
});

export default Homepage;