import React from 'react';
import { Modal, Text, Pressable, View, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ip from '../assets/Ip';
import styles from '../styles/modalStyle';

const ProductModel = ({ props }) => {
  const { item, setProductModalVisible } = props; // Destructure props for simplicity
  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => setProductModalVisible(false)}
    >
      {item && (
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* Close button */}
            <View style={styles.closeIconContainer}>
              <Pressable onPress={() => setProductModalVisible(false)}>
                <Text style={styles.closeIcon}>✕</Text>
              </Pressable>
            </View>

            {/* Modal Content */}
            <View style={styles.modelContent}>
              <View style={styles.profileImageContainer}>
                {item.image && (
                  <Image
                    source={{ uri: `${Ip}/${item.image}` }}
                    style={{
                      width: wp('50%'),
                      height: hp('20%'),
                      borderRadius: 8,
                    }}
                  />
                )}
              </View>

              <View style={styles.discriptionContainer}>
                <Text style={styles.heading}>{item.name}</Text>
                <Text style={styles.line}>____________________________</Text>

                {/* Company details */}
                <View style={styles.companyDetailContainer}>
                  <View style={styles.companyDetailRow}>
                    <Text style={styles.label}>Company: </Text>
                    <Text style={styles.detail}>{item.company?.name || 'N/A'}</Text>
                  </View>
                  <View style={styles.companyDetailRow}>
                    <Text style={styles.label}>Country: </Text>
                    <Text style={styles.detail}>{item.company?.country?.name || 'N/A'}</Text>
                  </View>
                </View>

                {/* Product Description */}
                <Text style={styles.description}>Note: {item.description || 'No description available.'}</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </Modal>
  );
};

export default ProductModel;
