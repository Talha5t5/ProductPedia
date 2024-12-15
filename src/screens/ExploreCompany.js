import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../assets/Colors';
import Ip from '../assets/Ip';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import UpdateCompanyModal from '../models/UpdateCompanyModal';
import Header from '../components/Header';
import FilterModal from '../models/FilterModal';
import {SafeAreaView} from 'react-native-safe-area-context';
import CompanyDetail from '../models/showCompanyDetail';



const ExploreCompany = ({navigation}) => {
  const [companyModal, setCompanyModel] = useState(false);
  const [companyModalData, setCompnayModalData] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [filterOption, setFilterOption] = useState('company');
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]); // Store companyId and imageUri pairs
  const [showOptionMenu, setShowOptionMenu] = useState(false);
  const [isOptionMenuVisible, setIsOptionMenuVisible] = useState(false);
  const [modalData, setModalData] = useState('');

  let companiesList = useSelector(state => state.CompanyReducers).flat();

  const dispatch = useDispatch();

  const filteredCompanies = companiesList.filter(company => {
    if (filterOption === 'company') {
      return company.name.toLowerCase().includes(searchQuery.toLowerCase());
    } else if (filterOption === 'country') {
      return (
        company.country &&
        company.country.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    // Add additional conditions for other filter options if needed
  });

  useEffect(() => {
    checkRole();
  }, [navigation]);

  async function checkRole() {
    try {
      const value = await AsyncStorage.getItem('role');
      if (value != null) {
        if (value == 'true') {
          setShowOptionMenu(true);
        } else {
          setShowOptionMenu(false);
        }
      } else {
        setShowOptionMenu(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleModel = item => {
    setCompnayModalData(item);
    setCompanyModel(true);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.cardView} onPress={() => handleModel(item)}>
      {showOptionMenu ? (
        <View style={styles.option}>
          <TouchableOpacity
            onPress={() => {
              setModalData(item);
              setUpdateModalVisible(true);
            }}>
            <Icon name="edit" color={'#333'} size={20} />
          </TouchableOpacity>
        </View>
      ) : null}
      {item?.companyLogo && (
        <View style={styles.imageView}>
          <Image
            source={{uri: `${Ip}/${item.companyLogo}`}} // Use companyLogo as source if available
            style={{
              width: wp('50%'),
              height: hp('10%'),
              borderRadius: 15,
              resizeMode: 'contain',
            }}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
            onError={error => console.log('Image loading error:', error)}
          />
        </View>
      )}

      <View style={{flexDirection: 'column', marginLeft: wp('2%')}}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.countryName}>
          {item.country ? item.country.name : 'Unknown'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const applyFilter = () => {
    setModalVisible(false);
    // You can dispatch an action here to apply the filter if needed
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        onPress={() => navigation.navigate('NewDashboard')}
        title={'Company'}
        height={hp('10%')}
      />
      <StatusBar
        backgroundColor={Colors.tomato}
        translucent={true}
        barStyle={'light-content'}
      />
      <View style={{flexDirection: 'row', overflow: 'hidden', marginTop: -20}}>
        <View style={styles.searchInput}>
          <TextInput
            style={{width: '80%', color: '#333'}}
            placeholder={`Search by ${filterOption}`}
            placeholderTextColor={'gray'}
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
          />

          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => {
              // Toggle between 'company' and 'country' filter options
              setModalVisible(true);
            }}>
            <Icon name="filter" color={'#333'} size={hp('3%')} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filteredCompanies}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.list}
        style={{width: '100%'}}
        initialNumToRender={10} // Adjust as needed
      />

      {updateModalVisible && (
        <UpdateCompanyModal
          data={modalData}
          isVisible={updateModalVisible}
          onClose={() => setUpdateModalVisible(false)}
        />
      )}

      <FilterModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        applyFilter={applyFilter}
        filterOption={filterOption}
        setFilterOption={setFilterOption}
        PageType={'CompanySearch'}
      />

      <CompanyDetail
        isVisible={companyModal}
        onClose={() => setCompanyModel(false)}
        item={companyModalData}
      />
    </SafeAreaView>
  );
};

export default ExploreCompany;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Seashell,
  },
  searchInput: {
    height: hp('6%'),
    width: wp('80%'),
    color: '#333',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: hp('5%'),
    paddingHorizontal: wp('3%'),
    marginBottom: hp('1%'),
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  list: {
    paddingTop: hp('3%'),
    paddingBottom: hp('5%'),
    alignItems: 'center',
  },
  cardView: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: hp('1.5%'),
    marginBottom: hp('2%'),
    elevation: 4,
    width: wp('90%'),
  },
  name: {
    fontSize: hp('2%'),
    fontWeight: '400',
    color: 'black',
    marginBottom: hp('1%'),
    maxWidth: wp('60%'),
  },
  countryName: {
    fontSize: hp('2%'),
    color: Colors.secondaryBgColor,
    marginBottom: hp('1%'),
  },
  selectedOption: {
    fontSize: hp('2%'),
    marginBottom: 10,
    fontWeight: 'bold',
    color: 'blue',
  },
  applyButton: {
    fontSize: hp('1.5%'),
    marginTop: 20,
    color: 'blue',
  },
  imageView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('25%'),
    height: hp('10%'),
    overflow: 'hidden',
    marginRight: hp('1%'),
    elevation: 3,
    borderRadius: 20,
    backgroundColor: '#fff', // Cut off any overflow content
  },
  loader: {
    position: 'absolute', // Position loader inside imageView
    top: '50%', // Center loader vertically
    left: '50%', // Center loader horizontally
    transform: [{translateX: -12}, {translateY: -12}], // Center loader precisely
  },
  option: {
    position: 'absolute',
    right: wp('2%'),
    top: hp('1.2%'),
  },
  optionIcon: {
    position: 'absolute',
    right: wp('0.8%'),
    top: hp('1%'),
    width: wp('6%'),
    height: wp('5.5%'),
  },
  optionMenu: {
    zIndex: 10,
    borderRadius: wp('0.5%'),
    right: wp('1.5%'),
    paddingVertical: hp('0.4%'),
    paddingHorizontal: wp('1%'),
    backgroundColor: 'white',
    elevation: 0.4,
  },
  optionRow: {
    paddingHorizontal: wp('0.5%'),
    paddingVertical: hp('0.3%'),
  },
  optionText: {
    color: 'black',
    fontSize: hp('1.8%'),
  },
  filterButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButtonText: {
    color: '#333',
    fontSize: 5,
  },
});
