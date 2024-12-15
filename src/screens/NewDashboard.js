import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import NewDashboardCard from '../components/NewDashboardCard';
import Icon from 'react-native-vector-icons/Feather';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import NewHeader from '../components/NewHeader';
import NewDisclaimer from '../components/NewDisclaimer';
import DisclamerModel from '../models/DisclamerModel';
import DrawerModel from '../models/DrawerModel';
import {useDispatch, useSelector} from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';
import CameraPermission from '../components/cameraPermission';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getCount} from '../apis/product';
import Colors from '../assets/Colors';
import {
  GetCategory,
  GetCompanies,
  GetCountries,
  GetTempProduct,
} from '../redux/actions/Action';
import VersionUpdateModal from '../models/VersionUpdateModal';
import {Linking} from 'react-native';

export default function NewDashboard({navigation}) {
  const dispatch = useDispatch();
  const [role, setRole] = useState(false);
  const [countData, setCountData] = useState('');
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);

  /////checkRole///////////////////////////////////////////////
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

  async function getAllCount() {
    const response = await getCount();
    setCountData(response);
  }

  useEffect(() => {
    checkRole();
    getAllCount();
  }, []);

  useEffect(() => {
    dispatch(GetCategory());
    dispatch(GetCompanies());
    dispatch(GetCountries());
    dispatch(GetTempProduct());
  }, []);

  ////////////////////////////////////////////////////////////////////////

  const [modelVisible, setModelVisible] = useState(true);
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    CameraPermission();
  }, []);

  const handleUpdate = () => {
    Linking.openURL(
      'https://play.google.com/store/apps/details?id=YOUR_APP_PACKAGE_NAME',
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        backgroundColor={Colors.tomato}
        barStyle={'light-content'}
        translucent={true}
      />

      <View style={styles.container}>
        {/* Header with zIndex to keep it above other elements */}
        <GestureHandlerRootView style={styles.headerContainer}>
          <NewHeader role={role} title={'ProductPedia'} />
        </GestureHandlerRootView>

        {/* Divider Line */}
        <View
          style={{
            width: wp('100%'),
            backgroundColor: Colors.tomato,
            alignItems: 'center',
            padding: 10,
          }}>
          <View
            style={{
              ...styles.line,
              width: '90%',
              backgroundColor: '#ff914d',
              height: 1,
            }}
          />
        </View>

        <View style={styles.section1}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionText}>Products</Text>
            <View style={styles.line} />
            <Text style={styles.sectionCount} numberOfLines={1}>
              {countData?.productCount}
            </Text>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionText}>Companies</Text>
            <View style={styles.line} />
            <Text style={styles.sectionCount} numberOfLines={1}>
              {countData?.companyCount}
            </Text>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionText}>Categories</Text>
            <View style={styles.line} />
            <Text style={styles.sectionCount} numberOfLines={1}>
              {countData?.categoryCount}
            </Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.flexContainer}>
            {/* Dashboard Cards */}
            <NewDashboardCard
              propsData={{
                bgColor: '#fff',
                color: '#4e9ec8',
                image: require('../assets/icons/dairy.png'),
                text: 'Explore',
                btn: 'false',
                onPress: () => {
                  navigation.navigate('Explore');
                },
              }}
            />
            <NewDashboardCard
              propsData={{
                bgColor: '#fff',
                color: '#21694c',
                image: require('../assets/icons/company.png'),
                text: 'Companies',
                btn: 'false',
                onPress: () => {
                  navigation.navigate('ExploreCompany');
                },
              }}
            />
            <NewDashboardCard
              propsData={{
                bgColor: '#fff',
                color: '#8973d9',
                image: require('../assets/icons/barcodeScan.png'),
                text: 'Scan Barcode',
                btn: 'false',
                onPress: () => {
                  navigation.navigate('AddQrProduct');
                },
              }}
            />
            {role == 'true' ? (
              <NewDashboardCard
                propsData={{
                  bgColor: '#fff',
                  color: '#21694c',
                  image: require('../assets/icons/feedback.png'),
                  text: 'Feedback',
                  onPress: () => {
                    navigation.navigate('ShowFeedback');
                  },
                }}
              />
            ) : (
              <NewDashboardCard
                propsData={{
                  bgColor: '#fff',
                  color: '#21694c',
                  image: require('../assets/icons/feedback.png'),
                  text: 'Feedback',
                  btn: 'false',
                  onPress: () => {
                    navigation.navigate('AddFeedback');
                  },
                }}
              />
            )}
            {role == 'true' ? (
              <>
                <NewDashboardCard
                  propsData={{
                    bgColor: '#fff',
                    color: '#deb974',
                    image: require('../assets/icons/country.png'),
                    text: 'Add country',
                    onPress: () => {
                      navigation.navigate('AddCountry');
                    },
                  }}
                />
                <NewDashboardCard
                  propsData={{
                    bgColor: '#fff',
                    color: '#459880',
                    image: require('../assets/icons/addCompany.png'),
                    text: 'Add Company',
                    onPress: () => {
                      navigation.navigate('AddCompany');
                    },
                  }}
                />
                <NewDashboardCard
                  propsData={{
                    bgColor: '#fff',
                    color: '#ca8c1e',
                    image: require('../assets/icons/addProduct.png'),
                    text: 'Add Product',
                    onPress: () => {
                      navigation.navigate('AddProduct');
                    },
                  }}
                />
                <NewDashboardCard
                  propsData={{
                    bgColor: '#fff',
                    color: '#459880',
                    icon: 'cart-plus',
                    text: 'Add Category',
                    onPress: () => {
                      navigation.navigate('AddCategory');
                    },
                  }}
                />
              </>
            ) : null}
          </View>
        </ScrollView>

        {/* Modals */}
        {modelVisible ? <DisclamerModel props={{setModelVisible}} /> : null}
        {drawerVisible ? (
          <DrawerModel props={{setDrawerVisible, role}} />
        ) : null}
        {modelVisible == false && (
          <VersionUpdateModal
            isVisible={isUpdateAvailable}
            onUpdatePress={handleUpdate}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5EE',
  },
  safeArea: {
    flex: 1,
  },
  headerContainer: {
    zIndex: 10, // Ensure the header is on top of other elements
  },
  flexContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  scrollContainer: {
    paddingVertical: 20,
  },
  section1: {
    width: wp('100%'),
    height: hp('15%'),
    backgroundColor: Colors.tomato,
    borderBottomLeftRadius: wp('15%'),
    borderBottomRightRadius: wp('15%'),
    flexDirection: 'row',
    gap: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionText: {
    color: '#fff',
    fontSize: hp('2%'),
  },
  sectionCount: {
    color: '#fff',
    fontSize: hp('2%'),
    fontWeight: '600',
  },
  sectionContainer: {
    flexDirection: 'column',
    width: '25%',
    alignItems: 'center',
    gap: 5,
  },
  line: {
    width: '100%',
    height: 4,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
});
