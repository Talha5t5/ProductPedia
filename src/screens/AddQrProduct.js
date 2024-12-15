
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, BackHandler } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Ip from '../assets/Ip';
import { ActivityIndicator } from 'react-native-paper';
import ViewBarcodeProductModal from '../models/ViewBarCodeProductModal';
import Toast from 'react-native-toast-message';
import CustomNumericKeyboard from '../components/Keyboard';
import NetworkErrorModal from '../models/NetworkErrorModel';
import AddUserProductModel from '../models/AddUserProductModel';
import LoaderModal from '../models/loader';

const AddQrProduct = ({ navigation }) => {
  const dispatch = useDispatch();
  const [scannedBarcode, setScannedBarcode] = useState('');
  const [productData, setProductData] = useState('');
  const [isScanning, setIsScanning] = useState(true);
  const [loading, setLoading] = useState(false);
  const [modelVisible, setModelVisible] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [torchOn, setTorchOn] = useState(false);
  const [keyboardModal, setKeyboardVisible] = useState(false);
  const [networkErrorModal, setNetworkErrorModal] = useState(false);
  const [addProductModal, setAddProductModal] = useState(false);

  const companiesList = useSelector((state) => state.CompanyReducers).flat();
  const devices = useCameraDevices();
  const device = devices.back;

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      if (status !== 'authorized') {
        Alert.alert('Camera permission not granted');
      }
    })();
  }, []);

  const handleKeyPress = (key) => {
    setAddModal(true);
    setKeyboardVisible(false);
    setScannedBarcode(key);
    setIsScanning(false);
  };

  useEffect(() => {
    const backAction = () => {
      scanAgain();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const scanAgain = () => {
    setScannedBarcode(null);
    setModelVisible(false);
    setAddProductModal(false);
    setIsScanning(true);
  };

  const getProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${Ip}/product/getBarcodeProduct/${scannedBarcode}`);
      const data = response.data.product;
      if (response.data.success && data.length !== 0) {
        setLoading(false);
        setProductData(data);
        setModelVisible(true);
      } else if (addModal) {
        setLoading(false);
        setAddModal(false);
        Alert.alert(
          '',
          `Product not found (${scannedBarcode})\n\nDo you want to add it?`,
          [
            { text: 'No', onPress: scanAgain, style: 'cancel' },
            { text: 'Yes', onPress: () => setAddProductModal(true) },
          ],
        );
      }
    } catch (error) {
      setNetworkErrorModal(true);
      setLoading(false);
      scanAgain();
    }
  };

  useEffect(() => {
    if (scannedBarcode && addModal) {
      getProduct();
    }
  }, [scannedBarcode]);

  if (!device) return <ActivityIndicator size="large" color="#fff" />;

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          style={styles.camera}
          device={device}
          isActive={isScanning}
          torch={torchOn ? 'on' : 'off'}
          onError={(error) => console.error('Camera error:', error)}
        />
        <View style={styles.cameraFrame} />
      </View>

      <View style={{ ...styles.overlay2, justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={() => setKeyboardVisible(true)}>
          <Icons name="keyboard" color="#fff" size={40} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('NewDashboard')}>
          <Icon name="closecircle" color="#fff" size={50} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Explore')}>
          <Icon name="search1" color="#fff" size={40} />
        </TouchableOpacity>
      </View>

      {modelVisible && (
        <ViewBarcodeProductModal
          isVisible={modelVisible}
          productData={productData}
          closeModal={scanAgain}
        />
      )}
      <CustomNumericKeyboard
        visible={keyboardModal}
        onClose={() => setKeyboardVisible(false)}
        onKeyPress={handleKeyPress}
      />
      <NetworkErrorModal
        visible={networkErrorModal}
        onClose={() => setNetworkErrorModal(false)}
      />
      <AddUserProductModel
        visible={addProductModal}
        Barcode={scannedBarcode}
        onClose={scanAgain}
      />
      <LoaderModal isVisible={loading} message="Loading..." />
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#212121',
  },
  cameraContainer: {
    position: 'relative',
    width: '90%',
    height: '70%',
    borderRadius: wp('2%'),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  cameraFrame: {
    position: 'absolute',
    width: '80%',
    height: '60%',
    borderColor: 'green',
    borderWidth: 2,
    borderRadius: 10,
    zIndex: 2,
  },
  overlay2: {
    marginTop: 10,
    padding: 20,
    borderRadius: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    maxHeight: hp('20%'),
    width: wp('90%'),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});

export default AddQrProduct;