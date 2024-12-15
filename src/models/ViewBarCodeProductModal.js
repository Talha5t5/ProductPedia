// ProductDetailModal.js
import Barcode from '@kichiyaki/react-native-barcode-generator';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Pressable,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ip from '../assets/Ip';

const ViewBarcodeProductModal = ({isVisible, closeModal, productData}) => {
  console.log(productData[0]);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={closeModal}>
      <View style={styles.modalContainer}>
        <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
          <AntDesign name="close" color={'#fff'} size={30} />
        </TouchableOpacity>
        <View style={styles.contentContainer}>
          {productData[0]?.company.companyLogo && (
            <Image
              source={{uri: `${Ip}/${productData[0].company.companyLogo}`}}
              style={styles.productImage}
              onError={error => console.log('Image loading error:', error)}
            />
          )}
          {productData && (
            <View style={styles.overlay}>
              <View style={styles.detailRow}>
                <Text style={{...styles.label, color: 'orange'}}>Barcode:</Text>
                <Text style={styles.detail}>{productData[0].barcode}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    marginTop: 10,
                    padding: 10,
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    maxWidth: '50%',
                  }}>
                  <View style={{marginBottom: 30}}>
                    <Text style={styles.label}>Name</Text>
                    <Text
                      style={{
                        ...styles.detail,
                        maxWidth: '100%',
                        flexWrap: 'wrap',
                      }}>
                      {productData[0].name ? productData[0].name : 'N/A'}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.label}>Manufacturer</Text>
                    <Text
                      style={{
                        ...styles.detail,
                        maxWidth: '100%',
                        flexWrap: 'wrap',
                      }}>
                      {productData[0]?.company.name
                        ? productData[0]?.company.name
                        : 'N/A'}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    marginTop: 10,
                    padding: 10,
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    maxWidth: '50%',
                    marginLeft: hp('4%'),
                  }}>
                  <View style={styles.companyDetailRow}>
                    <Text style={styles.label}>Category</Text>
                    <Text style={styles.detail}>
                      {productData[0]?.category
                        ? productData[0]?.category[0].name
                        : 'N/A'}
                    </Text>
                  </View>
                  <View style={styles.companyDetailRow}>
                    <Text style={styles.label}>Country</Text>
                    <Text style={styles.detail}>
                      {productData[0].company.country.name
                        ? productData[0].company.country.name
                        : 'N/A'}
                    </Text>
                  </View>
                </View>
              </View>
              <Text
                style={{
                  color: 'gray',
                  opacity: 0.7,
                  textAlign: 'center',
                }}>
                _______________________________________
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    marginTop: 25,
                    fontSize: 16,
                    color: 'orange',
                  }}>
                  {' '}
                  Description:{' '}
                </Text>
                <Text style={styles.discription}>
                  {productData[0]?.discription
                    ? productData[0]?.discription
                    : 'N/A'}
                </Text>
              </View>
            </View>
          )}
          <Toast />
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
    backgroundColor: '#212121',
  },
  closeButton: {
    position: 'absolute',
    top: hp('2%'),
    right: wp('2%'),
    zIndex: 9999,
  },
  contentContainer: {
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  productImage: {
    width: '90%',
    height: '40%',
    borderRadius: 30,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  overlay: {
    borderRadius: 10,
    padding: 5,
    width: '100%',
  },
  detail: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    padding: 2,
  },
  detailRow: {
    flexDirection: 'row',
  },
  label: {
    fontSize: 16,
    color: 'gray',
  },
  detail: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    padding: 2,
  },
  discription: {
    marginTop: 25,
    fontSize: 13,
    color: '#fff',
    textAlign: 'justify',
    marginBottom: 5,
    padding: 2,
    maxWidth: '70%',
    maxHeight: '80%',
  },
  btn: {
    width: wp('15%'),
    height: hp('5%'),
    borderRadius: wp('1%'),
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 3,
  },
  closeButton: {
    position: 'absolute',
    top: hp('2%'),
    right: wp('2%'),
    zIndex: 9999, // Ensure it's above other elements
  },
});

export default ViewBarcodeProductModal;
