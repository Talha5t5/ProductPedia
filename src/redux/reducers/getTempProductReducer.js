import {GET_TEMP_PRODUCT, GET_TEMP_PRODUCT_SUCCESS} from '../constants/Constants';

const initialState = [];

export const getTempProductReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_TEMP_PRODUCT_SUCCESS:
        return [action.data];
      

    default:
      return state;
  }
};
