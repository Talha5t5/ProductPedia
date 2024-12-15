import React, {useState} from 'react';
import {Modal, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Colors from '../assets/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default DisclamierModel = ({props}) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={() => {
          props.setModelVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modelContent}>
              <Icon style={styles.alertIcon} name="alert-circle" />
              <Text style={styles.heading}>Disclamier</Text>
              <Text style={styles.body}>
                Our app categorizes products based on local and
                internet-available data. We neither engage in buying/selling nor
                endorse any products listed. Users are urged to use their
                judgment; the app provides information, but decisions to use or
                purchase are at the user's discretion. For any discrepancies
                found, please provide evidence with feedback. We will thoroughly
                review and rectify any inaccuracies.
              </Text>
              <View style={styles.closeIconContainer}>
                <TouchableOpacity
                  onPress={() => {
                    props.setModelVisible(false);
                  }}
                  style={styles.button}>
                  <Text style={styles.closeIcon}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  modalView: {
    width: wp('80%'),
    minHeight: hp('55%'),
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'space-between',
  },
  closeIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: hp('3%'),
    color: Colors.white,
  },
  modelContent: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
  alertIcon: {
    textAlign: 'center',
    fontSize: hp('12%'),
    color: '#FFD700',
  },
  heading: {
    marginTop: 5,
    borderRadius: 10,
    color: '#FFD700',
    fontSize: hp('3.5%'),
    textAlign: 'center',
    fontWeight: '600',
  },
  body: {
    color: Colors.primaryFontColor,
    fontSize: hp('2%'),
    textAlign: 'justify',
    marginVertical: 10,
  },
  button: {
    width: wp('30%'),
    height: hp('6%'),
    borderRadius: 20,
    backgroundColor: 'rgba(255, 99, 71, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
