import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Pressable,
  StatusBar,
} from 'react-native';
import DropdownComponent from '../components/Dropdown';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../assets/Colors';
import {
  fetchData,
  fetchDataClear,
  fetchfilterData,
} from '../redux/actions/Action';
import ProductCard from '../components/ProductCard';
import UpdateProductModel from '../models/UpdateProductModel';
import ProductModel from '../models/ProductModel';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import FilterModal from '../models/FilterModal';
import { FETCH_DATA } from '../redux/constants/Constants';

export default function Explore() {
  const navigation = useNavigation();
  const [isLoadingCount, setLoadingCount] = useState(false);

  let companiesList = useSelector(state => state.CompanyReducers);
  companiesList = companiesList.flat();
  let countriesList = useSelector(state => state.CountryReducers);
  countriesList = countriesList.flat();
  let categoryList = useSelector(state => state.CategoryReducers);
  categoryList = categoryList.flat();
  const { data, totalPages, totalDataCount, dataLength, loading } = useSelector(
    state => state.getAllProductReducers,
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [productmodelVisible, setProductModelVisible] = useState(false);
  const [filterOption, setFilterOption] = useState('category');
  const [isUpdateModelVisible, setIsUpdateModelVisible] = useState(false);
  const [modalData, setModalData] = useState('');
  const [page, setPage] = useState(1);
  const [renderedCount, setRenderCount] = useState(0);
  const [showToogle, setShowToggle] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const dispatch = useDispatch();

  let result = data.flat();

  const handleDropdownChange = value => {
    setRenderCount(0);
    dispatch(fetchDataClear());
    setPage(1);
    setSearchQuery(value);
  };

  useEffect(() => {
    dispatch({ type: FETCH_DATA });
    dispatch(fetchDataClear());
    setRenderCount(0);
    if (searchQuery != '') {
      dispatch(fetchfilterData(page, 100, filterOption, searchQuery._id));
    } else {
      dispatch(fetchData(page, 100));
    }
  }, [searchQuery, filterOption]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      setRenderCount(0);
      if (filterOption && searchQuery) {
        dispatch(fetchfilterData(page + 1, 100, filterOption, searchQuery._id));
        setPage(page + 1);
      } else {
        dispatch(fetchData(page + 1, 100));
        setPage(page + 1);
      }
    }
  };

  const renderLoadingMessage = () => {
    setLoadingCount(true);
    let count;
    setTimeout(() => {
      count = page * 100;
      if (count > totalDataCount) {
        count = totalDataCount;
        setShowToggle(true);
      }
      if (dataLength < 100 && page === totalPages) {
        count = (page - 1) * 100 + dataLength;
      }

      setRenderCount(count);
      setLoadingCount(false);
    }, 2000);
  };

  useEffect(() => {
    renderLoadingMessage();
  }, [loading]);

  const applyFilter = item => {
    setSearchQuery('');
    setFilterOption(item);
    setModalVisible(false);

    setRenderCount(0);
    setPage(1);
    dispatch(fetchDataClear());
  };

  const handleBackPress = () => {
    dispatch(fetchDataClear());
    setPage(1);
  };

  const handleOnPress = item => {
    setModalData(item);
    setProductModelVisible(true);
  };

  const handleRefresh = () => {
    setIsUpdateModelVisible(false);
    dispatch(fetchDataClear());
    setPage(1);
    if (searchQuery !== '') {
      dispatch(fetchfilterData(1, 100, filterOption, searchQuery._id));
    } else {
      dispatch(fetchData(1, 100));
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    dispatch(fetchDataClear());
    setLoadingCount(true);
    setRenderCount(0);
    setPage(1);
  };

  /// Render Flatlist data
  const renderItem = ({ item }) => (
    <Pressable onPress={() => handleOnPress(item)}>
      <ProductCard
        cardData={{ item, setIsUpdateModelVisible: setIsUpdateModelVisible }}
      />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={Colors.tomato}
        barStyle={'light-content'}
      />
      <View style={styles.section1}>
        <LinearGradient
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 0.5, y: 1.0 }}
          location={[0, 1]}
          colors={[Colors.tomato, Colors.tomato]}
          style={styles.sectionBody1}>
          <SafeAreaView style={styles.safeArea}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.navigate('NewDashboard')}>
              <Icon name="arrow-left" color={'#fff'} size={hp('3%')} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Products</Text>
            <TouchableOpacity style={styles.filterButton}></TouchableOpacity>
          </SafeAreaView>
        </LinearGradient>
        <View style={styles.sectionBody2}>
          <View style={styles.headerCard}>
            <View style={styles.headerCardItem}>
              {loading ? (
                <ActivityIndicator size="small" color={'#333'} />
              ) : (
                <Text style={styles.headerCardText}>{totalDataCount}</Text>
              )}
              <Text style={styles.headerCardLabel}>Total</Text>
            </View>
            <View style={styles.headerCardItem}>
              {loading ? (
                <ActivityIndicator size="small" color={'#333'} />
              ) : (
                <Text style={styles.headerCardText}>
                  {renderedCount ? renderedCount : 0}
                </Text>
              )}
              <Text style={styles.headerCardLabel}>Listed</Text>
            </View>
          </View>
          <View style={styles.filterContainer}>
            <View style={styles.pickerContainer}>
              <DropdownComponent
                propsData={{
                  dropdownLabel:
                    filterOption === 'company'
                      ? 'Select Company'
                      : filterOption == 'country'
                        ? 'Select Country'
                        : filterOption == 'category'
                          ? 'Select Category'
                          : 'Select ....',
                  data:
                    filterOption == 'company'
                      ? companiesList
                      : filterOption == 'country'
                        ? countriesList
                        : filterOption == 'category'
                          ? categoryList
                          : null,
                  value: searchQuery,
                  setValue: handleDropdownChange,
                  clearValue: handleClear,
                  clearButton: true,
                  Color: 'white',
                  IconColor: 'white',
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={styles.filterIconContainer}>
              <Icon name="filter" color={'#333'} size={hp('3%')} />
              <Text style={styles.filterLabel}>Filter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={result}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          initialNumToRender={100}
          maxToRenderPerBatch={100}
        />
      </View>
      {loading && (
        <View style={styles.loaderContainer}>
          {totalDataCount === renderedCount && data?.length != 0 ? (
            <Text>No More Record</Text>
          ) : (
            <ActivityIndicator size="large" color={Colors.primary} />
          )}
        </View>
      )}

      {isUpdateModelVisible && (
        <UpdateProductModel props={{ setIsUpdateModelVisible, handleRefresh }} />
      )}

      {productmodelVisible && modalData ? (
        <ProductModel
          props={{
            item: modalData,
            setProductModalVisible: setProductModelVisible,
          }}
        />
      ) : null}

      <FilterModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        filterOption={filterOption}
        setFilterOption={applyFilter}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Seashell,
  },
  section1: {
    flex: 1.3,
  },
  sectionBody1: {
    flex: 1.7,
    backgroundColor: 'red',
    borderBottomLeftRadius: hp('5%'),
    borderBottomRightRadius: hp('5%'),
  },
  safeArea: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
  },
  backButton: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    color: '#fff',
  },
  sectionBody2: {
    flex: 1.2,
    alignItems: 'center',
  },
  headerCard: {
    width: wp('80%'),
    height: hp('10%'),
    backgroundColor: '#fff',
    flexDirection: 'row',
    elevation: 5,
    overflow: 'hidden',
    marginTop: -hp('5%'),
    borderRadius: wp('3%'),
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  headerCardItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCardText: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.5)',
  },
  headerCardLabel: {
    color: 'gray',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  pickerContainer: {
    height: hp('6%'),
    width: wp('70%'),
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: wp('3%'),
    backgroundColor: '#fff',
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  filterIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp('3%'),
  },
  filterLabel: {
    color: 'gray',
  },
  listContainer: {
    flex: 2.5,
  },
  loaderContainer: {
    height: hp('8%'),
    width: wp('100%'),
    marginTop: hp('3%'),
    marginBottom: hp('3%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
