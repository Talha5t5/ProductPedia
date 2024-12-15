import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Keyboard,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';
import {postCompanyApi} from '../redux/constants/Apis';
import Colors from '../assets/Colors';
import ShowToast from '../components/ShowToast';
import Toast from 'react-native-toast-message';
import DropdownComponent from '../components/Dropdown';
import axios from 'axios';
import {GetCompanies} from '../redux/actions/Action';
import ImagePickerComponent from '../components/ImagePickerComponent';
import styles from '../styles/formStyle';
import {useNavigation} from '@react-navigation/native';
export default function AddCompany(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  let countriesList = useSelector(state => state.CountryReducers);
  countriesList = countriesList.flat();
  const [selectedPickerItem, setSelectedPickerItem] = useState({});
  const [companyLogo, setCompanyLogo] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyDiscription, setCompanyDiscription] = useState('');
  const [isSubmitButtonEnable, setIsSubmitButtonEnable] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // New state for activity indicator
  const formData = new FormData();
  async function PostData() {
    setIsSubmitButtonEnable(false);
    setIsLoading(true);
    Keyboard.dismiss();

    ///// form data ////
    formData.append('name', companyName.trim());
    formData.append('discription', companyDiscription.trim());
    formData.append('country', selectedPickerItem._id);
    formData.append('image', companyLogo);
    ///////////////////////////////////////////

    try {
      let response = await axios.post(postCompanyApi, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        ShowToast({
          type: 'success',
          text1: 'Company Inserted Successfully!',
        });
        dispatch(GetCompanies());
        setCompanyName('');
        setCompanyDiscription(''); // Corrected the typo here
        setSelectedPickerItem('');
        setTimeout(() => {
          navigation.navigate('ExploreCompany');
        }, 2000);
      } else {
        ShowToast({
          type: 'error',
          text1: response.data.msg,
        });
      }
    } catch (error) {
      if (error.response) {
        // The request was made, but the server responded with a status code outside the range of 2xx
        if (error.response.status === 400 && error.response.data.msg) {
          ShowToast({
            type: 'error',
            text1: `Error! ${error.response.data.msg}.`,
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
      setIsSubmitButtonEnable(true);
      setIsLoading(false); // Hide activity indicator
    }
  }

  return (
    <View>
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} backgroundColor={'black'} />
        <ImagePickerComponent onImageSelected={item => setCompanyLogo(item)} />
        <Text style={styles.inputContainerLabel}>Company Name</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputContainerInputFeild}
            placeholderTextColor="gray"
            placeholder="Uniliver etc."
            value={companyName}
            onChangeText={e => {
              setCompanyName(e);
            }}
            keyboardType="default"
          />
        </View>
        <Text style={styles.inputContainerLabel}>Discription</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputContainerInputFeild}
            placeholderTextColor="gray"
            placeholder="About Company"
            value={companyDiscription}
            onChangeText={e => {
              setCompanyDiscription(e);
            }}
            keyboardType="default"
            multiline={true}
          />
        </View>
        <Text style={styles.inputContainerLabel}>Country</Text>
        <View style={styles.inputContainer}>
          <View style={styles.pickerWrapper}>
            <View style={styles.pickerContainer}>
              <DropdownComponent
                propsData={{
                  data: countriesList,
                  setValue: setSelectedPickerItem,
                  value: selectedPickerItem,
                }}
              />
            </View>
          </View>
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={PostData} disabled={!isSubmitButtonEnable}>
            {/* Conditional rendering of activity indicator */}
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
