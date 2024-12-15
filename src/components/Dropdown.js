import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Colors from '../assets/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const DropdownComponent = ({propsData}) => {
  const [focus, setFocus] = useState(false);
  let dropdownLabel = 'Select...';
  let Color = 'gray';
  let IconColor = 'black';

  if (propsData.dropdownLabel != undefined) {
    dropdownLabel = propsData.dropdownLabel;
  }
  if (propsData.Color != undefined) {
    Color = propsData.Color;
  }
  if (propsData.IconColor != undefined) {
    IconColor = propsData.IconColor;
  }

  const clearSelection = () => {
    propsData.clearValue('');
  };

  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={{fontSize: 16, color: '#A9A9A9'}}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        iconColor={'#333'}
        itemTextStyle={styles.dropdownTextStyle}
        containerStyle={{
          borderRadius: wp('4%'),
        }}
        data={propsData.data}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        search
        maxHeight={300}
        labelField="name"
        valueField="_id"
        placeholder={dropdownLabel}
        searchPlaceholder="Search..."
        value={propsData.value}
        onChange={item => {
          propsData.setValue(item);
          setFocus(false);
        }}
      />
      {propsData?.value && propsData.clearButton &&
      <TouchableOpacity style={styles.clearButton} onPress={clearSelection}>
        <Text style={styles.clearButtonText}>Clear</Text>
      </TouchableOpacity>
      }
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdown: {
    color: Colors.primaryFontColor,
    height: hp('6%'),
    borderRadius: wp('2%'),
    paddingHorizontal: 8,
    flex: 1,
  },
  clearButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: Colors.primaryBgColor,
    borderRadius: wp('2%'),
  },
  clearButtonText: {
    color: Colors.primaryFontColor,
    fontSize: 16,
  },
  label: {
    position: 'absolute',
    backgroundColor: Colors.primaryBgColor,
    left: 22,
    top: 8,
    zIndex: 999,
    fontSize: 14,
  },
  placeholderStyle: {
    color: 'gray',
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: Colors.primaryFontColor,
  },
  iconStyle: {
    width: 25,
    height: 25,
  },
  inputSearchStyle: {
    height: hp('6%'),
    fontSize: 16,
    color: '#333',
    borderColor: '#333',
  },
  dropdownTextStyle: {
    color: Colors.primaryFontColor,
  },
});
