import {StyleSheet, Text, View, Image} from 'react-native';

import Colors from '../assets/Colors';
import Icon from '../assets/errorIcon.png'

export default function Disclamier() {
  return (
      <View style={styles.disclamierContainer}>
      <Image source={Icon} style={styles.img} />
        <Text style={styles.heading}>Legal Disclamier</Text>
        <Text style={styles.body}>Our app categorizes products based on local and internet-available data. We neither engage in buying/selling nor endorse any products listed. Users are urged to use their judgment; the app provides information, but decisions to use or purchase are at the user's discretion. For any discrepancies found, please provide evidence with feedback. We will thoroughly review and rectify any inaccuracies.</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  disclamierContainer: {
    marginHorizontal: 15,
    marginTop: 40,
    marginBottom: 7,
    backgroundColor: "white",
    elevation: 2,
    padding: 10,
    borderRadius: 10,
    alignItems : "center"
  },
  img: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  heading: {
    color: Colors.secondaryBgColor,
    // color: "#FFCA28",
    fontWeight: "700",
    fontSize: 30,
    marginVertical: 7,
  },
  body: {
    textAlign: "justify",
    marginVertical: 10,
    marginHorizontal: 3,
    color: Colors.primaryFontColor,
    lineHeight: 20,
    fontSize: 14,
  },
});
