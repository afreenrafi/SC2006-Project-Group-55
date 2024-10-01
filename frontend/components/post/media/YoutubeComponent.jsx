import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const YouTubeComponent = ({ videoId }) => {
  const videoUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <View style={styles.container}>
      <WebView
        style={styles.webview}
        javaScriptEnabled={true}
        source={{ uri: videoUrl }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  webview: {
    width: Dimensions.get('window').width - 20, // Adjust width as needed
    height: (Dimensions.get('window').width - 20) * 0.5625, // 16:9 aspect ratio
  },
});

export default YouTubeComponent;
