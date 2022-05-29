import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import FS from 'react-native-fs';
import {} from 'react/cjs/react.production.min';
const Camera = () => {
  const [{cameraRef}, {takePicture}] = useCamera(null);
  const Path = FS.PicturesDirectoryPath + '/CameraApp';

  const init = async () => {
    const isExists = await FS.exists(Path);
    if (!isExists) {
      await FS.mkdir(Path);
    }

    FS.readDir(Path).then(data => console.log(data));
  };
  useEffect(() => {
    init().then().catch();
  }, []);
  const captureHandle = async () => {
    try {
      const data = await takePicture();
      const filePath = data.uri;
      const dtNow = Date.now();
      const newFilePath = Path + '/MyTest_' + dtNow + '.jpg';
      // console.log(FS.ExternalStorageDirectoryPath, res);

      FS.moveFile(filePath, newFilePath)
        .then(() => {
          console.log('IMAGE MOVED', filePath, '-- to --', newFilePath);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        type={RNCamera.Constants.Type.back}
        style={styles.camera}>
        <FA5Icon
          name="camera"
          onPress={captureHandle}
          size={40}
          color={'#000'}
        />
      </RNCamera>
    </View>
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
});
