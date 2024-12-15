import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import axios from 'axios';
import Toast from 'react-native-toast-message';
import Ip from '../assets/Ip';
import Colors from '../assets/Colors';

const AddUserProductModel = ({Barcode, visible, onClose}) => {
  const [productName, setProductName] = useState('');
  const [barcode, setBarcode] = useState('');
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setBarcode(Barcode);
  }, [Barcode]);

  const addProduct = async () => {
    try {
      if (productName == '' || company == '') {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'All field require.',
        });
      } else {
        setLoading(true);
        const response = await axios.post(`${Ip}/product/addTempProduct`, {
          barcode,
          productName,
          company,
        });

        if (response.data.message) {
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Your product will be added after review.',
          });
          setLoading(false);
          setCompany(''), setProductName('');
          setBarcode('');
          onClose();
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        Alert.alert('This Bar Code is already registered');
        setLoading(false);
      } else {
        Alert.alert('Request failed. Please try again later.');
        setLoading(false);
      }
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={{alignSelf: 'flex-end'}}>
            <TouchableOpacity onPress={onClose}>
              <Text style={{color: 'black', fontSize: hp('3%')}}>X</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.txt}>Add Product</Text>
          <TextInput
            style={styles.input}
            value={Barcode}
            onChangeText={text => setBarcode(text.trim())}
            editable={false}
          />

          <TextInput
            style={styles.input}
            placeholderTextColor={'gray'}
            placeholder="Enter Product Name"
            onChangeText={text => setProductName(text.trim())}
          />

          <TextInput
            style={styles.input}
            placeholderTextColor={'gray'}
            placeholder="Enter Product Company"
            onChangeText={text => setCompany(text)}
          />

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: hp('2%'),
            }}>
            <TouchableOpacity
              onPress={() => addProduct()}
              style={{
                width: wp('50%'),
                height: hp('6%'),
                elevation: 2,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Colors.tomato,
                borderRadius: 10,
              }}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator color="black" size="small" />
              ) : (
                <Text style={{color: 'black', fontSize: hp('3%')}}>Add</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <Toast />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: wp('90%'),
    minHeight: hp('50%'),
    alignItems: 'center',
    gap:20
  },
  input: {
    color: '#333',
    borderWidth: 1,
    width: wp('70%'),
    height: hp('5.5%'),
    marginTop: hp('1%'),
  },
  txt: {
    fontSize: hp('2.5%'),
    color: 'black',
    fontWeight: '700',
  },
});

export default AddUserProductModel;
