import React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';

const CollageComponent = ({ images = [
    "https://ezop.com/wp-content/uploads/2021/04/dos-donts-of-recycling-wisconsin-750x510.jpg",
    "https://ezop.com/wp-content/uploads/2021/04/dos-donts-of-recycling-wisconsin-750x510.jpg",
    "https://ezop.com/wp-content/uploads/2021/04/dos-donts-of-recycling-wisconsin-750x510.jpg",
 ] }) => {
  const renderImages = () => {
    const numImages = images.length;
    const width = Dimensions.get('window').width;

    if (numImages === 1) {
      return (
        <Image source={{ uri: images[0] }} style={[styles.image, { width, height: width }]} />
      );
    } else if (numImages === 2) {
      return (
        <View style={styles.row}>
          {images.map((img, index) => (
            <Image key={index} source={{ uri: img }} style={[styles.image, { width: width / 2, height: width / 2 }]} />
          ))}
        </View>
      );
    } else if (numImages === 3) {
      return (
        <View>
          <Image source={{ uri: images[0] }} style={[styles.image, { width, height: width / 2 }]} />
          <View style={styles.row}>
            {images.slice(1, 3).map((img, index) => (
              <Image key={index} source={{ uri: img }} style={[styles.image, { width: width / 2, height: width / 2 }]} />
            ))}
          </View>
        </View>
      );
    } else if (numImages === 4) {
      return (
        <View style={styles.row}>
          {images.slice(0, 4).map((img, index) => (
            <Image key={index} source={{ uri: img }} style={[styles.image, { width: width / 2, height: width / 2 }]} />
          ))}
        </View>
      );
    } else if (numImages === 5) {
      return (
        <View>
          <View style={styles.row}>
            {images.slice(0, 2).map((img, index) => (
              <Image key={index} source={{ uri: img }} style={[styles.image, { width: width / 2, height: width / 2 }]} />
            ))}
          </View>
          <View style={styles.row}>
            {images.slice(2, 5).map((img, index) => (
              <Image key={index} source={{ uri: img }} style={[styles.image, { width: width / 3, height: width / 3 }]} />
            ))}
          </View>
        </View>
      );
    } else {
      return (
        <View>
          <View style={styles.row}>
            {images.slice(0, 3).map((img, index) => (
              <Image key={index} source={{ uri: img }} style={[styles.image, { width: width / 3, height: width / 3 }]} />
            ))}
          </View>
          <View style={styles.row}>
            {images.slice(3).map((img, index) => (
              <Image key={index} source={{ uri: img }} style={[styles.image, { width: width / 3, height: width / 3 }]} />
            ))}
          </View>
        </View>
      );
    }
  };

  return <View style={styles.container}>{renderImages()}</View>;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  image: {
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default CollageComponent;