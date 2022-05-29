import React from 'react';
import {Camera} from '../components/camera';
import {GalleryHome} from '../components/gallery';

export function LandingScreen(props) {
  return <GalleryHome {...props} />;
}
export function CameraScreen(props) {
  return <Camera {...props} />;
}
