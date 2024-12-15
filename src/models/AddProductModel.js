// ProductDetailModal.js
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
import DropdownComponent from '../components/Dropdown';
import {useDispatch, useSelector} from 'react-redux';
import {
  getSubCategoriesByCategoryIdApi,
  postproductApi,
} from '../redux/constants/Apis';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import ShowToast from '../components/ShowToast';
import {GetTempProduct} from '../redux/actions/Action';
import MultiSelectionPicker from '../screens/MultiSelectionPicker';
import Colors from '../assets/Colors';

const ProductDetailModal = ({modalVisible, closeModal, modalData}) => {
  let companiesList = useSelector(state => state.CompanyReducers);
  companiesList = companiesList.flat();
  let categoryList = useSelector(state => state.CategoryReducers);
  categoryList = categoryList.flat();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [name, setName] = useState(modalData.productName);
  const [productDiscription, setProductDiscription] = useState('');
  const [barcode, setBarcode] = useState(modalData.barcode);
  const [image, setImage] = useState('');
  const [selectedCompanyPickerItem, setSelectedCompanyPickerItem] =
    useState('');
  const [loading, setLoading] = useState(false);
  const formData = new FormData();

  useEffect(() => {
    const filteredCompanies = companiesList.filter(
      company => company.name.toLowerCase() === modalData.company.toLowerCase(),
    );

    if (filteredCompanies.length >= 1) {
      const company = filteredCompanies[0];
      setSelectedCompanyPickerItem(company._id);
      console.log(company._id);
    }
  }, [modalData, companiesList]);

  async function PostData() {
    try {
      setLoading(true);
      formData.append('id', modalData._id);
      formData.append('barcode', barcode.trim());
      formData.append('name', name.trim());
      formData.append('discription', productDiscription);
      formData.append('company', selectedCompanyPickerItem._id);
      formData.append('category', selectedCategories);
      formData.append('image', image);
      console.log(formData);
      let response = await axios.post(postproductApi, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status == 200) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Product added successfully!',
        });
        setName('');
        setBarcode('');
        closeModal();
      } else if (response.status == 400) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Product with this barcode already exists',
        });
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        // The request was made, but the server responded with a status code outside the range of 2xx
        if (error.response.status === 400 && error.response.data.msg) {
          ShowToast({
            type: 'error',
            text1: `Error! ${error.response.data.msg}.`,
          });
        }
      } else if (error.request) {
        // The request was made, but no response was received
        ShowToast({
          type: 'error',
          text1: 'Error! No response from server. Please try again.',
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        ShowToast({
          type: 'error',
          text1: 'Error! An unexpected error occurred. Please try again.',
        });
      }
    } finally {
      setLoading(false);
    }
  }
  const onSelectCategory = selectedItems => {
    setSelectedCategories(selectedItems);
    console.log(selectedCategories);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {modalData && (
            <View>
              <View style={{justifyContent: 'flex-start', left: wp('68%')}}>
                <TouchableOpacity onPress={closeModal}>
                  <Text style={{color: 'black', fontSize: hp('3%')}}>X</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.txt}>Detail Information</Text>
              <TextInput
                style={styles.input}
                value={barcode}
                onChangeText={text => setBarcode(text)}
                editable={false}
              />

              <TextInput
                style={styles.input}
                value={name}
                onChangeText={text => setName(text)}
              />

              <View style={styles.pickerWrapper}>
                <View style={styles.pickerContainer}>
                  <DropdownComponent
                    propsData={{
                      data: companiesList,
                      setValue: setSelectedCompanyPickerItem,
                      value: selectedCompanyPickerItem,
                      dropdownLabel: 'Select Compnay',
                    }}
                  />
                </View>
              </View>

              <View style={styles.pickerWrapper}>
                <View style={styles.pickerContainer2}>
                  <MultiSelectionPicker
                    categoryList={categoryList}
                    onSelectCategory={onSelectCategory}
                  />
                </View>
              </View>

              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: hp('2%'),
                }}>
                <TouchableOpacity
                  onPress={() => PostData()}
                  style={{
                    width: wp('50%'),
                    height: hp('6%'),
                    elevation: 2,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: Colors.tomato,
                  }}
                  disabled={loading}>
                  {loading ? (
                    <ActivityIndicator color="black" size="small" />
                  ) : (
                    <Text style={{color: 'black', fontSize: hp('3%')}}>
                      Save
                    </Text>
                  )}
                </TouchableOpacity>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  input: {
    color: 'black',
    borderWidth: 1,
    width: wp('70%'),
    height: hp('5.5%'),
    marginTop: hp('1%'),
  },
  pickerContainer: {
    borderWidth: 1,
    height: hp('5.5%'),
    width: wp('70%'),
    borderColor: 'black',
    color: Colors.primaryFontColor,
    backgroundColor: 'white',
    justifyContent: 'center',
    marginTop: hp('1%'),
  },
  pickerContainer2: {
    borderWidth: 1,
    width: wp('70%'),
    borderColor: 'black',
    color: Colors.primaryFontColor,
    backgroundColor: 'white',
    justifyContent: 'center',
    marginTop: hp('1%'),
  },
  pickerWrapper: {
    marginBottom: 8,
    justifyContent: 'center',
  },
  txt: {
    fontSize: hp('2%'),
    color: 'black',
  },
});

export default ProductDetailModal;
