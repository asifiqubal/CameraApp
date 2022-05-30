import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Photos from './Photos';
import Gallery from './Gallery';
/**
 */
const RdxReducers = combineReducers({
  __photos: Photos,
  __gallery: Gallery,
});

/**
 */
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['__photos', '__gallery'],
};

/**
 */
export default persistReducer(persistConfig, RdxReducers);
