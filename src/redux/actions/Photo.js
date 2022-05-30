import FS from 'react-native-fs';

const RdxUpdatePhotoList = payload => {
  return {
    type: 'photo:list-update',
    payload: payload,
  };
};

export const UpdatePhotoList = () => {
  return async (d, gs) => {
    const Path = FS.PicturesDirectoryPath + '/CameraApp';
    console.log(Path);
    let files = await FS.readDir(Path);
    files = files.map(val => 'file:///' + val.path);
    console.log(files);
    await d(RdxUpdatePhotoList(PreepImgUrl(files)));
    return 'ok';
  };
};

function PreepImgUrl(files) {
  //   console.log('hi');
  let photos = [];
  const chunkSize = 4;
  for (let i = 0; i < files.length; i += chunkSize) {
    const chunk = files.slice(i, i + chunkSize);
    photos.push(chunk);
  }
  return photos;
}
