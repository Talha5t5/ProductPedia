import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function NewDisclaimer() {
  return (
    <LinearGradient
      colors={['#00ff87', '#60efff']}
      style={styles.linearGradient}
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 0.5}}>
      <Icon style={styles.alertIcon} name="alert-circle" />
      <Text style={styles.heading}>Disclamier</Text>
      <Text style={styles.body}>
        Our app categorizes products based on local and internet-available data.
        We neither engage in buying/selling nor endorse any products listed.
        Users are urged to use their judgment; the app provides information, but
        decisions to use or purchase are at the user's discretion. For any
        discrepancies found, please provide evidence with feedback. We will
        thoroughly review and rectify any inaccuracies.
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    marginHorizontal: 20,
    borderRadius: 17,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    textAlign: 'center',
    marginBottom: 15,
  },
  heading: {
    marginTop: 5,
    color: '#FFD700',
    borderRadius: 10,
    width: 'auto',
    // backgroundColor: '#0152ec',
    fontSize: 30,
    width: 170,
    paddingHorizontal: 12,
    paddingVertical: 5,
    fontWeight: '600',
    marginBottom: 10,
  },
  alertIcon: {
    textAlign: 'center',
    fontSize: 100,
    color: '#FFD700',
  },
  body: {
    color: Colors.primaryFontColor,
    fontSize: 14,
    textAlign: 'justify',
    marginVertical: 10,
  },
});
