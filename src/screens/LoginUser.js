import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {CommonActions} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Header from '../components/Header';
import Colors from '../assets/Colors';
import ShowToast from '../components/ShowToast';
import Toast from 'react-native-toast-message';
import {loginApi} from '../redux/constants/Apis';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function LoginUser(props) {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isButtonEnable, setIsButtonEnable] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // New state for activity indicator

  async function PostData() {
    setIsButtonEnable(false);
    setIsLoading(true); // Show activity indicator
    try {
      const obj = {
        email: userEmail,
        password: userPassword,
      };
      let response = await axios.post(loginApi, obj, {
        'Content-Type': 'application/json',
      });
      if (response.status == 200) {
        response = response.data;
        if (response.responseCode == 200) {
          await AsyncStorage.setItem('role', 'true');
          ShowToast({
            type: 'success',
            text1: response.msg,
          });
          setTimeout(() => {
            props.navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'TabNavigation'}],
              }),
            );
          }, 500);
        } else {
          ShowToast({
            type: 'error', // 'success', 'error', 'info', 'warn', 'custom'
            text1: response.msg,
            navigation: props.navigation,
          });
        }
      } else {
        console.error(
          'POST request failed:',
          response.status,
          response.statusText,
        );
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setIsButtonEnable(true);
      setIsLoading(false); // Hide activity indicator
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <Header
        title="Login User"
        height={'6%'}
        onPress={() => props.navigation.goBack()}
      /> */}
      <View style={styles.container}>
        <Text style={styles.label}>LOGIN</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputContainerLabel}>Email</Text>
          <TextInput
            style={styles.inputContainerInputFeild}
            placeholderTextColor="gray"
            placeholder="example@xyz.com"
            onChangeText={e => {
              setUserEmail(e);
            }}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputContainerLabel}>Password</Text>
          <TextInput
            style={styles.inputContainerInputFeild}
            placeholderTextColor="gray"
            placeholder="Zx23he.@7"
            onChangeText={e => {
              setUserPassword(e);
            }}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={PostData} disabled={!isButtonEnable}>
            {/* Conditional rendering of activity indicator */}
            {isLoading ? (
              <ActivityIndicator size="small" color={'#333'} />
            ) : (
              <Text style={styles.btnText}>Login</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryBgColor,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  inputContainer: {
    flexDirection: 'column',
    marginHorizontal: 20,
    marginTop: 10,
  },
  inputContainerLabel: {
    fontSize: 16,
    color: Colors.primaryFontColor,
    width: '40%',
    marginBottom: hp('0.5%'),
    fontFamily: 'Roboto-Bold',
    fontWeight: '600',
  },
  inputContainerInputFeild: {
    fontSize: 16,
    width: wp('80%'),
    borderWidth: 2,
    color: Colors.primaryFontColor,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: wp('1%'),
    borderColor: '#333',
  },
  btnContainer: {
    marginTop: hp('2%'),
    alignItems: 'center',
  },
  btnText: {
    backgroundColor: Colors.tomato,
    color: Colors.secondaryFontColor,
    fontWeight: 'bold',
    borderRadius: wp('1%'),
    fontSize: 20,
    paddingVertical: 10,
    textAlign: 'center',
    width: wp('80%'),
  },
  label: {
    fontSize: hp('3%'),
    color: 'gray',
    alignSelf: 'center',
    fontWeight: '700',
  },
});
