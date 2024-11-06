import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

const GOOGLE_PLACES_API_KEY = 'AIzaSyD9kcy5IS19w8ZmgKlsi5Hgh66w28PSG0s';

const AddressAutocomplete = ({ onSelect }) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const fetchSuggestions = async (text) => {
    try {
      const response = await axios.get(
        'https://maps.googleapis.com/maps/api/place/autocomplete/json',
        {
          params: {
            input: text,
            key: GOOGLE_PLACES_API_KEY,
            components: 'country:SG', // Restrict results to Singapore
          },
        }
      );
      setSuggestions(response.data.predictions);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (text) => {
    setInput(text);
    if (text.length > 2) {
      fetchSuggestions(text);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = async (address, place_id) => {
    setInput(address);
    setSuggestions([]);
    try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/details/json`,
          {
            params: {
              place_id,
              key: GOOGLE_PLACES_API_KEY,
            },
          }
        );
        const location = response.data.result.geometry.location;
        setSelectedLocation({
          latitude: location.lat,
          longitude: location.lng,
        });
        if (onSelect) {
          onSelect(address, location); // Pass address and coordinates
        }
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <View>
      <TextInput
        placeholder="Enter address"
        value={input}
        onChangeText={handleInputChange}
        style={{ padding: 8, borderColor: 'black', borderWidth: 1, borderRadius: 20, height: 40,
    }}
      />
      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.place_id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelect(item.description)}>
            <Text style={{ padding: 8 }}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    {selectedLocation && (
        <MapView
          style={{ height: 200, marginTop: 10 }}
          region={{
            ...selectedLocation,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={selectedLocation} />
        </MapView>
      )}
    </View>
  );
};

export default AddressAutocomplete;