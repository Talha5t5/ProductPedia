import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import axios from 'axios';

import {getFeedbacksApi} from '../redux/constants/Apis';
import FeedbackModel from '../models/FeedbackModel';
import FeedbackCard from '../components/FeedbackCard';
import Colors from '../assets/Colors';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function ShowFeedback({navigation}) {
  const dummyModelObj = {
    productImage: '',
    name: '',
    categoryId: {
      name: '',
      companyLogo: '',
    },
    companyId: {
      companyLogo: '',
      country: {
        name: '',
      },
    },
  };

  const [modelVisible, setModelVisible] = useState(false);
  const [modelData, setMedalData] = useState(dummyModelObj);
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const fetchData = async () => {
    try {
      const response = await axios.get(getFeedbacksApi);
      setFeedbacks(response.data);
      if (response.data.length == 0) {
        setIsEmpty(true);
      } else setIsEmpty(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView>
    <Header onPress={()=>navigation.goBack()} title={"Feedback"} height={hp('6%')}/>
      {modelVisible ? (
        <FeedbackModel visible={modelVisible} content={modelData}  close={()=> setModelVisible(false)}/>
      ) : null}
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.primaryFontColor} />
        ) : !isEmpty ? (
          <FlatList
            data={feedbacks}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => (
              <Text
                style={{
                  textAlign: 'center',
                  padding: 20,
                  color: Colors.primaryFontColor,
                  display: isEmpty ? 'flex' : 'none',
                }}>
                No Feedback Found
              </Text>
            )}
            renderItem={({item, index}) => (
              <Pressable
                onPress={() => {
                  setModelVisible(true);
                  setMedalData(item);
                }}>
                <FeedbackCard cardData={item} />
              </Pressable>
            )}
          />
        ) : (
          <Text
            style={{
              color: Colors.primaryFontColor,
              textAlign: 'center',
              margin: 20,
            }}>
            No Feedbacks Found
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Seashell,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },
  radioButtonContainer: {
    marginLeft: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerContainer: {
    margin: 10,
    borderWidth: 3,
    borderRadius: 10,
    borderColor: Colors.secondaryBgColor,
    color: Colors.primaryFontColor,
  },
  picker: {
    height: 50,
    color: Colors.primaryFontColor,
  },
  text: {
    color: 'black',
  },
});
