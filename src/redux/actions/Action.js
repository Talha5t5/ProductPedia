import {
  ADD_CATEGORIES,
  ADD_COMPANIES,
  ADD_COUNTRIES,
  FETCH_DATA,
  FETCH_DATA_CLEAR,
  FETCH_DATA_FAILURE,
  FETCH_DATA_SUCCESS,
  FETCH_FILTER_DATA,
  GET_CATEGORY,
  GET_COMPANIES,
  GET_COUNTRIES,
  GET_PRODUCTS,
  GET_TEMP_PRODUCT,
  PARAMS_DATA,
  TOGGLE_MODEL_VISIBLILITY,
  UPDATE_PRODUCTS_MODEL_DATA,
} from '../constants/Constants';

export function GetProducts() {
  return {type: GET_PRODUCTS};
}

export function GetCompanies() {
  return {type: GET_COMPANIES};
}

export const AddCompanies = payload => {
  return {type: ADD_COMPANIES, data: payload};
};

export const AddCategories = payload => {
  return {type: ADD_CATEGORIES, data: payload};
};

export const GetCategory = payload => {
  return {type:GET_CATEGORY}
}

export const AddCountries = payload => {
  return {type: ADD_COUNTRIES, data: payload};
};

export function GetCountries() {
  return {type: GET_COUNTRIES};
}

export function GetTempProduct() {
  return {type: GET_TEMP_PRODUCT};
}
export const TogleModelVisibility = payload => {
  return {type: TOGGLE_MODEL_VISIBLILITY, data: payload};
};

export const ParamsData = payload => {
  return {type: PARAMS_DATA, data: payload};
};

export const UpdateProductsModelData = payload => {
  return {type: UPDATE_PRODUCTS_MODEL_DATA, data: payload};
};

export const fetchData = (page, perPage) => ({
  type: FETCH_DATA,
  payload: {page, perPage},
});

export const fetchfilterData = (page, perPage, filterOption, searchQuery) => ({
  type: FETCH_FILTER_DATA,
  payload: {page, perPage, filterOption, searchQuery},
});

export const fetchDataSuccess = (data, totalPages, totalDataCount,dataLength) => ({
  type: FETCH_DATA_SUCCESS,
  payload: {data, totalPages, totalDataCount,dataLength},
});

export const fetchDataFailure = error => ({
  type: FETCH_DATA_FAILURE,
  payload: {error},
});

export function fetchDataClear() {
  return {type: FETCH_DATA_CLEAR};
}
