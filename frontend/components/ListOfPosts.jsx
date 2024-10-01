import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import UserPost from './post/UserPost';
import { handleListOfPost } from '../apicalls/post';
import { useNavigation } from '@react-navigation/native';

const ListOfPosts = ({ place, userID, productName = 'null'}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleItems, setVisibleItems] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postDetailsList = await handleListOfPost(place, userID, productName);
        if (Array.isArray(postDetailsList)) {
          setPosts(postDetailsList);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [place, userID]);

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    setVisibleItems(viewableItems.map(item => item.key));
  }, []);

  const handlePostPress = (postDetails) => {
    navigation.navigate('utils/PostWithComments', { postDetails, userID });
  };

  const renderItem = ({ item }) => {
    if (!item) return null;

    return (
      <TouchableOpacity onPress={() => handlePostPress(item)} style={styles.card}>
        <UserPost
          postDetails={item}
          userID={userID}
          isVisible={visibleItems.includes(item.postID?.toString())}
        />
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item) => {
    return item && item.postID ? item.postID.toString() : Math.random().toString();
  };

  if (loading) {
    return <Text style={styles.loadingText}>Loading posts...</Text>;
  }

  if (error) {
    return <Text style={styles.errorText}>Error fetching posts: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      {posts.length === 0 ? (
        <Text style={styles.emptyText}>No posts available</Text>
      ) : (
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: "#EAF2EC",
    paddingBottom: 120,
    paddingTop: 30,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#555',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#555',
  },
  errorText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: 'red',
  },
});
export default ListOfPosts;
