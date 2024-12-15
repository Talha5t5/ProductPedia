import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NewDashboard from '../screens/NewDashboard';
import Icon from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AddFeedback from '../screens/AddFeedback';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ShowFeedback from '../screens/ShowFeedback';
import AddQrProduct from '../screens/AddQrProduct';
import Explore from '../screens/Explore';
import ExploreCompany from '../screens/ExploreCompany';

const Tab = createBottomTabNavigator();

const TabNavigation = ({navigation}) => {
  const [role, setRole] = useState(false);
  async function checkRole() {
    const value = await AsyncStorage.getItem('role');
    if (value != null) {
      if (value == 'true') {
        setRole('true');
      } else {
        setRole('false');
      }
    } else {
      setRole('false');
    }
  }

  useEffect(() => {
    checkRole();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="NewDashboard"
      screenOptions={{
        tabBarStyle: {
          elevation: hp('5%'),
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      }}>
      <Tab.Screen
        name="NewDashboard"
        component={NewDashboard}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center'}}>
              <Icon
                name={'home'}
                size={23}
                color={focused ? 'orange' : 'black'}
                style={{elevation: hp('7%')}}
              />
              <Text
                style={{
                  color: focused ? 'orange' : 'black',
                  fontFamily: 'Roboto-Bold',
                  fontSize: 10,
                  elevation: hp('7%'),
                }}>
                Dashboard
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center'}}>
              <Material
                name={'compass'}
                size={23}
                color={focused ? 'orange' : 'black'}
              />
              <Text
                style={{
                  color: focused ? 'orange' : 'black',
                  fontFamily: 'Roboto-Bold',
                  fontSize: 10,
                }}>
                Explore
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="AddQrProduct"
        component={AddQrProduct}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          headerTitle: 'Barcode Scan',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()} // Navigate back when the arrow is pressed
              style={{marginLeft: 10}}>
              <Icon name="arrow-back" size={25} color="black" />
            </TouchableOpacity>
          ),
          tabBarShowLabel: false,
          tabBarStyle: {
            elevation: hp('5%'), // Set the elevation for the tab
          },
          tabBarIcon: ({focused}) => (
            <View style={styles.roundButton}>
              <Icon
                name={'barcode-sharp'}
                size={25}
                color={focused ? 'orange' : 'black'}
                style={{elevation: hp('7%')}}
              />
              <Text
                style={{
                  color: focused ? 'orange' : 'black',
                  fontFamily: 'Roboto-Bold',
                  fontSize: hp('1%'),
                  fontWeight: '600',
                  textAlign: 'center',
                  maxWidth: '80%',
                }}>
                Scan Product Barcode
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="ExploreCompany"
        component={ExploreCompany}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center'}}>
              <Icon
                name={'business-sharp'}
                size={23}
                color={focused ? 'orange' : 'black'}
              />
              <Text
                style={{
                  color: focused ? 'orange' : 'black',
                  fontFamily: 'Roboto-Bold',
                  fontSize: 10,
                }}>
                Companies
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="AddFeedback"
        component={role == 'true' ? ShowFeedback : AddFeedback}
        options={{
          headerShown: false,
          title: 'Feedback',
          tabBarShowLabel: false,
          headerStyle: {
            elevation: hp('5%'),
            borderColor: 'gray',
            shadowColor: 'gray',
            shadowOffset: {width: 0, height: hp('2%')}, // Adjust the shadow offset as needed
            shadowOpacity: 1,
            shadowRadius: hp('0.1%'),
          },
          headerLeft: () => (
            <Icon
              name={'arrow-back'}
              size={25}
              color={'black'}
              style={{marginLeft: wp('2%')}}
              onPress={() => navigation.navigate('NewDashboard')}
            />
          ),

          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center'}}>
              <Material
                name={'message-star'}
                size={23}
                color={focused ? 'orange' : 'black'}
              />
              <Text
                style={{
                  color: focused ? 'orange' : 'black',
                  fontFamily: 'Roboto-Bold',
                  fontSize: 10,
                }}>
                Feedback
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({
  roundButton: {
    alignItems: 'center',
    backgroundColor: '#fff',
    width: wp('16%'),
    height: hp('8%'),
    borderRadius: hp('17%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -hp('4%'),
    elevation: 10,
  },
});
