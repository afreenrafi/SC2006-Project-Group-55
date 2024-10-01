import React from 'react';
import { FontAwesome6 } from '@expo/vector-icons'; // Adjusted to correct FontAwesome import
import { Text, View, StyleSheet } from 'react-native';

const CommentIcon = ({ size = 25, color= "#5D7971", oriCount = 0, iconType="comment-alt", justifyContent }) => {
    return (
        <View style={[styles.container, { justifyContent: justifyContent }]}>
            <FontAwesome6 name={iconType} size={size} color={color}/>
            <Text style={[styles.text, { fontSize: size, color: color }]}>
                {oriCount}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        marginLeft: 5,
    },
});

export default CommentIcon;
