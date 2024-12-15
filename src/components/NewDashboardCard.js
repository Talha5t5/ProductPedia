import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../assets/Colors';

export default function NewDashboardCard({propsData}) {
  return (
    <TouchableOpacity
      style={[styles.cardContainer, {backgroundColor: propsData.bgColor}]}
      onPress={propsData.onPress}>
      {propsData.icon ? (
        <Icon name={propsData.icon} color={propsData.color} size={40} />
      ) : (
        <Image
          source={propsData.image}
          style={{
            maxWidth: wp('20%'),
            maxHeight: wp('13%'),
            resizeMode: 'contain',
          }}
        />
      )}
      <Text style={styles.text}>{propsData.text}</Text>
      <View
        style={{
          height: hp('0.5%'),
          width: '80%',
          backgroundColor: 'orange',
          marginTop: hp('2%'),
          borderRadius: 5,
        }}></View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    margin: wp('2%'),
    width: wp('42%'),
    borderRadius: wp('5%'),
    padding: wp('4%'),
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('17%'),
    borderColor: 'gray',
    elevation: 10,
  },
  text: {
    color: Colors.primaryFontColor,
    fontSize: wp('4%'),
    textTransform: 'uppercase',
    marginTop: wp('2%'),
    textAlign: 'center',
  },
  btn: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: wp('3%'),
    width: wp('6%'),
    height: wp('6%'),
    left: wp('33%'),
    bottom: 0,
    top: hp('1%'),
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0)',
  },
  modalContent: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0,0.8)',
    padding: wp('4%'),
    borderRadius: wp('3%'),
    maxWidth: wp('60%'),
  },
});
