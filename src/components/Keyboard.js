import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Modal, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {color} from 'react-native-elements/dist/helpers';
import {TextInput} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Feather';
const CustomNumericKeyboard = ({visible, onClose, onKeyPress}) => {
  const navigation = useNavigation();
  const [inputValue, setInputValue] = useState('');
  const handleKeyPress = key => {
    setInputValue(inputValue + key);
  };
  const handleBackspacePress = () => {
    setInputValue(prevValue => prevValue.slice(0, -1));
  };

  const handleOnPress = () => {
    if (inputValue.length > 0) {
      onKeyPress(inputValue);
    }
  };

  useEffect(() => {
    setInputValue('');
  }, [visible == true]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.keyboardContainer}>
          <View style={{flexDirection: 'row', backgroundColor: '#ccc'}}>
            <Text
              style={{
                fontSize: hp('2.5%'),
                color: '#333',
                alignSelf: 'center',
                marginLeft: hp('2%'),
                fontWeight: 'bold',
              }}>
              Barcode:
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter the barcode"
              placeholderTextColor="gray"
              value={inputValue}
              editable={false}
            />
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => handleKeyPress(1)}
              style={styles.key}>
              <Text style={styles.keyText}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleKeyPress(2)}
              style={styles.key}>
              <Text style={styles.keyText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleKeyPress(3)}
              style={styles.key}>
              <Text style={styles.keyText}>3</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => handleKeyPress(4)}
              style={styles.key}>
              <Text style={styles.keyText}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleKeyPress(5)}
              style={styles.key}>
              <Text style={styles.keyText}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleKeyPress(6)}
              style={styles.key}>
              <Text style={styles.keyText}>6</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => handleKeyPress(7)}
              style={styles.key}>
              <Text style={styles.keyText}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleKeyPress(8)}
              style={styles.key}>
              <Text style={styles.keyText}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleKeyPress(9)}
              style={styles.key}>
              <Text style={styles.keyText}>9</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.key}
              onPress={() => handleBackspacePress()}>
              <Icon name="delete" size={25} color={'#ccc'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleKeyPress(0)}
              style={styles.key}>
              <Text style={styles.keyText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleOnPress()}
              style={{
                ...styles.key,
                borderRadius: 35,
                backgroundColor: 'orange',
              }}>
              <Icon name="check" size={25} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  keyboardContainer: {
    backgroundColor: '#212121',
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    marginTop: 10,
  },
  key: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 35,
    borderColor: '#ccc',
  },
  keyText: {
    fontSize: 20,
    color: '#ccc',
  },
  input: {
    backgroundColor: '#ccc',
    opacity: 0.8,
    width: '80%',
  },
});

export default CustomNumericKeyboard;
