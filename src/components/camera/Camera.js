import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import FS from 'react-native-fs';
import {useDispatch, useSelector} from 'react-redux';
import {UpdatePhotoList} from '../../redux/actions/Photo';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {CustomModal} from '../_common';
const Camera = ({navigation}) => {
  const [{cameraRef}, {takePicture}] = useCamera(null);
  const [isLoading, SetLoading] = useState(false);
  const [imgShowing, ShowImg] = useState(false);
  const [type, SetType] = useState(RNCamera.Constants.Type.back);
  const Path = FS.PicturesDirectoryPath + '/CameraApp';
  const dispatch = useDispatch();
  const imgUri = useSelector(state => [...state.__photos.list].flat().pop());
  // console.log(imgUri);

  const captureHandle = async () => {
    try {
      SetLoading(true);
      const data = await takePicture();
      const filePath = data.uri;
      const dtNow = Date.now();
      const newFilePath = Path + '/CameraApp_' + dtNow + '.jpg';

      await FS.moveFile(filePath, newFilePath);
      await dispatch(UpdatePhotoList());
      SetLoading(false);
    } catch (error) {
      SetLoading(false);
      console.warn(error);
    }
  };
  const handelCameraType = () => {
    if (type === RNCamera.Constants.Type.back) {
      SetType(RNCamera.Constants.Type.front);
    } else {
      SetType(RNCamera.Constants.Type.back);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <MIcon
          name="arrow-back-ios"
          size={32}
          color={'#ffca00'}
          style={{marginLeft: 6}}
        />
      </TouchableOpacity>
      <RNCamera ref={cameraRef} type={type} style={styles.camera}>
        {isLoading ? (
          <View style={[styles.captureButton, {borderColor: '#b8b8b8'}]}>
            <View style={styles.captureLoading}>
              <ActivityIndicator color={'#fff'} size={40} />
            </View>
          </View>
        ) : (
          <TouchableOpacity
            onPress={captureHandle}
            style={styles.captureButton}>
            <View
              style={{
                height: 44,
                width: 44,
                borderRadius: 22,
                backgroundColor: '#fff',
              }}
            />
          </TouchableOpacity>
        )}
      </RNCamera>
      <TouchableOpacity
        onPress={() => {
          ShowImg(true);
        }}>
        <Image
          source={{uri: imgUri}}
          resizeMode={'cover'}
          style={{
            height: 60,
            width: 60,
            borderRadius: 6,
            position: 'absolute',
            bottom: 20,
            left: 20,
            borderColor: '#ffca00',
            borderWidth: 0.75,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handelCameraType}>
        <MIcon
          name="flip-camera-android"
          size={40}
          style={{
            borderRadius: 6,
            position: 'absolute',
            bottom: 30,
            right: 30,
          }}
        />
      </TouchableOpacity>
      <CustomModal
        visibility={imgShowing}
        imgUri={imgUri}
        onClose={() => ShowImg(false)}
      />
    </SafeAreaView>
  );
};

export default Camera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  captureButton: {
    height: 56,
    width: 56,
    borderRadius: 28,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureLoading: {
    height: 44,
    width: 44,
    borderRadius: 22,
    backgroundColor: '#b8b8b8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
    height: 46,
    width: 46,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
});
