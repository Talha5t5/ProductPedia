import React, {useState, useEffect} from 'react';
import {Modal, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Colors from '../assets/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

export default DrawerModel = ({props}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType='fade'
        transparent={true}
        visible={true}
        onRequestClose={() => {
          props.setDrawerVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.closeIconContainer}>
              <TouchableOpacity
                onPress={() => {
                  props.setDrawerVisible(false);
                }}>
                <Icon style={styles.closeIcon} name="window-close" />
              </TouchableOpacity>
            </View>

            {props.role == 'true' ? (
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
                <View style={styles.modelContent}>
                  <View style={styles.modelBtn}>
                    <Text style={styles.btnText}>LogOut</Text>
                    <Icon style={styles.btnIcon} name="logout" />
                  </View>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  props.setDrawerVisible(false);
                  navigation.navigate('LoginUser');
                }}>
                <View style={styles.modelContent}>
                  <View style={styles.modelBtn}>
                    <Text style={styles.btnText}>LogIn</Text>
                    <Icon style={styles.btnIcon} name="login" />
                  </View>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  modalView: {
    width: '60%',
    height: '100%',
    backgroundColor: 'white',
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
    marginRight: 30,
    marginTop: 20,
  },
  closeIcon: {
    textAlign: 'right',
    fontSize: 30,
    color: 'gray',
  },
  modelContent: {
    marginHorizontal: 20,
    marginBottom: 10,
    marginBottom: 50,
  },
  modelBtn: {
    backgroundColor: '#c1c6fe',
    borderRadius: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  btnText: {
    color: '#8973d9',
    fontWeight: 'bold',
    fontSize: 18,
  },
  btnIcon: {
    color: '#8973d9',
    fontSize: 30,
  },
});
