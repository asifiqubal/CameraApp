import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Image,
  View,
  FlatList,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import GalleryFooter from './GalleryFooter';
import GalleryHeader from './GalleryHeader';
import {useDispatch, useSelector} from 'react-redux';
import {UpdatePhotoList} from '../../redux/actions/Photo';
import GalleryPage from './GalleryPage';
const {width, height} = Dimensions.get('window');

const GalleryHome = ({navigation}) => {
  const imageList = useSelector(state => state.__photos.list);
  const [currentIndex, SetCurrentIndex] = useState(0);
  const galleryRef = useRef();

  const dispatch = useDispatch();

  const init = async () => {
    await dispatch(UpdatePhotoList());
  };
  useEffect(() => {
    init().then().catch();
  }, []);
  const handelPageChange = val => {
    if (currentIndex >= 0 && currentIndex < imageList.length) {
      // console.log(val);
      SetCurrentIndex(ps => ps + val);
    }
  };

  useEffect(() => {
    galleryRef?.current?.scrollToOffset({
      offset: currentIndex * width,
      animated: true,
    });
  }, [currentIndex]);
  useEffect(() => {
    SetCurrentIndex(imageList.length - 1);
  }, [imageList]);

  return (
    <SafeAreaView style={styles.container}>
      <GalleryHeader navigation={navigation} />
      <FlatList
        ref={galleryRef}
        data={imageList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        keyExtractor={(_, i) => i + 1 * Date.now()}
        renderItem={({item, index}) => <GalleryPage data={item} />}
        onMomentumScrollEnd={event => {
          SetCurrentIndex(
            Math.round(event.nativeEvent.contentOffset.x / width),
          );
        }}
      />

      <GalleryFooter
        currentPage={currentIndex}
        totalPage={imageList.length}
        onChangePage={handelPageChange}
      />
    </SafeAreaView>
  );
};

export default GalleryHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
