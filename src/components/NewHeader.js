import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../assets/Colors';

export default function NewHeader({props, role, title}) {
  const navigation = useNavigation();
  let data = useSelector(state => state.getTempProductReducers);
  data = data.flat();
  return (
    <View style={styles.header}>
       <StatusBar
        backgroundColor={Colors.tomato}
        barStyle={'light-content'}
        translucent={true}
      />
      {role == 'true' ? (
        <TouchableOpacity
          onPress={async () => {
            try {
              await AsyncStorage.setItem('role', 'false');
            } catch (error) {
              console.log('getting error in logout', error);
            } finally {
              navigation.replace('TabNavigation');
            }
          }}>
          <Icon name="logout" color="#fff" size={30} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate('LoginUser')}>
          <Icon name="login" color="#fff" size={30} />
        </TouchableOpacity>
      )}
      <Text style={styles.headingText}>{title}</Text>
      {role == 'true' ? (
        <TouchableOpacity
          style={{position: 'relative'}}
          onPress={() => navigation.navigate('Notification')}>
          <Icon name="bell" size={hp('4%')} color={'#fff'} />
          {data.length != 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{data.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      ) : (
        <Text></Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4), // Use responsive width for padding
    height: hp(7), // Use responsive height
    width: '100%',
    alignItems: 'center',
    backgroundColor:Colors.tomato,
    elevation:hp('10%')
  },
  headingText: {
    fontSize: hp(2.5), // Use responsive font size
    fontWeight: '700',
    color: '#fff',
  },
  badge: {
    position: 'absolute',
    top: -hp(1), // Adjust based on responsive height
    right: -wp(1), // Adjust based on responsive width
    backgroundColor: 'red',
    borderRadius: wp('5%'), // Adjust based on responsive width
    width: wp('4%'), // Adjust based on responsive width
    height: wp('4%'), // Adjust based on responsive width
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: wp(3), // Use responsive font size
    fontWeight: 'bold',
  },
});
