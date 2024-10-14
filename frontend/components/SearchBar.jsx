import React, { useState, useEffect } from 'react';
import { View, TextInput, Pressable, StyleSheet, Keyboard } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const getRandomItem = () => "Search for events"; // Simplified placeholder

const SearchBar = ({ onSearchPress }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [placeholder, setPlaceholder] = useState('');

  useEffect(() => {
    setPlaceholder(getRandomItem());
  }, []);

  const handleSearchChange = (text) => {
    setSearchQuery(text);
  };

  const handlePress = () => {
    if (searchQuery === '') {
      onSearchPress(placeholder); // Search with placeholder if input is empty
    } else {
      onSearchPress(searchQuery);
    }

    Keyboard.dismiss();
    setSearchQuery(''); // Clear search input after submission
  };

  return (
    <View style={styles.searchCont}>
      <View style={styles.searchText}>
        <TextInput
          style={styles.searchBar}
          placeholder={placeholder}
          placeholderTextColor="#000"
          value={searchQuery}
          onChangeText={handleSearchChange}
        />
        <Pressable style={styles.searchBtn} onPress={handlePress}>
          <FontAwesome name="search" size={20} color="#DDD" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchCont: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 3,
    marginTop: 20,
  },
  searchText: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#DDD',
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
  },
  searchBar: {
    flex: 1,
    padding: 10,
    color: '#000',
  },
  searchBtn: {
    padding: 6,
  },
});

export default SearchBar;
