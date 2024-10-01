import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import PostIcon from './PostIcon';

const PostBtn = ({ size = 25, color = "#5D7971", oriCount = 0, liked = false, onClick, iconType, justifyContent }) => {
    const [isLiked, setIsLiked] = useState(liked);
    const [count, setCount] = useState(oriCount);

    const toggleLike = () => {
        onClick(); 
        setIsLiked(prevIsLiked => {
            const newIsLiked = !prevIsLiked;
            setCount(prevCount => newIsLiked ? prevCount + 1 : prevCount - 1);
            return newIsLiked;
        });
    };

    const icon = isLiked ? iconType : `${iconType}-o`;

    return (
        <View style={[styles.container, { justifyContent: justifyContent }]}>
            <TouchableOpacity onPress={toggleLike}>
                <PostIcon icon={icon} size={size} color={color} />
            </TouchableOpacity>
            <Text style={[styles.text, { fontSize: size, color: color }]}>
                {count}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    text: {
        marginLeft: 5,
    },
});

export default PostBtn;
