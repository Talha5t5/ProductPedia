import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Header from '../components/Header';
import Colors from '../assets/Colors';
import Ip from '../assets/Ip';
import DatePicker from 'react-native-date-picker';
import {Button} from 'react-native-elements';

export default function AddPurchases(props) {
  const [shops, setShops] = useState([{_id: null, shopName: null}]);
  const [companies, setCompanies] = useState([{_id: null, shopName: null}]);
  const [itemTypes, setItemTypes] = useState([{_id: null, shopName: null}]);
  const [selectedShop, setSelectedShop] = useState(shops[0]);
  const [selectedCompany, setSelectedCompany] = useState(companies[0]);
  const [selectedItemType, setSelectedItemType] = useState(itemTypes[0]);
  const [purchaseReciptNo, setPurchaseReciptNo] = useState('');
  const [purchaseDate, setPurchaseDate] = useState(new Date());
  const [itemName, setItemName] = useState('');
  const [itemCode, setItemCode] = useState('');
  const [locationChoosed, setLocationChoosed] = useState(false);
  const [companyChoosed, setCompanyChoosed] = useState(false);
  const [itemTypeChooses, setItemTypeChooses] = useState(false);
  const customerId = props.route.params._id;
  const [showDatePicker, setShowDatePicker] = useState(false);

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  async function GetShopsData() {
    const apiEndpoint = Ip + 'shop/getAllShops';
    let response = await fetch(apiEndpoint);
    if (response.status === 200) {
      response = await response.json();
      setShops(response);
    } else {
      console.error(
        'POST request failed:',
        response.status,
        response.statusText,
      );
    }
  }

  async function GetCompaniesData() {
    const apiEndpoint = Ip + 'company/getallcompanies';
    let response = await fetch(apiEndpoint);
    if (response.status == 200) {
      response = await response.json();
      setCompanies(response);
    } else {
      console.error(
        "Couldn't get Companies",
        response.status,
        response.statusText,
      );
    }
  }

  async function GetItemTypesData() {
    const apiEndpoint = Ip + 'itemtype/getallitemtypes';
    let response = await fetch(apiEndpoint);
    if (response.status === 200) {
      response = await response.json();
      setItemTypes(response);
    } else {
      console.error(
        "Couldn't get ItemTypes",
        response.status,
        response.statusText,
      );
    }
  }

  useEffect(() => {
    if (shops[0].shopName == null) {
      GetShopsData();
      GetCompaniesData();
      GetItemTypesData();
    }
  }, [shops]);

  useEffect(() => {
    if (selectedShop._id == null) {
      setSelectedShop(shops[0]);
    }
  }, [selectedShop]);

  useEffect(() => {
    if (selectedCompany._id == null) {
      setSelectedCompany(companies[0]);
    }
  }, [selectedCompany]);

  useEffect(() => {
    if (selectedItemType._id == null) {
      setSelectedItemType(itemTypes[0]);
    }
  }, [selectedItemType]);

  async function PostData() {
    const apiEndpoint = Ip + 'purchases/postpurchaserecord';
    try {
      const data = {
        customerId: customerId,
        purchaseReciptNo: purchaseReciptNo,
        purchaseDate: purchaseDate.toISOString(),
        purchaseFrom: selectedShop._id,
        itemCompany: selectedCompany._id,
        itemType: selectedItemType._id,
        itemName: itemName,
        itemCode: itemCode,
      };
      let response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.status == 200) {
        props.navigation.navigate('UserDashboard');
      } else {
        console.error(
          'POST request failed:',
          response.status,
          response.statusText,
        );
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  return (
    <View>
      <Header headerText="Add Product" />
      <Text> </Text>
      <Text> </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputContainerLabel}>Enter Receipt #</Text>
        <TextInput
          style={styles.inputContainerInputFeild}
          placeholderTextColor="gray"
          placeholder="Purchase Receipt Number"
          onChangeText={e => {
            setPurchaseReciptNo(e);
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => toggleDatePicker()}
        style={styles.inputContainer}>
        <Text style={styles.inputContainerLabel}>Choose Date</Text>
        <TextInput
          style={styles.inputContainerInputFeild}
          placeholderTextColor="gray"
          placeholder="Select a date"
          value={purchaseDate.toISOString().split('T')[0]}
          editable={false}
        />
      </TouchableOpacity>
      {showDatePicker && (
        <View style={styles.datePickerContainer}>
          <DatePicker
            style={styles.datePicker}
            mode="date"
            date={purchaseDate}
            onDateChange={date => {
              setPurchaseDate(date);
            }}
          />
          <Button title="Done" onPress={toggleDatePicker} />
        </View>
      )}
      <View style={styles.inputContainer}>
        <Text style={styles.inputContainerLabel}>Select Shop</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={locationChoosed ? selectedShop : 'Choose Location'}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedShop(itemValue);
              setLocationChoosed(true);
            }}
            style={styles.picker}>
            <Picker.Item key={200} label={'Choose Location'} enabled={false} />
            {shops.map((option, index) => (
              <Picker.Item key={index} label={option.shopName} value={option} />
            ))}
          </Picker>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputContainerLabel}>Enter Item Name</Text>
        <TextInput
          style={styles.inputContainerInputFeild}
          placeholderTextColor="gray"
          placeholder="e.g. Heater"
          onChangeText={e => {
            setItemName(e);
          }}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputContainerLabel}>Enter Item Code</Text>
        <TextInput
          style={styles.inputContainerInputFeild}
          placeholder="Item Code"
          placeholderTextColor="gray"
          onChangeText={e => {
            setItemCode(e);
          }}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputContainerLabel}>Select Company</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={companyChoosed ? selectedCompany : 'Choose Company'}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedCompany(itemValue);
              setCompanyChoosed(true);
            }}
            style={styles.picker}>
            <Picker.Item key={200} label={'Choose Company'} enabled={false} />
            {companies.map((option, index) => (
              <Picker.Item
                key={index}
                label={option.companyName}
                value={option}
              />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputContainerLabel}>Select ItemType</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={
              itemTypeChooses ? selectedItemType : 'Choose Item Type'
            }
            onValueChange={(itemValue, itemIndex) => {
              setSelectedItemType(itemValue);
              setItemTypeChooses(true);
            }}
            style={styles.picker}>
            <Picker.Item key={200} label={'Choose Item Type'} enabled={false} />
            {itemTypes.map((option, index) => (
              <Picker.Item
                key={index}
                label={option.itemTypeName}
                value={option}
              />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={PostData}>
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 10,
  },
  inputContainerLabel: {
    color: Colors.primaryFontColor,
    fontSize: 16,
    width: '40%',
  },
  inputContainerInputFeild: {
    color: Colors.primaryFontColor,
    fontSize: 16,
    width: '60%',
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    borderColor: Colors.secondaryBgColor,
  },
  btnContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  btnText: {
    backgroundColor: Colors.secondaryBgColor,
    color: Colors.secondaryFontColor,
    fontWeight: 'bold',
    borderRadius: 10,
    fontSize: 20,
    paddingVertical: 10,
    textAlign: 'center',
    width: 100,
  },
  pickerContainer: {
    width: '60%',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: Colors.secondaryBgColor,
    color: Colors.primaryFontColor,
  },
  picker: {
    height: 40,
    fontSize: 16,
    color: Colors.primaryFontColor,
  },
  datePickerContainer: {
    width: '100%',
    alignItems: 'center',
    padding: 5,
    flexDirection: 'column',
  },
});
