import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {AddCountries, GetCountries} from '../redux/actions/Action';
import styles from '../styles/formStyle';
import axios from 'axios';

import Colors from '../assets/Colors';
import ShowToast from '../components/ShowToast';
import Toast from 'react-native-toast-message';
import {postCountryApi} from '../redux/constants/Apis';

export default function AddCountry(props) {
  const dispatch = useDispatch();

  const [countryName, setCountryName] = useState('');
  const [isButtonEnable, setIsButtonEnable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  async function PostData() {
    setIsButtonEnable(false);
    setIsLoading(true);
    try {
      const obj = {
        name: countryName.trim(),
      };
      let response = await axios.post(postCountryApi, obj, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setIsLoading(false);
      if (response.status === 200) {
        ShowToast({
          type: 'success',
          text1: 'Country Inserted Successfully!',
        });
        console.log(response.data.data._id);
        // This will update countries data in store
        dispatch(
          AddCountries({
            _id: response.data.data._id,
            name: countryName,
          }),
        );
        setCountryName('');
        dispatch(GetCountries());
      } else {
        ShowToast({
          type: 'error',
          text1: 'Error! Country Not Inserted. Please Try Again',
        });
      }
    } catch (error) {
      setIsLoading(false);
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.msg === 'Country name already exists'
      ) {
        ShowToast({
          type: 'error',
          text1:
            'Error! Country name already exists. Please use a different name.',
        });
      } else {
        ShowToast({
          type: 'error',
          text1: 'An unexpected error occurred. Please try again.',
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
        <Text style={styles.inputContainerLabel}>Enter Country Name</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputContainerInputFeild}
            placeholderTextColor="gray"
            placeholder="United States etc."
            value={countryName}
            onChangeText={e => {
              setCountryName(e);
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
}
