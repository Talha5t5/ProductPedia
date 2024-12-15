// styles.js
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.Seashell,
    width: '100%',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
  },
  inputContainer: {
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 5,
    alignItems: 'center',
  },
  inputContainerLabel: {
    fontSize: 16,
    color: Colors.primaryFontColor,
    marginTop: 15,
    marginHorizontal: 30,
  },
  inputContainerInputFeild: {
    fontSize: 16,
    width: '90%',
    height: hp('6%'),
    borderWidth: 1,
    color: Colors.primaryFontColor,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: wp('1%'),
    borderColor: '#333',
  },
  btnContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  btnText: {
    backgroundColor: Colors.tomato,
    color: Colors.secondaryFontColor,
    fontWeight: 'bold',
    borderRadius: wp('1%'),
    fontSize: 20,
    paddingVertical: 10,
    textAlign: 'center',
    width: wp('80%'),
  },
  pickerWrapper: {
    width: '90%',
    height: hp('6%'),
    paddingVertical: 4,
    justifyContent: 'center',
  },
  pickerWrapper2: {
    width: '90%',
    paddingVertical: 4,
    justifyContent: 'center',
  },
  pickerContainer: {
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: wp('1%'),
    width: '100%',
    borderColor: '#333',
    color: Colors.primaryFontColor,
  },
  picker: {
    height: 50,
    color: Colors.primaryFontColor,
  },
});
