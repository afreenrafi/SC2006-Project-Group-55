import { View, Text, Image, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import ListOfPosts from '../../components/ListOfPosts';
import SearchBar from '../../components/SearchBar'; // Adjust the path if necessary
import Tabs from '../tabs/_layout';
import { FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// import Map from '../../components/Map';

const SearchItem = ({ route }) => {
  const [inputItem, setInputItem] = useState(route.params.inputItem);
  const navigation = useNavigation();

  const handleSearchPress = (searchQuery) => {
    setInputItem(searchQuery);
  };

  useEffect(() => {
    // Any side effects or data fetching can be handled here if needed
  }, [inputItem]);

  return (
    <View style={styles.container}>
      <View style={styles.headCont}>
        <Image source={require('../../assets/ui/page-header.png')} style={styles.headBg} />
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <FontAwesome6 name="arrow-left" size={23} color="#fff"/>
        </Pressable>
        <Text style={styles.title}>{inputItem}</Text>
        <SearchBar navigation={navigation} onSearchPress={handleSearchPress} />
      </View>
      {/* <Map/> */}
      <ListOfPosts place="search" userID="bob" productName={inputItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  headCont: {
    position: 'relative',
    top: 0,
    zIndex: 10,
    height: 130,
    width: '100%',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 50,
    zIndex: 11,
    width: '100%',
    textAlign: 'center',
    color: "#fff",
  },
  backBtn:{
    position: 'absolute',
    top: 65,
    left: 30,
    zIndex: 12,
  },
  headBg: {
    zIndex: 10,
    height: 180,
    width: '100%',
  },
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#EAF2EC',
  },
  logo: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 40,
    left: 80,
    right: 80,
    zIndex: 11,
    height: 80,
    width: '60%',
    resizeMode: 'contain',
  },
});

export default SearchItem;
