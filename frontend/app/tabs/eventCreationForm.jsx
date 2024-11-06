import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, Button, ScrollView, View, TouchableOpacity } from 'react-native';
import StyledInput from '../../components/forms/StyledInput';
import SelectModal from '../../components/forms/SelectModal';
import SelectInput from '../../components/forms/SelectInput';
import GenreSelectModal from '../../components/GenreSelectModal';
import EventLocation from '../../components/forms/EventLocation';
import RoundBtn from '../../components/forms/RoundBtn';
import PageHeader from '../../components/events/PageHeader';
import { useNavigation } from '@react-navigation/native';

const EventCreationForm = () => {
    const navigation = useNavigation();

    const [genreModalVisible, setGenreModalVisible] = useState(false);
    const [typeModalVisible, setTypeModalVisible] = useState(false);

    const [eventDetails, setEventDetails] = useState({
        eventName: "",
        eventDescription: "",
        eventGenre: "",
        eventLocation: {
            address: "",
            coordinates: null,
        },
        eventType: "", // Free or Chargeable
        eventStartDate: "", // Format: YYYY-MM-DD
        eventEndDate: "",   // Format: YYYY-MM-DD
        eventOpen: "",      // Format: HH:MM
        eventClose: "",     // Format: HH:MM
        eventArtist: [""],
        // userId: ""
    });

    const handleChange = (name, value) => {
        setEventDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLocationUpdate = (address, coordinates) => {
        setEventDetails(prevState => ({
            ...prevState,
            eventLocation: {
                address,
                coordinates,
            },
        }));
    };
      

    const handleArtistChange = (index, value) => {
        const newArtists = [...eventDetails.eventArtist];
        newArtists[index] = value;
        setEventDetails(prevState => ({
            ...prevState,
            eventArtist: newArtists
        }));
    };

    const addArtistField = () => {
        setEventDetails(prevState => ({
            ...prevState,
            eventArtist: [...prevState.eventArtist, ""]
        }));
    };

    const handleSubmit = () => {
        console.log(eventDetails);
        navigation.navigate('CreateEvents'); 
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <PageHeader title="Event Details" onPress={() => navigation.goBack()} />

            <Text style={styles.sectionHeader}>Basic Information</Text>

            <StyledInput
                label="Event Name"
                data={eventDetails.eventName}
                onChangeText={(text) => handleChange("eventName", text)}
            />

            <StyledInput
                label="Event Description"
                data={eventDetails.eventDescription}
                multiline
                onChangeText={(text) => handleChange("eventDescription", text)}
                style={styles.textArea}
            />

            <SelectInput
                label="Event Genre"
                data={eventDetails.eventGenre || "Select Genre"}
                onPress={() => setGenreModalVisible(true)}
                modalVisible={genreModalVisible}
                onRequestClose={() => setGenreModalVisible(false)}
                options={["Museum", "Exhibition", "Performance", "Festival"]}
                onSelectOption={(option) => handleChange("eventGenre", option)}
            />
            <GenreSelectModal
                modalTitle="Select Genre"
                modalVisible={genreModalVisible}
                onRequestClose={() => setGenreModalVisible(false)}
                oneOptPress={() => { handleChange("eventGenre", "Museum"); setGenreModalVisible(false); }}
                twoOptPress={() => { handleChange("eventGenre", "Exhibition"); setGenreModalVisible(false); }}
                threeOptPress={() => { handleChange("eventGenre", "Performance"); setGenreModalVisible(false); }}
                fourOptPress={() => { handleChange("eventGenre", "Festival"); setGenreModalVisible(false); }}
                optOne="Museum"
                optTwo="Exhibition"
                optThree="Performance"
                optFour="Festival"
            />

            <Text style={styles.text}>Location</Text>        
            {/* <Text style={styles.selectedLocation}>
                Selected Location: {eventDetails.eventLocation.address}
            </Text> */}
            <EventLocation onLocationSelect={handleLocationUpdate} />

            <SelectInput
                label="Event Type"
                data={eventDetails.eventType || "Select Type"}
                onPress={() => setTypeModalVisible(true)}
                modalVisible={typeModalVisible}
                onRequestClose={() => setTypeModalVisible(false)}
                options={["Free", "Chargeable"]}
                onSelectOption={(option) => handleChange("eventType", option)}
            />
            
            <SelectModal
                modalTitle="Select Event Type"
                modalVisible={typeModalVisible}
                onRequestClose={() => setTypeModalVisible(false)}
                oneOptPress={() => { handleChange("eventType", "Free"); setTypeModalVisible(false); }}
                twoOptPress={() => { handleChange("eventType", "Chargeable"); setTypeModalVisible(false); }}
                optOne="Free"
                optTwo="Chargeable"
            />

            <Text style={styles.sectionHeader}>Event Schedule</Text>

            <StyledInput
                label="Start Date (YYYY-MM-DD)"
                data={eventDetails.eventStartDate}
                onChangeText={(text) => handleChange("eventStartDate", text)}
            />

            <StyledInput
                label="End Date (YYYY-MM-DD)"
                data={eventDetails.eventEndDate}
                onChangeText={(text) => handleChange("eventEndDate", text)}
            />

            <StyledInput
                label="Open Time (HH:MM)"
                data={eventDetails.eventOpen}
                onChangeText={(text) => handleChange("eventOpen", text)}
            />

            <StyledInput
                label="Close Time (HH:MM)"
                data={eventDetails.eventClose}
                onChangeText={(text) => handleChange("eventClose", text)}
            />

            <Text style={styles.sectionHeader}>Artists</Text>

            {eventDetails.eventArtist.map((artist, index) => (
                <StyledInput
                    key={index}
                    label={`Artist ${index + 1} ID`}
                    data={artist}
                    onChangeText={(text) => handleArtistChange(index, text)}
                />
            ))}
            <TouchableOpacity style={styles.addButton} onPress={addArtistField}>
                <Text style={styles.addButtonText}>Add Another Artist</Text>
            </TouchableOpacity>

            {/* <Text style={styles.sectionHeader}>Organizer</Text>
            <StyledInput
                label="Organizer User ID"
                data={eventDetails.userId}
                onChangeText={(text) => handleChange("userId", text)}
            /> */}

            <View style={styles.btnContainer}>
                <RoundBtn onPress={handleSubmit} text="Create Event" icon="arrow-circle-right" />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#FBF3F1',
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#CA3550',
        marginTop: 20,
        marginBottom: 10,
    },
    selectedLocation: {
        marginTop: 10,
        fontSize: 16,
        color: '#555',
      },
    input: {
        borderWidth: 1,
        borderColor: '#CCC',
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginBottom: 15,
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top', // for multiline input
    },
    buttonToggle: {
        borderWidth: 1,
        borderColor: '#CCC',
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#FFF',
        alignItems: 'center',
        marginBottom: 15,
    },
    buttonToggleText: {
        color: '#333',
    },
    addButton: {
        backgroundColor: '#CA3550',
        paddingVertical: 15,
        borderRadius: 50,
        alignItems: 'center',
        marginBottom: 15,
        marginTop: 10,
        width: "50%",
        alignSelf: 'center',
    },
    addButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    submitButton: {
        backgroundColor: '#CA3550',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    submitButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    text: {
        fontSize: 26,
        marginBottom: 5
    },
});
export default EventCreationForm;