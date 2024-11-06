import { View, Text, Image, StyleSheet } from "react-native";
import { React } from "react";
import ListOfPosts from '../../components/ListOfPosts';
import SearchBar from '../../components/SearchBar'; 


const SharingPlace = ({ navigation }) => {
  console.log("SharingPlace");


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
        <Image source={require('../../assets/ui/page-header.png')} style={styles.headBg}/>
        <Text style={styles.title}>Sharing Place</Text>
        <SearchBar navigation={navigation} onSearchPress={handleSearchPress} />
      </View>
      <ListOfPosts place="sharing" userID={'bob'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
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
  headCont:{
    position: 'relative',
    top: 0,
    zIndex: 10,
    height: 130,
    width: '100%',
  },
  headBg:{
    zIndex: 10,
    height: 180,
    width: '100%',
  },
  searchCont:{
    position: 'absolute',
    zIndex: 11,
    top: 90,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  searchText:{
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
  }
});

export default SharingPlace;