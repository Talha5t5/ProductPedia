import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Colors from '../assets/Colors';
import Ip from '../assets/Ip';

export default function DashboardCard({cardData}) {
  const image = `${Ip}/images/${cardData.iconName}.png`;
  return (
    <View style={styles.cardContainer}>
      {cardData.iconName == 'barcode' ? (
        <Image source={require('../assets/icons/barcodeScan.png')} style={styles.icon} />
      ) : (
        <Image source={{uri: image}} style={styles.icon} />
      )}
      <Text style={[styles.cardText, {color: cardData.textColor}]}>
        {cardData.text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: Colors.secondaryBgColor,
    paddingVertical: 10,
    height: 110,
  },
  cardText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 18,
    textTransform: 'uppercase',
    paddingHorizontal: 5,
  },
  icon: {
    width: 45,
    height: 45,
  },
});
