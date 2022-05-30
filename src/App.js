import React, {useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import {applyMiddleware, createStore} from 'redux';
import AppNavigator from './router/router';
import reducers from './redux/reducers';
import thunk from 'redux-thunk';
import {persistStore} from 'redux-persist';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import FS from 'react-native-fs';

const RdxStore = createStore(reducers, applyMiddleware(thunk));
const RdxPersistor = persistStore(RdxStore);

function App() {
  const Path = FS.PicturesDirectoryPath + '/CameraApp';

  const init = async () => {
    const isExists = await FS.exists(Path);
    if (!isExists) {
      await FS.mkdir(Path);
    }
  };
  useEffect(() => {
    init().then().catch();
  }, []);
  return (
    <Provider store={RdxStore}>
      <PersistGate
        persistor={RdxPersistor}
        loading={<ActivityIndicator color={'#000'} size={'small'} />}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
}

export default App;
