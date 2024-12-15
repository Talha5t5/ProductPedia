import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  GetCategory,
  GetCompanies,
  GetCountries,
  GetTempProduct,
} from './src/redux/actions/Action';

const Stack = createNativeStackNavigator();
import Splash from './src/screens/Splash';
import LoginUser from './src/screens/LoginUser';
import AddCompany from './src/screens/AddCompany';
import AddCountry from './src/screens/AddCountry';
import AddProduct from './src/screens/AddProduct';
import AddFeedback from './src/screens/AddFeedback';
import ShowFeedback from './src/screens/ShowFeedback';
import BarcodeScanner from './src/screens/BarcodeScanner';
import DrawerModel from './src/models/DrawerModel';
import AddQrProduct from './src/screens/AddQrProduct';
import ProductNotification from './src/screens/ProductNotification';
import TabNavigation from './src/navigation/tabNavigation';
import {useDispatch} from 'react-redux';
import Explore from './src/screens/Explore';
import ExploreCompany from './src/screens/ExploreCompany';
import {StatusBar} from 'react-native';
import AddCategory from './src/screens/AddCategory';
import Colors from './src/assets/Colors';
StatusBar.setBackgroundColor(Colors.tomato);
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TabNavigation"
          component={TabNavigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Explore"
          component={Explore}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="AddProduct"
          component={AddProduct}
          options={{
            headerShown: true,
            title: 'Add Product',
            headerStyle: {
              backgroundColor: Colors.tomato,
            },
          }}
        />
        <Stack.Screen
          name="DrawerModel"
          component={DrawerModel}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="BarcodeScanner"
          component={BarcodeScanner}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ShowFeedback"
          component={ShowFeedback}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddFeedback"
          component={AddFeedback}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddCountry"
          component={AddCountry}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: Colors.tomato,
            },
          }}
        />
        <Stack.Screen
          name="AddCompany"
          component={AddCompany}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: Colors.tomato,
            },
          }}
        />
        <Stack.Screen
          name="LoginUser"
          component={LoginUser}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Notification"
          component={ProductNotification}
          options={{
            title: 'Product Notification',
          }}
        />

        <Stack.Screen
          name="AddCategory"
          component={AddCategory}
          options={{
            title: 'Add Category',
            headerStyle: {
              backgroundColor: Colors.tomato,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
