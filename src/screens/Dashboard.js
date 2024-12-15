import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import DashboardCard from '../components/DashboardCard';
import Header from '../components/Header';
import Colors from '../assets/Colors';
import Disclamier from '../components/Disclamier';
import AddCountry from './AddCountry';
import AddCompany from './AddCompany';
import {ScrollView} from 'react-native-gesture-handler';

export default function AdminDashboard(props) {
  const [role, setRole] = useState(props.route.params.role);
  function Navigator(params) {
    props.navigation.navigate(`${params}`);
  }

  async function LogoutFunc() {
    try {
      await AsyncStorage.setItem('role', 'false');
    } catch (error) {
      console.log('getting error in logout', error);
    } finally {
      props.navigation.replace('Dashboard', {role: 'false'});
    }
  }

  return (
    <View style={styles.container}>
      <Header headerText="Product Pedia" />
      <View style={styles.body}>
        <View style={styles.cardsRow}>
          <TouchableOpacity
            style={styles.cardItem}
            onPress={() => {
              Navigator('Explore');
            }}>
            <DashboardCard
              cardData={{
                iconName: 'explore',
                iconColor: Colors.primaryFontColor,
                textColor: Colors.primaryFontColor,
                text: 'Explore',
              }}
            />
          </TouchableOpacity>

          {role == 'true' ? (
            <TouchableOpacity
              style={styles.cardItem}
              onPress={() => {
                Navigator('ShowFeedback');
              }}>
              <DashboardCard
                cardData={{
                  iconName: 'feedback',
                  iconColor: Colors.primaryFontColor,
                  textColor: Colors.primaryFontColor,
                  text: 'Feedback',
                }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.cardItem}
              onPress={() => {
                Navigator('AddFeedback');
              }}>
              <DashboardCard
                cardData={{
                  iconName: 'feedback',
                  iconColor: Colors.primaryFontColor,
                  textColor: Colors.primaryFontColor,
                  text: 'Feedback',
                }}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.cardsRow}>
          {role == 'true' ? (
            <TouchableOpacity
              style={styles.cardItem}
              onPress={() => {
                Navigator('AddCompany');
              }}>
              <DashboardCard
                cardData={{
                  iconName: 'add_company',
                  iconColor: Colors.primaryFontColor,
                  textColor: Colors.primaryFontColor,
                  text: 'Add Company',
                }}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )}
          {role == 'false' ? (
            <>
              <TouchableOpacity
                style={styles.cardItem}
                onPress={() => {
                  Navigator('BarcodeScanner');
                }}>
                <DashboardCard
                  cardData={{
                    iconName: 'barcode',
                    iconColor: Colors.primaryFontColor,
                    textColor: Colors.primaryFontColor,
                    text: 'Scan Barcode',
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cardItem}
                onPress={() => {
                  Navigator('LoginUser');
                }}>
                <DashboardCard
                  cardData={{
                    iconName: 'admin',
                    iconColor: Colors.primaryFontColor,
                    textColor: Colors.primaryFontColor,
                    text: 'Login',
                  }}
                />
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={styles.cardItem}
              onPress={() => {
                Navigator('AddCountry');
              }}>
              <DashboardCard
                cardData={{
                  iconName: 'add_country',
                  iconColor: Colors.primaryFontColor,
                  textColor: Colors.primaryFontColor,
                  text: 'Add country',
                }}
              />
            </TouchableOpacity>
          )}
        </View>

        {role == 'true' ? (
          <>
            <View style={styles.cardsRow}>
              <TouchableOpacity
                style={styles.cardItem}
                onPress={() => {
                  Navigator('AddCategory');
                }}>
                <DashboardCard
                  cardData={{
                    iconName: 'category',
                    iconColor: Colors.primaryFontColor,
                    textColor: Colors.primaryFontColor,
                    text: 'Add Category',
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cardItem}
                onPress={() => {
                  Navigator('AddProduct');
                }}>
                <DashboardCard
                  cardData={{
                    iconName: 'add_product',
                    iconColor: Colors.primaryFontColor,
                    textColor: Colors.primaryFontColor,
                    text: 'Add Product',
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.cardsRow}>
              <TouchableOpacity style={styles.cardItem} onPress={LogoutFunc}>
                <DashboardCard
                  cardData={{
                    iconName: 'logout',
                    iconColor: Colors.primaryFontColor,
                    textColor: Colors.primaryFontColor,
                    text: 'Logout',
                  }}
                />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <Disclamier />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryBgColor,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },
  body: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  cardsRow: {
    marginTop: 20,
    width: '90%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  cardItem: {
    width: '45%',
  },
});
