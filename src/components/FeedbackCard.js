import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

export default function FeedbackCard({cardData}) {
  console.log(cardData);
  return (
    <View style={styles.card}>
      {cardData && (
        <View style={styles.details}>
          <Text style={styles.name}>{cardData.product}</Text>
          <View style={styles.discription}>
            <Text numberOfLines={2} style={styles.text}>
              {cardData.discription}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 12,
    marginVertical: 6,
    alignItems: 'center',
    elevation: 4,
    flexDirection: 'row',
  },
  details: {
    marginLeft: 10,
    flexDirection: 'column',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  discription: {
    marginTop: 7,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: 'black',
    paddingHorizontal: 2,
  },
});
