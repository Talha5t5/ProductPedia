import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import Colors from '../assets/Colors';
import ShowToast from '../components/ShowToast';
import Toast from 'react-native-toast-message';
import {postproductApi} from '../redux/constants/Apis';
import DropdownComponent from '../components/Dropdown';
import MultiSelectionPicker from './MultiSelectionPicker';
import ImagePickerComponent from '../components/ImagePickerComponent';
import styles from '../styles/formStyle';
export default function AddProduct() {
  let companiesList = useSelector(state => state.CompanyReducers);
  companiesList = companiesList.flat();

  let categoryList = useSelector(state => state.CategoryReducers);
  categoryList = categoryList.flat();

  const [isCompanyPickerValueSelected, setIsCompanyPickerValueSelected] =
    useState(false);
  const [selectedCompanyPickerItem, setSelectedCompanyPickerItem] = useState(
    {},
  );
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [barcode, setBarcode] = useState(null);
  const [productName, setProductName] = useState('');
  const [productDiscription, setProductDiscription] = useState('');
  const [isSubmitButtonEnable, setIsSubmitButtonEnable] = useState(true);
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const formData = new FormData();

  //////////// Post Data ///////////////////
  async function PostData() {
    setIsSubmitButtonEnable(false);
    setIsLoading(true);
    //// formData /////////
    formData.append('barcode', barcode.trim());
    formData.append('name', productName.trim());
    formData.append('discription', productDiscription.trim());
    formData.append('company', selectedCompanyPickerItem._id);
    formData.append('category', selectedCategories);
    formData.append('image', image);
    //////////////////////////////////
    console.log(selectedCategories);
    try {
      let response = await axios.post(postproductApi, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        ShowToast({
          type: 'success',
          text1: 'Product Inserted Successfully!',
        });
        setIsLoading(false);
        setProductName('');
        setProductDiscription('');
        setBarcode('');
        setImage('');
        setSelectedCompanyPickerItem({});
      } else if (response.status === 400) {
        ShowToast({
          type: 'error',
          text1: 'Duplicate record or validation error!',
        });
        setIsLoading(false);
      } else if (response.status === 500) {
        ShowToast({
          type: 'error',
          text1: 'Internal Server Error!',
        });
        setIsLoading(false);
      } else {
        ShowToast({
          type: 'error',
          text1: `Unexpected Error! Status code: ${response.status}`,
        });
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
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
      setIsSubmitButtonEnable(true);
    }
  }
  //////////////////////////////////////////////////////////////////////////

  const onSelectCategory = selectedItems => {
    setSelectedCategories(selectedItems);
    console.log(selectedCategories);
  };
  const handleImageSelected = item => {
    setImage(item);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <StatusBar barStyle={'light-content'} backgroundColor={'black'} />
          <View style={{justifyContent: 'center', alignContent: 'center'}}>
            <ImagePickerComponent onImageSelected={handleImageSelected} />
            <Text
              style={styles.inputContainerLabel}>{`Barcode (optional)`}</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputContainerInputFeild}
                placeholderTextColor="#A9A9A9"
                placeholder="barcode"
                value={barcode}
                onChangeText={e => {
                  setBarcode(e);
                }}
                keyboardType="default"
              />
            </View>
            <Text style={styles.inputContainerLabel}>Product Name</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputContainerInputFeild}
                placeholderTextColor="#A9A9A9"
                placeholder="Dove etc"
                value={productName}
                onChangeText={e => {
                  setProductName(e);
                }}
                keyboardType="default"
              />
            </View>
            <Text style={styles.inputContainerLabel}>Discription</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputContainerInputFeild}
                placeholderTextColor="#A9A9A9"
                placeholder="About Product"
                value={productDiscription}
                onChangeText={e => {
                  setProductDiscription(e);
                }}
                keyboardType="default"
                multiline={true}
              />
            </View>
            <Text style={styles.inputContainerLabel}>Company</Text>
            <View style={styles.inputContainer}>
              <View style={styles.pickerWrapper}>
                <View style={styles.pickerContainer}>
                  <DropdownComponent
                    propsData={{
                      dropdownLabel: 'Select Company',
                      data: companiesList,
                      setValue: setSelectedCompanyPickerItem,
                      value: selectedCompanyPickerItem,
                    }}
                  />
                </View>
              </View>
            </View>
            <Text style={styles.inputContainerLabel}>Category</Text>
            <View style={styles.inputContainer}>
              <View style={styles.pickerWrapper2}>
                <View style={styles.pickerContainer}>
                  <MultiSelectionPicker
                    categoryList={categoryList}
                    onSelectCategory={onSelectCategory}
                  />
                </View>
              </View>
            </View>

            <View style={styles.btnContainer}>
              <TouchableOpacity
                onPress={PostData}
                disabled={!isSubmitButtonEnable}>
                {isLoading ? (
                  <ActivityIndicator size="small" color={'#333'} />
                ) : (
                  <Text style={styles.btnText}>Submit</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Toast />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
