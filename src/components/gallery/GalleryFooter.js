import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import MIcons from 'react-native-vector-icons/MaterialIcons';

const GalleryFooter = ({currentPage, totalPage, onChangePage}) => {
  return (
    <View style={styles.container}>
      <View
        style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center'}}>
        {currentPage > 0 && (
          <TouchableOpacity
            style={styles.prevButton}
            onPress={() => onChangePage(-1)}>
            <MIcons name="arrow-back-ios" size={25} color={'#000'} />
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: '#000'}}>
          {[currentPage + 1, totalPage].join(' / ')}
        </Text>
      </View>
      <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
        {currentPage + 1 < totalPage && (
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => onChangePage(1)}>
            <MIcons name="arrow-forward-ios" size={25} color={'#000'} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default GalleryFooter;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 54,
    backgroundColor: '#ffca00',
  },
  prevButton: {
    justifyContent: 'flex-end',
    marginLeft: 20,
    padding: 8,
  },
  nextButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 20,
    padding: 8,
  },
});
