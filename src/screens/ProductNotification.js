import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import {Card} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ProductDetailModal from '../models/AddProductModel';
import {GetTempProduct} from '../redux/actions/Action';
import axios from 'axios';
import Ip from '../assets/Ip';

const ProductNotification = ({navigation}) => {
  let product = useSelector(state => state.getTempProductReducers);
  product = product.flat();
  console.log(product);
  const dispatch = useDispatch();
  const [expandedId, setExpandedId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null);

  const toggleExpand = id => {
    setExpandedId(expandedId === id ? null : id);
  };

  const openModal = data => {
    setModalData(data);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalData(null);
    setModalVisible(false);
  };

  useEffect(() => {
    console.log('Called');
    dispatch(GetTempProduct());
    console.log(product);
  }, [modalVisible]);

  const delProduct = item => {
    Alert.alert('', `Do you want to remove this product?`, [
      {
        text: 'No',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          deleteProduct(item);
        },
      },
    ]);
  };

  const deleteProduct = async item => {
    console.log(item._id);
    try {
      const response = await axios.delete(
        `${Ip}/product/delTempProduct/${item._id}`,
      );
      const data = response.data.msg;
      dispatch(GetTempProduct());
      Alert.alert(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const renderItem = ({item}) => (
    <Card containerStyle={styles.cardContainer}>
      <TouchableOpacity onPress={() => toggleExpand(item._id)}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemHeaderText}>{item.productName}</Text>
          <Icon
            name={expandedId === item._id ? 'up' : 'down'}
            size={wp('5%')}
            color={'black'}
          />
        </View>
        <Text style={styles.createdAtText}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </TouchableOpacity>

      {expandedId === item._id && (
        <View style={styles.expandedContent}>
          {/* Render additional information */}
          <View style={styles.additionalInfo}>
            <Text style={styles.additionalInfoText}>
              Company: {item.company}
            </Text>
            <Text style={styles.additionalInfoText}>
              Barcode: {item.barcode}
            </Text>
          </View>
          <View style={styles.bottomRow}>
            <Text style={styles.createdAtText}>
              {' '}
              {new Date(item.createdAt).toLocaleDateString()}{' '}
              {new Date(item.createdAt).toLocaleTimeString()}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => openModal(item)}>
                <Icon name={'pluscircle'} size={wp('5%')} color={'red'} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => delProduct(item)}
                style={{marginLeft: hp('1.5%')}}>
                <Icon name={'minuscircle'} size={wp('5%')} color={'red'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </Card>
  );

  return (
    <View style={{flex: 1}}>
      {product.length != 0 ? (
        <FlatList
          data={product}
          keyExtractor={item => item._id}
          renderItem={renderItem}
        />
      ) : (
        <View style={styles.noRecordContainer}>
          <Text style={styles.noRecordText}>No Record Found</Text>
        </View>
      )}
      {modalData && (
        <ProductDetailModal
          modalVisible={modalVisible}
          closeModal={closeModal}
          modalData={modalData}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: hp('2%'),
    width: wp('90%'),
    alignSelf: 'center',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemHeaderText: {
    color: 'black',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  createdAtText: {
    color: 'gray',
    fontSize: wp('3%'),
    marginTop: hp('1%'),
  },
  expandedContent: {
    marginTop: hp('1%'),
  },
  additionalInfo: {
    marginBottom: hp('1%'),
  },
  additionalInfoText: {
    color: 'black',
    fontSize: wp('3.5%'),
  },
  bottomRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: hp('1%'),
  },
  noRecordContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noRecordText: {
    color: 'black',
    fontSize: wp('4%'),
  },
});

export default ProductNotification;
