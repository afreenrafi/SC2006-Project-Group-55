import React, { useState } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CommentIcon from './actions/CommentIcon';
import PostBtn from './actions/PostBtn';
import { IconType } from './actions/iconTypes';
import VideoComponent from './media/VideoComponent';
import ListOfImage from './media/ListOfImage';
import YouTubeComponent from './media/YoutubeComponent'; 
import { handleSave, handleLike } from '../../apicalls/post';

const UserPost = ({ postDetails, userID, isVisible, darkMode = false }) => {
  const [heartCount, setHeartCount] = useState(postDetails.heartCount);
  const [commentCount, setCommentCount] = useState(postDetails.commentCount);
  const [bookmarkCount, setBookmarkCount] = useState(postDetails.bookmarkCount);
  const [heartLiked, setHeartLiked] = useState(postDetails.heartLiked);
  const [bookmarkLiked, setBookmarkLiked] = useState(postDetails.bookmarkLiked);

  const imageUrl = postDetails.imageUrl;
  const videoUrl = postDetails.videoUrl;
  const youtubeID = postDetails.youtubeID;
  const authorName = postDetails.authorName;
  const authorPic = postDetails.authorPic;
  const postCaption = postDetails.postCaption;

  const handleClickLikeIcon = () => {
    setHeartLiked(!heartLiked);
    setHeartCount(heartLiked ? heartCount - 1 : heartCount + 1);
    handleLike(postDetails.postID, userID);
  };

  const handleClickSavedIcon = () => {
    setBookmarkLiked(!bookmarkLiked);
    setBookmarkCount(bookmarkLiked ? bookmarkCount - 1 : bookmarkCount + 1);
    handleSave(postDetails.postID, userID);
  };

  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <Image source={{ uri: authorPic }} style={styles.imagePic} />
        <Text style={[styles.username, { color: darkMode ? 'white' : '#5D7971' }]}>{authorName}</Text>
      </View>
      <Text style={[styles.caption, { color: darkMode ? 'white' : '#5D7971' }]}>{postCaption}</Text>
      <View style={styles.media}>
        <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={[styles.overlay, {display: darkMode ? 'none' : 'block' }]} />
        <View style={styles.attribute}>
          {imageUrl && <CommentIcon size={20} color="white" oriCount={imageUrl.length} iconType="image" />}
        </View>
        {imageUrl && <ListOfImage imageUrls={imageUrl} />}
        {videoUrl && <VideoComponent videoUrl={videoUrl} isVisible={isVisible} />}
        {youtubeID && <YouTubeComponent videoId={youtubeID} />}
      </View>
      <View style={styles.actions}>
        <PostBtn
          oriCount={heartCount}
          liked={heartLiked}
          onClick={handleClickLikeIcon}
          iconType={IconType.HEART}
          justifyContent="flex-start"
          color={ darkMode ? 'white' : '#5D7971' }
        />
        <CommentIcon oriCount={commentCount} iconType="comment" color={ darkMode ? 'white' : '#5D7971' }/>
        <PostBtn
          oriCount={bookmarkCount}
          liked={bookmarkLiked}
          onClick={handleClickSavedIcon}
          iconType={IconType.BOOKMARK}
          justifyContent="flex-end"
          color={ darkMode ? 'white' : '#5D7971' }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  card: {
    flexDirection: 'column',
    width: '100%',
    //height: '100%', 
    // paddingVertical: 30, 
    gap: 10,
    padding: 30,
  },
  imagePic: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
    borderRadius: 20,
    overflow: 'hidden',
  },
  username: {
    fontSize: 25,
    fontWeight: 'normal',
  },
  media: {
    backgroundColor: '#5D7971',
    // padding: 10,
    position: 'relative',
    width: '100%',
    height: 300,
    borderRadius: 15,
    overflow: 'hidden'
  },
  overlay: {
    width: '100%',
    height: 300,
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    borderRadius: 15,
    pointerEvents: 'none'
  },
  attribute: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 2,
  },
  caption: {
    fontSize: 17,
    // color: '#5D7971',
  },
});

export default UserPost;
