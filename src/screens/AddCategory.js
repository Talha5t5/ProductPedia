import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ShowToast from '../components/ShowToast';
import Toast from 'react-native-toast-message';
import {postCountryApi} from '../redux/constants/Apis';
import Ip from '../assets/Ip';
import {useDispatch} from 'react-redux';
import {GetCategory} from '../redux/actions/Action';
import styles from '../styles/formStyle';
const AddCategory = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState('');
  const [isButtonEnable, setIsButtonEnable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  async function PostData() {
    setIsButtonEnable(false);
    setIsLoading(true);
    try {
      const obj = {
        name: category.trim(),
      };
      let response = await axios.post(`${Ip}/category/postcategory`, obj, {
        'Content-Type': 'application/json',
      });
      if (response.status == 200) {
        dispatch(GetCategory());
        ShowToast({
          type: 'success',
          text1: response.data.msg,
        });
        setIsLoading(false);
        setCategory('');
      } else {
        setIsLoading(false);
        ShowToast({
          type: 'error',
          text1: response.data.msg,
        });
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        // The request was made, but the server responded with a status code outside the range of 2xx
        if (
          error.response.status === 400 &&
          error.response.data.msg === 'Company already exists'
        ) {
          ShowToast({
            type: 'error',
            text1:
              'Error! Company already exists. Please use a different name.',
          });
        } else {
          ShowToast({
            type: 'error',
            text1: `Error! ${error.response.data.msg}`,
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
      setIsButtonEnable(true);
    }
  }

  return (
    <View>
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} backgroundColor={'black'} />
        <Text style={styles.inputContainerLabel}>Enter Category Name</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputContainerInputFeild}
            placeholderTextColor="gray"
            placeholder="Soap etc."
            value={category}
            onChangeText={e => {
              setCategory(e);
            }}
            keyboardType="default"
          />
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={PostData} disabled={!isButtonEnable}>
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
  );
};

export default AddCategory;
