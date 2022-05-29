import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';

const GalleryHeader = ({navigation}) => {
  return (
    <View style={styles.container}>
      <FA5Icon
        name="camera"
        onPress={() => navigation.navigate('Camera')}
        size={40}
        color={'#000'}
      />
    </View>
  );
};

export default GalleryHeader;

const styles = StyleSheet.create({
  container: {
    height: 54,
    backgroundColor: '#fff',
  },
});
