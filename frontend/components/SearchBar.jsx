import React, { useState, useEffect } from 'react';
import { View, TextInput, Pressable, StyleSheet, Keyboard } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const itemList = ['Plastic Bottle', 'Plastic bag', 'Plastic', 'Metal Cans', 'Metal Bottle', 'Metal Bag', 'Glass Bottle', 'T-Shirts'];

const getRandomItem = () => itemList[Math.floor(Math.random() * itemList.length)];

const SearchBar = ({ navigation, onSearchPress, handleUploadedImage }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [placeholder, setPlaceholder] = useState('');

  let initial = getRandomItem();

  useEffect(() => {
    setPlaceholder(initial);
  }, []);



  const handleSearchChange = (text) => {
    setSearchQuery(text);
  };

  const handlePress = () => {
    if (searchQuery === '') {
      onSearchPress(initial);
    } else {
      onSearchPress(searchQuery);
    }

    Keyboard.dismiss();
    setSearchQuery(getRandomItem());
  };

  return (
    <View style={styles.searchCont}>
      <View style={styles.searchText}>
        <TextInput
          style={styles.searchBar}
          placeholder={placeholder}
          placeholderTextColor="#FFF"
          value={searchQuery}
          onChangeText={handleSearchChange}
        />
        <Pressable style={styles.searchBtn} onPress={handlePress}>
          <FontAwesome name="search" size={20} color="#fff" />
        </Pressable>
      </View>
      <View style={styles.searchCamera}>
        <Pressable style={styles.cameraBtn} onPress={() => navigation.navigate('utils/ImagePickerComponent', { handleUploadedImage })}>
          <FontAwesome name="camera" size={20} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchCont: {
    position: 'absolute',
    zIndex: 11,
    top: 90,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    width: '100%',
    paddingHorizontal: 30,
    marginTop: 20,
  },
  searchText: {
    width: '100%',
    position: 'relative',
  },
  searchBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    padding: 10,
    borderRadius: 4,
    color: '#fff',
  },
  searchBtn: {
    position: 'absolute',
    right: 0,
    padding: 6,
  },
  cameraBtn: {
    padding: 6,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchBar;
