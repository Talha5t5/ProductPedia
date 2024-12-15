import {GET_CATEGORY_SUCCESS} from '../constants/Constants';

const initialState = [];

export const CategoryReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORY_SUCCESS:
      return [action.data];

    default:
      return state;
  }
};
