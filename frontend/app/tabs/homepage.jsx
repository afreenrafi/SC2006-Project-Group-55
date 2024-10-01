import React from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native';
import ListOfPosts from '../../components/ListOfPosts';
import SearchBar from '../../components/SearchBar'; 

const Homepage = ({ navigation }) => {
  console.log("homepage");

  const handleSearchPress = (searchQuery) => {
    if (searchQuery.trim()) {
      navigation.navigate('utils/SearchItem', { inputItem: searchQuery });
    } else {
      Alert.alert('Please enter a search query');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headCont}>
        <Image source={require('../../assets/ui/page-header.png')} style={styles.headBg} />
        <Image source={require('../../assets/logo/R3LEAF-icon.png')} style={styles.logo} />
        <SearchBar navigation={navigation} onSearchPress={handleSearchPress} />
      </View>
      <ListOfPosts place="homepage" userID="bob" />
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

export default Homepage;
