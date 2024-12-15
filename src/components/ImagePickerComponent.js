import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  Alert,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Ip from '../assets/Ip';
import Colors from '../assets/Colors';

const MAX_IMAGE_SIZE_KB = 100; // Set maximum image size in KB

const ImagePickerComponent = ({onImageSelected}) => {
  const [loading, setLoading] = useState(false);
  const [imageUri, setImageUri] = useState('');

  const uploadPhoto = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      quality: 0.5,
    };

    if (Platform.OS === 'android') {
      options.storageOptions = {
        skipBackup: true,
        path: 'images',
      };
    }

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const selectedImage = response.assets[0];
        const imageSizeKb = selectedImage.fileSize / 1024; // Convert file size to KB
        console.log(`Selected image size: ${imageSizeKb} KB`);
        if (imageSizeKb > MAX_IMAGE_SIZE_KB) {
          Alert.alert(
            'Image too large',
            `Please select an image smaller than ${MAX_IMAGE_SIZE_KB} KB.`,
          );
        } else {
          const newImageUri = {
            uri: selectedImage.uri,
            type: selectedImage.type,
            name: selectedImage.fileName,
          };
          setImageUri(newImageUri);
          onImageSelected(newImageUri);
        }
      }
    });
  };

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      {imageUri?.uri ? (
        <Image source={{uri: imageUri.uri}} style={styles.image} />
      ) : (
        <TouchableOpacity
          onPress={uploadPhoto}
          style={styles.imagePickerButton}>
          <Image
            source={require('../assets/icons/imagePicker.png')}
            style={styles.placeholderImage}
          />
        </TouchableOpacity>
      )}
      <Text style={styles.caption}>
        {imageUri?.uri ? 'Image selected' : 'Pick an image'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: wp('25%'),
    height: wp('25%'),
    borderRadius: 5,
    resizeMode: 'contain',
  },
  imagePickerButton: {
    width: wp('25%'),
    height: wp('25%'),
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightGrey, // Add a background color for the button
    borderWidth: 1,
    borderColor: Colors.grey,
  },
  placeholderImage: {
    maxWidth: wp('20%'),
    maxHeight: wp('20%'),
    borderRadius: 15,
    resizeMode: 'contain',
  },
  activityIndicator: {
    position: 'absolute',
  },
  caption: {
    marginTop: 10,
    fontSize: 14,
    color: Colors.darkGrey,
  },
});

export default ImagePickerComponent;
