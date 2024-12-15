import React from 'react';
import {Modal, StyleSheet, Text, Pressable, View, Image} from 'react-native';
import Colors from '../assets/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ip from '../assets/Ip';
import styles from '../styles/modalStyle';

const CompanyDetail = ({isVisible, onClose, item}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => onClose()}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.closeIconContainer}>
            <Pressable
              onPress={() => {
                onClose();
              }}>
              <Text style={styles.closeIcon}>X</Text>
            </Pressable>
          </View>
          <View style={styles.modelContent}>
            <View style={styles.profileImageContainer}>
              {/* {barValue && (
                    <Barcode value={props.item.barcode} format="CODE128" />
                  )} */}
              {item?.companyLogo ? (
                <Image
                  source={{uri: `${Ip}/${item?.companyLogo}`}}
                  style={{
                    width: wp('50%'),
                    height: hp('20%'),
                    borderRadius: 8,
                  }}
                />
              ) : null}
              {/* <Text style={styles.barcodeNumber}>{props.item.barcode}</Text> */}
            </View>
            <View style={styles.discriptionContainer}>
              <Text style={styles.heading}>{item.name}</Text>

              <Text style={styles.line}>____________________________</Text>
              <View style={styles.companyDetailContainer}>
                <View style={styles.companyDetailRow}>
                  <Text style={styles.label}>Country: </Text>
                  <Text style={styles.detail}>
                    {item.country ? item.country.name : 'Unknown'}
                  </Text>
                </View>
              </View>
              <Text style={styles.discription}>Note: {item?.discription}</Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CompanyDetail;
