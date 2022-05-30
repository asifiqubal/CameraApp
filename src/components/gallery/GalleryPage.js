import {
  StyleSheet,
  Dimensions,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CustomModal} from '../_common';
const {width, height} = Dimensions.get('window');

const GalleryPage = ({data}) => {
  const [selectedImg, SelectImg] = useState(null);
  const [showImg, SetImgShow] = useState(false);
  useEffect(() => {
    SetImgShow(selectedImg ? true : false);
  }, [selectedImg]);
  useEffect(() => {
    if (!showImg) {
      SelectImg(null);
    }
  }, [showImg]);
  return (
    <View
      style={{
        justifyContent: 'flex-start',
        width,
        paddingHorizontal: 12,
        paddingVertical: 8,
      }}>
      <View style={styles.imageContainer}>
        {data.length > 0 &&
          data.map(uri => {
            return (
              <TouchableOpacity
                style={[styles.imageItem, styles.shadow]}
                key={uri}
                onPress={() => SelectImg(uri)}>
                <Image
                  source={{uri}}
                  resizeMode={'cover'}
                  style={{height: '100%', borderRadius: 6}}
                />
              </TouchableOpacity>
            );
          })}
      </View>
      <CustomModal
        visibility={showImg}
        imgUri={selectedImg}
        onClose={() => SetImgShow(false)}
      />
    </View>
  );
};

export default GalleryPage;

const styles = StyleSheet.create({
  imageContainer: {
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
  },
  imageItem: {
    width: width / 2 - 24,
    height: height / 2 - 76,
    backgroundColor: '#fff',
    margin: 6,
    borderRadius: 6,
    borderColor: '#ffca00',
    borderWidth: 0.5,
  },
  shadow: {
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowColor: '#ffca00',
    elevation: 8,
  },
});
