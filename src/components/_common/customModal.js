import React, {useEffect, useReducer, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Modal,
  Image,
  TouchableOpacity,
} from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialIcons';

let {width, height} = Dimensions.get('window');

const INITIAL_STATE = {
  isVisible: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'close':
      return {...state, isVisible: false};
    case 'open':
      return {...state, isVisible: true};
    case 'visibility':
      return {...state, isVisible: action.payload};
    default:
      throw new Error('Action Type Not Support.');
  }
}

function CustomModal({visibility, onClose, imgUri, onBack, style}) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const animation = useRef(new Animated.Value(0)).current;

  let backHandler = null;
  useEffect(() => {
    toggleModal(visibility);
  }, [visibility]);

  useEffect(() => {
    return () => toggleModal(false);
  }, []);

  const toggleModal = visibility => {
    if (visibility) {
      dispatch({type: 'visibility', payload: visibility});
      Animated.spring(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        dispatch({type: 'visibility', payload: visibility});
      });
      onClose();
    }
  };

  const open = {
    transform: [{scale: animation}],
  };

  return (
    <Modal transparent visible={state.isVisible} onRequestClose={() => {}}>
      <Animated.View style={[styles.modalBody, open, style]}>
        <TouchableOpacity
          onPress={() => toggleModal(false)}
          style={styles.backButton}>
          <MIcon
            name="arrow-back-ios"
            size={32}
            color={'#ffca00'}
            style={{marginLeft: 6}}
          />
        </TouchableOpacity>
        <Image
          source={{uri: imgUri}}
          resizeMode={'cover'}
          style={{height: '100%', width: '100%'}}
        />
      </Animated.View>
    </Modal>
  );
}

export default CustomModal;

const styles = StyleSheet.create({
  modalBody: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrap: {
    margin: 8,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 8.4,
      height: 8.4,
    },
    shadowOpacity: 0.74,
    shadowRadius: 30,
    elevation: 10,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 8.4,
      height: 8.4,
    },
    shadowOpacity: 0.74,
    shadowRadius: 30,
    elevation: 5,
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
