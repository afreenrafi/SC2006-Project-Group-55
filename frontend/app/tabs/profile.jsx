import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import ListOfPosts from '../../components/ListOfPosts';

const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headCont}>
        <Image source={require('../../assets/ui/page-header.png')} style={styles.headBg}/>
        <Text style={styles.title}>@username</Text>
        <View style={styles.picCont}>
          <Image 
          source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgQzVcNqn6PnmZvTMThsrrvW_gWVfnVA7FIQ&s"}}
          style={styles.profilePic}
          />
        </View>
      </View>
      <ListOfPosts place="profile" userID={'bob'} />
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
  picCont:{
    zIndex: 11,
    position: 'absolute',
    top: 100,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  
    // height: 50,
  },
  profilePic:{
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 5,
    borderColor: '#5D7971',
    borderStyle: 'solid',
    padding: 10,
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
});

export default Profile;