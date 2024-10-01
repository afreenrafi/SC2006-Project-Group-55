import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

const PostIcon = ({ icon, size = 25, color = "#000" }) => {
    return (
        <FontAwesome name={icon} size={size} color={color} />
    );
};

export default PostIcon;
