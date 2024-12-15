import {takeEvery, put} from 'redux-saga/effects';
import {
  FETCH_DATA,
  FETCH_FILTER_DATA,
  GET_CATEGORY,
  GET_CATEGORY_SUCCESS,
  GET_COMPANIES,
  GET_COMPANIES_SUCCESS,
  GET_COUNTRIES,
  GET_COUNTRIES_SUCCESS,
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_TEMP_PRODUCT,
  GET_TEMP_PRODUCT_SUCCESS,
} from '../constants/Constants';
import {
  getProductsApi,
  getCategoriesApi,
  getCompaniesApi,
  getCountriesApi,
  getTempProductApi,
} from '../constants/Apis';
import axios from 'axios';
import {fetchDataFailure, fetchDataSuccess} from '../actions/Action';
import Ip from '../../assets/Ip';

////////////////////////// GET PRODUCT //////////////////////////////////////////////
export function* watchProducts() {
  //for products
  yield takeEvery(GET_PRODUCTS, getProduct);
}

function* getProduct() {
  try {
    const response = yield axios(getProductsApi);
    const data = response.data;
    console.log('Get Product success');
    yield put({type: GET_PRODUCTS_SUCCESS, data});
  } catch (error) {
    console.log(error);
  }
}
////////////////////////////////////////////////////////////////////////////////

///////////////// Get Category //////////////////////////////////////////////
export function* watchCategory() {
  //for countries
  yield takeEvery(GET_CATEGORY, getCategory);
}
function* getCategory() {
  try {
    const response = yield axios(getCategoriesApi);
    const data = response.data;
    console.log('Get Category success');
    yield put({type: GET_CATEGORY_SUCCESS, data});
  } catch (error) {
    console.log(error);
  }
}
////////////////////////////////////////////////////////////////////////////////

///////////////// GET COMPANIES ///////////////////////////////////////////////
export function* watchCompanies() {
  //for categories
  yield takeEvery(GET_COMPANIES, getCompany);
}
function* getCompany() {
  try {
    const response = yield axios(getCompaniesApi);
    const data = response.data;
    console.log('Get Companies success');
    yield put({type: GET_COMPANIES_SUCCESS, data});
  } catch (error) {
    console.log(error);
  }
}
////////////////////////////////////////////////////////////////////////////////////

///////////////// Get Countries //////////////////////////////////////////////
export function* watchCountries() {
  //for countries
  yield takeEvery(GET_COUNTRIES, getCountry);
}
function* getCountry() {
  try {
    const response = yield axios(getCountriesApi);
    const data = response.data;
    console.log('Get Country success');
    yield put({type: GET_COUNTRIES_SUCCESS, data});
  } catch (error) {
    console.log(error);
  }
}
////////////////////////////////////////////////////////////////////////////////

//////////////////// GET TEMP PRODUCT ////////////////////////////////////////
export function* watchTempProduct() {
  yield takeEvery(GET_TEMP_PRODUCT, tempProduct);
}

function* tempProduct() {
  try {
    console.log('fucntion called for getTempProduct');
    const response = yield axios(getTempProductApi);
    const data = response.data;
    yield put({type: GET_TEMP_PRODUCT_SUCCESS, data});
  } catch (error) {
    console.log(error);
  }
}
///////////////////////////////////////////////////////////////////////////////////

//////////////////// GET ALL PRODUCT ////////////////////////////////////////
export function* watchAllProduct() {
  yield takeEvery(FETCH_DATA, AllProduct);
}

function* AllProduct(action) {
  try {
    const {page, perPage} = action.payload;
    console.log('function call for product');
    const response = yield axios.get(`${Ip}/product/getProduct`, {
      params: {page, perPage},
    });

    const dataLength = response.data.products.length;

    yield put(
      fetchDataSuccess(
        response.data.products,
        response.data.totalPages,
        response.data.totalDataCount,
        dataLength,
      ),
    );
  } catch (error) {
    console.log(error);
    yield put(fetchDataFailure(error));
  }
}
///////////////////////////////////////////////////////////////////////////////////

//////////////////// GET ALL PRODUCT ////////////////////////////////////////
export function* watchFilterProduct() {
  yield takeEvery(FETCH_FILTER_DATA, FilterProduct);
}

function* FilterProduct(action) {
  try {
    const {page, perPage, filterOption, searchQuery} = action.payload;
    const params = {page, perPage, filterOption};
    if (filterOption === 'company') {
      params.company = searchQuery;
    } else if (filterOption === 'country') {
      params.country = searchQuery;
    } else if (filterOption === 'category') {
      console.log('Filter', action.payload.filterOption);
      params.category = searchQuery;
    }
    console.log(params);

    console.log('function call for filterProduct');
    const response = yield axios.get(`${Ip}/product/getfilteredproducts`, {
      params,
    });
    const dataLength = response.data.products.length;

    yield put(
      fetchDataSuccess(
        response.data.products,
        response.data.totalPages,
        response.data.totalDataCount,
        dataLength,
      ),
    );
  } catch (error) {
    console.log(error);
    yield put(fetchDataFailure(error));
  }
}
///////////////////////////////////////////////////////////////////////////////////
