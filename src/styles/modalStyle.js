import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalView: {
    width: '85%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
  },
  closeIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    zIndex: 1,
  },
  closeIcon: {
    fontSize: 24,
    color: '#333', // Customize this color as needed
  },
  modelContent: {
    alignItems: 'center',
    marginTop: 15,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  productImage: {
    width: wp('50%'),
    height: hp('25%'),
    borderRadius: 12,
  },
  discriptionContainer: {
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  heading: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
  },
  line: {
    marginVertical: 8,
    color: '#ddd',
    textAlign: 'center',
  },
  companyDetailContainer: {
    marginTop: 10,
  },
  companyDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  label: {
    fontSize: 16,
    color: '#444',
  },
  detail: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  description: {
    marginTop: 20,
    fontSize: 14,
    color: '#666',
    textAlign: 'justify',
  },
});
