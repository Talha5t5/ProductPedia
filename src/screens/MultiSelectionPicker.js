import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../assets/Colors';
const MultiSelectionPicker = ({
  categoryList,
  onSelectCategory,
  categorySelected,
}) => {
  const [selectedCategories, setSelectedCategories] = useState(
    categorySelected ? categorySelected : [],
  );

  console.log(categorySelected);
  const onSelectedItemsChange = selectedItems => {
    setSelectedCategories(selectedItems);
    onSelectCategory(selectedItems);
  };

  return (
    <View style={{marginTop: 6}}>
      <SectionedMultiSelect
        items={categoryList}
        IconRenderer={Icon}
        uniqueKey="_id"
        subKey="category"
        selectText="Select Category"
        showDropDowns={true}
        onSelectedItemsChange={onSelectedItemsChange}
        selectedItems={selectedCategories}
        styles={{
          selectToggle: {
            height: hp('4%'), // Adjust height as needed
            width: '95%',
            marginTop: 4,
            marginHorizontal: 6,
          },
          selectToggleText: {color: '#A9A9A9'},
        }}
      />
    </View>
  );
};

export default MultiSelectionPicker;
const styles = StyleSheet.create({
  dropdown: {
    color: Colors.primaryFontColor,
    height: hp('6%'),
    borderRadius: wp('2%'),
    paddingHorizontal: 8,
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
    color: Colors.primaryFontColor,
  },
  dropdownTextStyle: {
    color: Colors.primaryFontColor,
  },
});
