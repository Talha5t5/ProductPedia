import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {StyleSheet, TouchableOpacity} from 'react-native';
import DropdownComponent from '../components/Dropdown';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {useSelector} from 'react-redux';

import axios from 'axios';

import Colors from '../assets/Colors';
import ShowToast from '../components/ShowToast';
import Toast from 'react-native-toast-message';
import {postFeedbackApi} from '../redux/constants/Apis';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/Header';

export default function AddFeedback({navigation}) {
  const companiesList = useSelector(state => state.CompanyReducers).flat();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [reference, setReference] = useState('');
  const [discription, setDiscription] = useState('');
  const [isSubmitButtonEnable, setIsSubmitButtonEnable] = useState(true);
  const [products, setProducts] = useState('');
  const [company, setCompany] = useState('');
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [textInputHeight, setTextInputHeight] = useState(hp('5%'));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardOpen(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardOpen(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  async function PostData() {
    if (
      name === '' ||
      phone === '' ||
      products === '' ||
      discription === '' ||
      reference === ''
    ) {
      ShowToast({
        type: 'error',
        text1: 'Please Fill All Fields!',
      });
    } else {
      setLoading(true);
      try {
        const obj = {
          name: name.trim(),
          email: email.trim(),
          phoneNo: phone.trim(),
          product: products.trim(),
          company: company._id,
          reference: reference.trim(),
          discription: discription.trim(),
        };
        let response = await axios.post(postFeedbackApi, obj, {
          'Content-Type': 'application/json',
        });
        if (response.status === 200) {
          setLoading(false);
          Alert.alert('Thanks for your Feedback!');
          setName('');
          setEmail('');
          setPhone('');
          setProducts(''), setCompany(''), setReference('');
          setDiscription('');
        } else {
          ShowToast({
            type: 'error',
            text1: 'Error! Company Not Inserted Please Try Again',
          });
        }
      } catch (error) {
        console.error('An error occurred:', error);
      } finally {
        setIsSubmitButtonEnable(true);
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior={'height'}>
      <SafeAreaView>
      <Header
        onPress={() => navigation.goBack()}
        height={'5%'}
        title={'Feedback'}
      />
      <View
        style={{
          height: hp('100%'),
          alignItems: 'center',
          flexDirection: 'column',
          backgroundColor: '#FFF5EE',
        }}>
        {isKeyboardOpen ? null : (
          <SafeAreaView>
            <LinearGradient
              start={{x: 0.0, y: 0.5}}
              end={{x: 0.6, y: 1.0}}
              location={[0, 1]}
              colors={['#ff914d', '#ff3131']}
              style={{
                height: hp('20%'),
                width: wp('80%'),
                borderRadius: wp('5%'),
                alignItems: 'center',
              }}>
              <Image
                source={require('../assets/splashImage.png')}
                style={{
                  width: wp('55%'),
                  height: hp('17%'),
                  resizeMode: 'contain',
                  marginTop: -8,
                }}
              />
              <Text
                style={{
                  color: '#fff',
                  marginTop: -23,
                  maxWidth: '80%',
                  textAlign: 'center',
                }}>
                Please provide your feedback.If you find any thing wrong.
              </Text>
            </LinearGradient>
          </SafeAreaView>
        )}
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputContainerInputFeild}
              placeholderTextColor="gray"
              placeholder="Your Name"
              value={name}
              onChangeText={e => {
                setName(e);
              }}
              keyboardType="default"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputContainerInputFeild}
              placeholderTextColor="gray"
              placeholder="Email"
              value={email}
              onChangeText={e => {
                setEmail(e);
              }}
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputContainerInputFeild}
              placeholderTextColor="gray"
              placeholder="03xxxxx"
              value={phone}
              onChangeText={e => {
                setPhone(e);
              }}
              keyboardType="number-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputContainerInputFeild}
              placeholderTextColor="gray"
              placeholder="Prodcut Name"
              value={products}
              onChangeText={e => {
                setProducts(e);
              }}
              keyboardType="default"
            />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.pickerWrapper}>
              <View style={styles.pickerContainer}>
                <DropdownComponent
                  propsData={{
                    data: companiesList,
                    value: company,
                    setValue: setCompany,
                    dropdownLabel: 'Select Company',
                  }}
                />
              </View>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputContainerInputFeild}
              placeholderTextColor="gray"
              placeholder="Where did you find this prodcut"
              value={reference}
              onChangeText={e => {
                setReference(e);
              }}
              keyboardType="default"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.inputContainerInputFeild,
                {minHeight: textInputHeight},
              ]}
              placeholderTextColor="gray"
              placeholder="What do you suggest regarding this product to change"
              value={discription}
              onChangeText={e => {
                setDiscription(e);
              }}
              multiline
              keyboardType="default"
              numberOfLines={null}
              onContentSizeChange={event => {
                const {height} = event.nativeEvent.contentSize;
                if (height < hp('6%')) {
                  setTextInputHeight(hp('6%'));
                } else {
                  setTextInputHeight(height);
                }
              }}
            />
          </View>

          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={() => PostData()}>
              {loading ? (
                <ActivityIndicator color="blue" size="small" />
              ) : (
                <Text style={styles.btnText}>Submit</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <Toast />
      </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Seashell,
    width: wp('100%'),
    flexDirection: 'column',
    height: hp('60%'),
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: hp('2%'),
  },
  inputContainerInputFeild: {
    fontSize: 16,
    width: wp('80%'),
    height: hp('5%'),
    borderWidth: 2,
    color: Colors.primaryFontColor,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: wp('1%'),
    borderColor: Colors.primaryFontColor,
  },
  btnContainer: {
    marginTop: hp('2%'),
    alignItems: 'center',
  },
  btnText: {
    backgroundColor: '#ff3131',
    color: Colors.secondaryFontColor,
    fontWeight: 'bold',
    borderRadius: wp('1%'),
    fontSize: 20,
    paddingVertical: 10,
    textAlign: 'center',
    width: wp('80%'),
  },
  pickerWrapper: {
    width: wp('80%'),
    height: 40,
    paddingVertical: 4,
    justifyContent: 'center',
  },
  pickerContainer: {
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: wp('1%'),
    width: '100%',
    borderColor: Colors.primaryFontColor,
    color: Colors.primaryFontColor,
  },
});
