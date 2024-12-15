import React, {useState} from 'react';
import {View, Modal, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';

const FilterModal = ({
  filterOption,
  setFilterOption,
  modalVisible,
  setModalVisible,
  PageType,
}) => {
  const [selectedOption, setSelectedOption] = useState(filterOption);

  const handleOptionChange = option => {
    setSelectedOption(option);
    setFilterOption(option);
    setModalVisible(false); // Close modal on radio button selection
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Filter Options</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Icon
                name="times"
                size={26}
                color="#fff"
                style={styles.closeIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.optionContainer}>
            <Text style={styles.optionLabel}>Search by:</Text>
            {PageType != 'CompanySearch' && (
              <View style={styles.radioOption}>
                <RadioButton
                  value="category"
                  selected={selectedOption === 'category'}
                  onSelect={handleOptionChange}
                />
                <Text style={styles.radioLabel}>Category</Text>
              </View>
            )}
            <View style={styles.radioOption}>
              <RadioButton
                value="company"
                selected={selectedOption === 'company'}
                onSelect={handleOptionChange}
              />
              <Text style={styles.radioLabel}>Company</Text>
            </View>
            <View style={styles.radioOption}>
              <RadioButton
                value="country"
                selected={selectedOption === 'country'}
                onSelect={handleOptionChange}
              />
              <Text style={styles.radioLabel}>Country</Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const RadioButton = ({value, selected, onSelect}) => {
  return (
    <TouchableOpacity onPress={() => onSelect(value)}>
      <View style={styles.radioCircle}>
        {selected && <View style={styles.selectedRb} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    height: hp('35%'),
    width: wp('70%'),
    backgroundColor: '#fff', // Example color code
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    width: '100%',
    height: '15%', // Fit the width of the modal view
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('2%'),
    backgroundColor: '#333', // Dark gray background color
    marginTop: 0, // Top margin of 0
    paddingHorizontal: wp('2%'), // Add padding horizontally
  },
  headerText: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#fff', // Dark gray color
  },
  closeButton: {
    fontSize: wp('4%'),
    color: '#FF6347', // Example color code
  },
  optionContainer: {
    marginBottom: hp('2%'),
    padding: hp('2%'),
  },
  optionLabel: {
    fontSize: wp('4.5%'),
    marginBottom: hp('1%'),
    color: '#808080', // Example color code
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1%'),
  },
  radioLabel: {
    fontSize: wp('4%'),
    marginLeft: wp('2%'),
    color: '#333', // Example color code
  },
  radioCircle: {
    height: hp('3%'),
    width: hp('3%'),
    borderRadius: hp('1.5%'),
    borderWidth: 2,
    borderColor: '#008000', // Example color code
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRb: {
    width: hp('1.5%'),
    height: hp('1.5%'),
    borderRadius: hp('0.75%'),
    backgroundColor: '#008000', // Example color code
  },
});

export default FilterModal;
