import React, {useState, useEffect} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Ip from '../assets/Ip';
import Colors from '../assets/Colors';

import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import ShowToast from '../components/ShowToast';
import Toast from 'react-native-toast-message';
import {
  updateproductApi,
  getSubCategoriesByCategoryIdApi,
} from '../redux/constants/Apis';
import DropdownComponent from '../components/Dropdown';
import MultiSelectionPicker from '../screens/MultiSelectionPicker';
import ImagePickerComponent from '../components/ImagePickerComponent';
import {UPDATE_FETCH_DATA} from '../redux/constants/Constants';

export default UpdateProductModel = ({props}) => {
  const dispatch = useDispatch();
  const modelData = useSelector(state => state.UpdateProductsModelDataReducers);
  let companiesList = useSelector(state => state.CompanyReducers);
  companiesList = companiesList.flat();
  let categoryList = useSelector(state => state.CategoryReducers);
  categoryList = categoryList.flat();

  const [isCompanyPickerValueSelected, setIsCompanyPickerValueSelected] =
    useState(true);
  const [selectedCompanyPickerItem, setSelectedCompanyPickerItem] = useState(
    modelData.company,
  );
  const [selectedCategories, setSelectedCategories] = useState([
    modelData?.category,
  ]);
  const [barcode, setBarcode] = useState(modelData.barcode);
  const [image, setImage] = useState('');
  const [productName, setProductName] = useState(modelData.name);
  const [productDiscription, setProductDiscription] = useState(
    modelData.discription,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitButtonEnable, setIsSubmitButtonEnable] = useState(true);
  const formData = new FormData();
  async function PostData() {
    setIsSubmitButtonEnable(false);
    setIsLoading(true);
    ///// form data ////
    formData.append('id', modelData._id);
    formData.append('barcode', barcode);
    formData.append('name', productName);
    formData.append('discription', productDiscription);
    formData.append('company', selectedCompanyPickerItem._id);
    formData.append('category', selectedCategories);
    formData.append('image', image);
    ///////////////////////////////////////////
    try {
      let response = await axios.put(updateproductApi, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setIsLoading(false);
      console.log(response.data);
      if (response.status == 200) {
        ShowToast({
          type: 'success',
          text1: response.data.msg,
        });
        setBarcode('');
        setProductName('');
        setProductDiscription('');
        setSelectedCompanyPickerItem({});
        props.handleRefresh();
      } else {
        ShowToast({
          type: 'error',
          text1: response.data.msg,
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.error('An error occurred:');
      ShowToast({
        type: 'error',
        text1: 'Error! Product Not Inserted Please Try Again',
      });
    } finally {
      setIsSubmitButtonEnable(true);
      setIsLoading(false);
    }
  }

  const onSelectCategory = selectedItems => {
    setSelectedCategories(selectedItems);
    console.log(selectedCategories);
  };
  useEffect(() => {
    console.log('Update Props', modelData);
  }, []);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={() => {
          props.setIsUpdateModelVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.closeIconContainer}>
              <Pressable
                onPress={() => {
                  props.setIsUpdateModelVisible(false);
                }}>
                <Text style={styles.closeIcon}>X</Text>
              </Pressable>
            </View>
            <View style={styles.modelContent}>
              <View style={styles.container}>
                <ImagePickerComponent
                  onImageSelected={item => setImage(item)}
                />
                <View style={styles.inputContainer}>
                  <Text style={styles.inputContainerLabel}>Barcode</Text>
                  <TextInput
                    style={styles.inputContainerInputFeild}
                    placeholderTextColor="gray"
                    placeholder="857.... etc"
                    value={barcode}
                    onChangeText={e => {
                      setBarcode(e);
                    }}
                    keyboardType="default"
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputContainerLabel}>Name</Text>
                  <TextInput
                    style={styles.inputContainerInputFeild}
                    placeholderTextColor="gray"
                    placeholder="Dove etc"
                    value={productName}
                    onChangeText={e => {
                      setProductName(e);
                    }}
                    keyboardType="default"
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputContainerLabel}>Discription</Text>
                  <TextInput
                    multiline={true}
                    style={styles.inputContainerInputFeild}
                    placeholderTextColor="gray"
                    placeholder="About Product"
                    value={productDiscription}
                    onChangeText={e => {
                      setProductDiscription(e);
                    }}
                    keyboardType="default"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputContainerLabel}>Company</Text>
                  <View style={styles.pickerWrapper}>
                    <View style={styles.pickerContainer}>
                      <DropdownComponent
                        propsData={{
                          data: companiesList,
                          setValue: setSelectedCompanyPickerItem,
                          value: selectedCompanyPickerItem,
                        }}
                      />
                    </View>
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputContainerLabel}>Category</Text>
                  <View style={styles.pickerWrapper2}>
                    <View style={styles.pickerContainer}>
                      <MultiSelectionPicker
                        categoryList={categoryList}
                        onSelectCategory={onSelectCategory}
                        categorySelected={modelData.category.flat()}
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
              <Toast />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeIconContainer: {
    marginRight: 30,
    marginTop: 20,
  },
  closeIcon: {
    textAlign: 'right',
    fontSize: 30,
    color: 'gray',
  },
  modelContent: {
    marginBottom: 30,
    marginTop: 10,
  },
  container: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 10,
  },
  inputContainerLabel: {
    fontSize: 16,
    color: Colors.primaryFontColor,
    width: '40%',
  },
  inputContainerInputFeild: {
    fontSize: 16,
    width: '60%',
    height: 40,
    borderWidth: 2,
    color: Colors.primaryFontColor,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    borderColor: Colors.secondaryBgColor,
  },
  btnContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  btnText: {
    backgroundColor: Colors.secondaryBgColor,
    color: Colors.secondaryFontColor,
    fontWeight: 'bold',
    borderRadius: 10,
    fontSize: 20,
    paddingVertical: 10,
    textAlign: 'center',
    width: 100,
  },
  pickerWrapper: {
    width: '60%',
    height: 40,
    paddingVertical: 4,
    justifyContent: 'center',
  },
  pickerWrapper2: {
    width: '60%',
    paddingVertical: 4,
    justifyContent: 'center',
  },
  pickerContainer: {
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 10,
    width: '100%',
    borderColor: Colors.secondaryBgColor,
    color: Colors.primaryFontColor,
  },
  picker: {
    height: 50,
    color: Colors.primaryFontColor,
  },
});
