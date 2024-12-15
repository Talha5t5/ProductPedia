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
  updateCompanyApi,
} from '../redux/constants/Apis';
import DropdownComponent from '../components/Dropdown';
import {GetCompanies} from '../redux/actions/Action';
import ImagePickerComponent from '../components/ImagePickerComponent';

export default UpdateCompnayModel = ({data, isVisible, onClose}) => {
  let countriesList = useSelector(state => state.CountryReducers);
  countriesList = countriesList.flat();

  const dispatch = useDispatch();

  const [country, setCountry] = useState(data.country ? data.country._id : '');

  const [companyName, setCompnayName] = useState(data.name);

  const [companyLogo, setCompanyLogo] = useState('');

  const [isSubmitButtonEnable, setIsSubmitButtonEnable] = useState(true);

  const formData = new FormData();
  async function PostData() {
    setIsSubmitButtonEnable(false);
    ///////////// FormData //////////////
    formData.append('id', data._id);
    formData.append('name', companyName);
    formData.append('country', country);
    formData.append('image', companyLogo);
    try {
      let response = await axios.put(updateCompanyApi, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      if (response.status == 200) {
        ShowToast({
          type: 'success',
          text1: response.data.msg,
        });
        dispatch(GetCompanies());
        setCompnayName('');
        setCountry('');
        onClose();
      } else {
        ShowToast({
          type: 'error',
          text1: response.data.msg,
        });
      }
    } catch (error) {
      console.error('An error occurred:');
      ShowToast({
        type: 'error',
        text1: 'Error! Company Not Inserted Please Try Again',
      });
    } finally {
      setIsSubmitButtonEnable(true);
    }
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
        onRequestClose={onClose}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.closeIconContainer}>
              <Pressable
                onPress={() => {
                  onClose();
                }}>
                <Text style={styles.closeIcon}>X</Text>
              </Pressable>
            </View>
            <View style={styles.modelContent}>
              <View style={styles.container}>
                <ImagePickerComponent
                  onImageSelected={item => setCompanyLogo(item)}
                />
                <View style={styles.inputContainer}>
                  <Text style={styles.inputContainerLabel}>Name</Text>
                  <TextInput
                    style={styles.inputContainerInputFeild}
                    placeholderTextColor="gray"
                    placeholder="Dove etc"
                    value={companyName}
                    onChangeText={e => {
                      setCompnayName(e);
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
                          data: countriesList,
                          setValue: setCountry,
                          value: country,
                        }}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.btnContainer}>
                  <TouchableOpacity
                    onPress={PostData}
                    disabled={!isSubmitButtonEnable}>
                    {isSubmitButtonEnable ? (
                      <Text style={styles.btnText}>Submit</Text>
                    ) : (
                      <ActivityIndicator size="small" color={'#333'} />
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
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalView: {
    width: '80%',
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
