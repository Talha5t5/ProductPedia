import { ADD_COUNTRIES, GET_COUNTRIES, GET_COUNTRIES_SUCCESS } from '../constants/Constants';

const initialState = [];

export const CountryReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES_SUCCESS:
     return [action.data];

    case ADD_COUNTRIES:
        state = [...state, action.data]
          return state;
    default:
      return state;
  }
};