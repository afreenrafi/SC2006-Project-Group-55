import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GOOGLE_PLACES_API_KEY = 'AIzaSyD9kcy5IS19w8ZmgKlsi5Hgh66w28PSG0s'; // Replace with your API key

const EventLocation = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const mapRef = useRef(null);

  const handleLocationSelect = (data, details = null) => {
    if (details && details.geometry) {
        const { lat, lng } = details.geometry.location;
        const coordinates = {
            latitude: lat,
            longitude: lng,
        };
        setSelectedLocation({
            ...coordinates,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });
        mapRef.current.animateToRegion({
            ...coordinates,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });
        if (onLocationSelect) {
            onLocationSelect(data.description, coordinates);
        }
    } else {
        Alert.alert('Error', 'Could not retrieve location details');
    }
};
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Enter address"
        onPress={handleLocationSelect}
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: 'en',
          components: 'country:sg', // Restrict to Singapore
        }}
        fetchDetails={true} // Enables retrieving geometry (latitude/longitude) details
        styles={{
          textInput: styles.textInput,
          listView: styles.listView,
        }}
      />

      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 1.3521,
          longitude: 103.8198,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        region={selectedLocation}
      >
        {selectedLocation && (
          <Marker coordinate={selectedLocation} />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  map: {
    height: 300,
    marginTop: 10,
    borderRadius: 8,
  },
  listView: {
    backgroundColor: 'white',
  },
});

export default EventLocation;
