import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import CommentComponent from './post/CommentComponent';

const ListOfComments = ({ commentDetailsList }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        if (Array.isArray(commentDetailsList)) {
          setComments(commentDetailsList);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [commentDetailsList]);


  const renderItem = ({ item }) => {
    if (!item) return null;

    return <CommentComponent commentDetails={item} />;
  };

  const keyExtractor = (item) => {
    return item && item.commentID ? item.commentID.toString() : Math.random().toString();
  };

  if (loading) {
    return <Text style={styles.loadingText}>Loading comments...</Text>;
  }

  if (error) {
    return <Text style={styles.errorText}>Error loading comments: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      {comments.length === 0 ? (
        <Text style={styles.emptyText}>No comments available</Text>
      ) : (
        <FlatList
          data={comments}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
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

export default ListOfComments;