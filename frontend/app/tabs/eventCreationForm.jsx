import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, Button, ScrollView, View, TouchableOpacity } from 'react-native';
import StyledInput from '../../components/forms/StyledInput';
import SelectModal from '../../components/forms/SelectModal';
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
        eventLocation: "",
        eventType: "", // Free or Chargeable
        eventStartDate: "", // Format: YYYY-MM-DD
        eventEndDate: "",   // Format: YYYY-MM-DD
        eventOpen: "",      // Format: HH:MM
        eventClose: "",     // Format: HH:MM
        eventArtist: [""],
        userId: ""
    });

    const handleChange = (name, value) => {
        setEventDetails(prevState => ({
            ...prevState,
            [name]: value
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

            <StyledInput
                label="Event Genre"
                data={eventDetails.eventGenre || "Select Genre"}
                onPress={() => setGenreModalVisible(true)}
            />
            <SelectModal
                modalTitle="Select Genre"
                modalVisible={genreModalVisible}
                onRequestClose={() => setGenreModalVisible(false)}
                oneOptPress={() => { handleChange("eventGenre", "Museum"); setGenreModalVisible(false); }}
                twoOptPress={() => { handleChange("eventGenre", "Exhibition"); setGenreModalVisible(false); }}
                optOne="Museum"
                optTwo="Exhibition"
            />

            <StyledInput
                label="Event Location"
                data={eventDetails.eventLocation}
                onChangeText={(text) => handleChange("eventLocation", text)}
            />

            <StyledInput
                label="Event Type"
                data={eventDetails.eventType || "Select Type"}
                onPress={() => setTypeModalVisible(true)}
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

            <Text style={styles.sectionHeader}>Organizer</Text>

            <StyledInput
                label="Organizer User ID"
                data={eventDetails.userId}
                onChangeText={(text) => handleChange("userId", text)}
            />

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
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 15,
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
});
export default EventCreationForm;