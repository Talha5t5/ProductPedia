import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from '../assets/Colors';

export default function BarcodeScanner() {
  return (
    <View style={styles.container}>
      <Text style={styles.comingSoon}>Coming Soon!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  comingSoon: {
    color: Colors.primaryFontColor,
    fontSize: 18,
    fontWeight: '600',
  },
});
