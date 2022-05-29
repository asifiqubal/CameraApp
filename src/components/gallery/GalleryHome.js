import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import GalleryFooter from './GalleryFooter';
import GalleryHeader from './GalleryHeader';

const {width, height} = Dimensions.get('window');
const GalleryHome = ({navigation}) => {
  console.log(width, height);
  return (
    <View style={styles.container}>
      <GalleryHeader navigation={navigation} />
      <View style={styles.imageContainer}>
        <View style={styles.imageItem}></View>
        <View style={styles.imageItem}></View>
        <View style={styles.imageItem}></View>
        <View style={styles.imageItem}></View>
      </View>
      <GalleryFooter />
    </View>
  );
};

export default GalleryHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    backgroundColor: 'red',
    flex: 1,
    marginVertical: 8,
    marginHorizontal: 12,
    padding: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  imageItem: {
    width: width / 2 - 24,
    height: height / 2 - 86,
    backgroundColor: '#fff',
    marginVertical: 8,
  },
});
