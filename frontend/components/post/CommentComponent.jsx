import React from 'react';
import { StyleSheet, View, Image, Text, Dimensions } from "react-native";

const CommentComponent = ({ commentDetails }) => {

    const authorPic = commentDetails.authorPic;
    const authorName = commentDetails.authorName;
    const commentText = commentDetails.commentText;
    const commentDate = commentDetails.commentDate;

    return (
        <View style={styles.card}>
            <View style={styles.cardAuthor}>
                <Image source={{ uri: authorPic }} style={styles.image}/>
            </View>
            <View style={styles.cardContent}>
                <Text style={[styles.username, {color: '#fff'}]}>{authorName}</Text>
                <Text style={styles.caption}>{commentText}</Text>
            </View>
            <View style={styles.cardDate}>
                <Text style={styles.attr}>{commentDate}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        // width: Dimensions.get('window').width - 60,
        width: '100%',
        // height: 100, // Adjusted height for better layout
        gap: 15,
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 30,
    }, 
    username: {
        fontSize: 17,
        fontWeight: '600',
    },
    image: {
        width: 50,
        height: 50, 
        resizeMode: 'cover',
        borderRadius: 25, // Adjusted to be half of the width/height for perfect circle
        overflow: 'hidden',
    },
    caption:{
        fontSize: 15, // Adjusted font size for better layout
        color: "#fff",
    },
    attr: {
        fontSize: 12, // Adjusted font size for better layout
        color: "#fff",
    },
    cardAuthor: {
        flex: 1,
    },
    cardContent: {
        flex: 4,
    },
    cardDate: {
        flex: 1,
    }

});

export default CommentComponent;
