import React, { useEffect, useState } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';

const BarcodeScanner = ({ onScanned }) => {
  const device = useCameraDevice('back');

  if (device == null) return null;

  const codeScanner = useCodeScanner({
    codeTypes: [
      'ean-13',
      'ean-8',
      'upc-e',
      'codabar',
      'code-128',
      'code-39',
      'code-93',
      'pdf-417',
      'itf',
    ],
    onCodeScanned: (codes) => {
      try {
        if (codes.length > 0 && codes[0].value) {
          const scannedValue = codes[0].value;
          onScanned(scannedValue);
        }
      } catch (error) {
        console.error('Error in codeScanner:', error);
        console.log('Scanned codes:', codes);
      }
    },
    onError: (error) => {
      console.error('Camera error:', error);
      if (error.code === 'session/camera-has-been-disconnected') {
        Alert.alert(
          'Camera Disconnected',
          'Please make sure the camera is connected and try again.'
        );
      } else {
        // Handle other camera errors as needed
        Alert.alert(
          'Camera Error',
          'An unexpected camera error occurred. Please try again.'
        );
      }
    },
  });

  return (
    <View style={styles.cameraContainer}>
      <Camera
        style={styles.camera}
        device={device}
        isActive={true}
        codeScanner={codeScanner}
      />
      <View style={styles.cameraFrame} />
    </View>
  );
};

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
  },
  cameraFrame: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 200,
    height: 200,
    marginTop: -100,
    marginLeft: -100,
    borderColor: 'red',
    borderWidth: 2,
  },
});

export default BarcodeScanner;
