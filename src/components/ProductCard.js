import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import axios from 'axios';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {useNavigation} from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {UpdateProductsModelData} from '../redux/actions/Action';

import {useSelector, useDispatch} from 'react-redux';
import {deleteproductApi} from '../redux/constants/Apis';
import Ip from '../assets/Ip';
import Colors from '../assets/Colors';

export default function ProductCard({cardData}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [showOptionMenu, setShowOptionMenu] = useState(true);
  const [isOptionMenuVisible, setIsOptionMenuVisible] = useState(false);

  async function checkRole() {
    try {
      const value = await AsyncStorage.getItem('role');
      if (value != null) {
        if (value == 'true') {
          setShowOptionMenu(true);
        } else {
          setShowOptionMenu(false);
        }
      } else {
        setShowOptionMenu(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkRole();
  }, [navigation]);

  async function DeleteProduct() {
    try {
      let response = await axios.delete(
        `${deleteproductApi}/${cardData.item._id}`,
      );
      if (response.status === 200) {
        Alert.alert('', response.data.msg, [
          {
            text: 'Ok',
            style: 'cancel',
          },
        ]);
      } else {
        Alert.alert('', response.data.msg, [
          {
            text: 'Ok',
            style: 'cancel',
          },
        ]);
      }
    } catch (error) {
      console.log('error in axios delete', error);
      Alert.alert('', 'Error In Deleting Product', [
        {
          text: 'Ok',
          style: 'cancel',
        },
      ]);
    }
  }

  return (
    <View style={styles.card}>
      {showOptionMenu ? (
        <View style={styles.option}>
          <TouchableOpacity
            onPress={() => {
              setIsOptionMenuVisible(!isOptionMenuVisible);
            }}>
            <Image
              style={styles.optionIcon}
              source={require('../assets/icons/menu.png')}
            />
          </TouchableOpacity>
          {isOptionMenuVisible ? (
            <View style={styles.optionMenu}>
              <TouchableOpacity
                style={styles.optionRow}
                onPress={() => {
                  setIsOptionMenuVisible(false);
                  dispatch(UpdateProductsModelData(cardData.item));
                  cardData.setIsUpdateModelVisible(true);
                }}>
                <Text style={styles.optionText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionRow}
                onPress={() => {
                  setIsOptionMenuVisible(false);
                  Alert.alert(
                    'Are You Sure?',
                    'Do you really want to delete Product?',
                    [
                      {
                        text: 'No',
                        style: 'cancel',
                      },
                      {
                        text: 'Yes',
                        onPress: () => {
                          DeleteProduct();
                        },
                      },
                    ],
                  );
                }}>
                <Text style={styles.optionText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      ) : null}

      <View style={styles.details}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: wp('25%'),
            height: hp('10%'),
            overflow: 'hidden',
            marginRight: hp('1%'),
            elevation: 3,
            borderRadius: 20,
            backgroundColor: '#fff',
          }}>
          {cardData?.item?.image ? (
            <Image
              source={{uri: `${Ip}/${cardData?.item?.image}`}}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'cover',
              }}
              onError={error => console.log('Image loading error:', error)}
            />
          ) : (
            <View style={styles.noImageContainer}>
              <Text style={styles.noImageText}>No image</Text>
            </View>
          )}
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            maxWidth: wp('65%'),
          }}>
          <Text style={styles.name} numberOfLines={1}>
            {cardData.item.name}
          </Text>
          <View style={styles.discription}>
            <Text style={styles.text} numberOfLines={1}>
              {cardData.item.company.name}
            </Text>
            <Text style={styles.text}>|</Text>
            <Text style={styles.text}>
              {cardData.item.company.country
                ? cardData.item.company.country.name
                : 'N/A'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: wp('2%'),
    padding: wp('1%'),
    marginHorizontal: wp('2%'),
    marginVertical: hp('1%'),
    alignItems: 'center',
    elevation: 4,
    flexDirection: 'row',
    minHeight: hp('12%'),
  },
  profileImage: {
    width: wp('25%'),
    height: wp('25%'),
    borderRadius: wp('3%'),
    resizeMode: 'contain',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  name: {
    fontSize: hp('2%'),
    fontWeight: '600',
    color: 'black',
    flexWrap: 'wrap',
    maxWidth: wp('60%'),
  },
  discription: {
    marginTop: hp('0.7%'),
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: wp('60%'),
    marginBottom: hp('0.5%'),
  },
  text: {
    fontSize: hp('1.8%'),
    color: 'black',
    paddingHorizontal: hp('0.5%'),
    maxWidth: wp('55%'),
  },
  option: {
    position: 'absolute',
    right: wp('1.5%'),
    top: hp('1%'),
  },
  optionIcon: {
    position: 'absolute',
    right: wp('0.8%'),
    top: hp('1%'),
    width: wp('6%'),
    height: wp('5.5%'),
  },
  optionMenu: {
    zIndex: 10,
    borderRadius: wp('2%'),
    right: wp('5.5%'),
    top: hp('2%'),
    gap: 3,
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('2%'),
    backgroundColor: Colors.Seashell,
    elevation: 5,
  },
  optionRow: {
    paddingHorizontal: wp('0.5%'),
    paddingVertical: hp('0.3%'),
  },
  optionText: {
    color: 'black',
    fontSize: hp('1.8%'),
  },
  noImageContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    opacity:0.5
  },
  noImageText: {
    color: '#888', // Change the color as needed
    fontSize: 16, // Adjust the font size as needed
    fontStyle: 'italic', // Optional: add italics or other styles
  },
});
