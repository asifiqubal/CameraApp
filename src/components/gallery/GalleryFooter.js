import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const GalleryFooter = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.prevButton}>
        <Text style={{color: '#000'}}>Back</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.nextButton}>
        <Text style={{color: '#000'}}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GalleryFooter;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 54,
    justifyContent: 'space-between',
  },
  prevButton: {
    justifyContent: 'center',
    marginLeft: 20,
    padding: 8,
  },
  nextButton: {
    justifyContent: 'center',
    marginRight: 20,
    padding: 8,
  },
});
