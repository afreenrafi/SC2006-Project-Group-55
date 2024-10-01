import React, { useRef, useState, useEffect } from 'react';
import { ResizeMode, Video } from 'expo-av';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';

const VideoComponent = ({ videoUrl, isVisible }) => {
  const [play, setPlay] = useState(false);
  const videoRef = useRef(null);

  const handlePress = async () => {
    console.log('Video pressed!');
    const shouldPlay = !play;
    setPlay(shouldPlay);

    if (shouldPlay) {
      await videoRef.current.playAsync();
    } else {
      await videoRef.current.pauseAsync();
    }
  };

  useEffect(() => {
    if (!isVisible) {
      setPlay(false);
      videoRef.current.pauseAsync();
    }
  }, [isVisible]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.overlay}>
        <Video
          ref={videoRef}
          source={{ uri: videoUrl }}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay={play}
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
          style={styles.video}
        />
        {!play && (
          <View style={styles.playButtonContainer}>
            <Image
              source={{ uri: '../../assets/icons/play.png' }} // Replace with your play icon URI
              style={styles.playIcon}
            />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: 300,
    // height: 200,
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  playButtonContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Slightly darken the overlay
  },
  playIcon: {
    width: 50,
    height: 50,
  },
});

export default VideoComponent;
