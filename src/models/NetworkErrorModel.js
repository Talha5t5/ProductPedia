import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';

const NetworkErrorModal = ({visible, onClose}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modelContent}>
          <View style={styles.section1}>
            <Icon name="signal-cellular-connected-no-internet-4-bar" color={'red'} size={80} />
            <Text style={styles.title}>No Internet</Text>
          </View>
          <View style={styles.section2}>
            <Text style={styles.text}>check your internet connection</Text>
          </View>
          <View style={styles.section3}>
            <TouchableOpacity
              style={{...styles.btn, backgroundColor: 'red'}}
              onPress={onClose}>
              <Text style={{...styles.btntext, fontWeight: '700'}}>
                TryAgain
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NetworkErrorModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modelContent: {
    width: wp('80%'),
    height: hp('30%'),
    backgroundColor: '#fff',
  },
  title: {
    marginTop: 15,
    fontSize: hp('3%'),
    color: '#333',
    fontFamily: 'Roboto',
  },
  text: {
    marginTop: 15,
    fontSize: hp('2%'),
    color: '#333',
  },
  btntext: {
    color: '#333',
    fontWeight: '400',
    fontSize: hp('2%'),
  },
  section1: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row'
  },
  section2: {
    flex: 1.5,
    alignItems: 'center',
  },
  section3: {
    flex: 1,
    flexDirection: 'row',
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
