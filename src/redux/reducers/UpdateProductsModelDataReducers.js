import {UPDATE_PRODUCTS_MODEL_DATA} from '../constants/Constants';

const initialState = {};

export const UpdateProductsModelDataReducers = ( state = initialState, {type, data}) => {
  switch (type) {
    case UPDATE_PRODUCTS_MODEL_DATA:
      return data;
    default:
      return state;
  }
};
