import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../assets/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function Header({onPress, width, height, title}) {
  return (
    <View
      style={{
        width: width ? width : '100%',
        height: height ? height : '10%',
        flexDirection: 'row',
        backgroundColor:Colors.tomato
      }}>
      <TouchableOpacity onPress={onPress}>
        <Icon name="arrow-left" size={hp('4%')} color={'#fff'} />
      </TouchableOpacity>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '20%',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'contain',
  },
  headerText: {
    textAlign: 'center',
    fontSize: hp('3%'),
    color: '#fff',
    fontWeight: 'bold',
    flex: 1, // Added flex: 1 to allow text to expand to center vertically
    justifyContent: 'center', // Center text vertically
    alignItems: 'center',
  },
});
