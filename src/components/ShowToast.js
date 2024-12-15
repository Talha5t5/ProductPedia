import Toast from 'react-native-toast-message';

export default function ShowToast(props) {
    Toast.show({
        type: props.type,
        position: 'bottom',
        text1: props.text1,
        visibilityTime: 3000,
        autoHide: true,
        bottomOffset: 30,
      });
}