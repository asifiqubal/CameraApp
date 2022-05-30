import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';

const GalleryHeader = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Gallery App</Text>
      </View>
      <FA5Icon
        name="camera"
        onPress={() => navigation.navigate('Camera')}
        size={35}
        color={'#000'}
      />
    </View>
  );
};

export default GalleryHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 54,
    backgroundColor: '#ffca00',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    color: '#000',
    marginLeft: 8,
    fontSize: 24,
    fontWeight: '700',
  },
});
