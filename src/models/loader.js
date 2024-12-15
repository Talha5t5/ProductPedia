import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Animated,
  Easing,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


const LoaderModal = ({isVisible, message}) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    if (isVisible) {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();
    }
  }, [isVisible]);

  return (
    <Modal transparent={true} animationType="slide" visible={isVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Animated.Image
            source={require('../assets/icons/loader.png')} // Replace './your_loader_image.png' with your image path
            style={[styles.loaderImage, {transform: [{rotate: spin}]}]}
          />
          <Text style={styles.loadingText}>{message}...</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: wp('75%'),
    height: hp('8%'),
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: wp('3%'),
    flexDirection: 'row',
    alignItems: 'center', // Center the content vertically
  },
  loaderImage: {
    width: 40, // Adjust width as needed
    height: 40, // Adjust height as needed
  },
  loadingText: {
    marginLeft: wp('4%'),
    color: "#333",
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
});

export default LoaderModal;
