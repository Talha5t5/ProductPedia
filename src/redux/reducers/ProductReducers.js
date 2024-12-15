import { GET_PRODUCTS } from '../constants/Constants';

const initialState = [];

export const ProductReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
     return [action.data];

    default:
      return state;
  }
};