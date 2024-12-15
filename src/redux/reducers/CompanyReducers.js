import { ADD_COMPANIES, GET_COMPANIES, GET_COMPANIES_SUCCESS } from '../constants/Constants';

const initialState = [];

export const CompanyReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMPANIES_SUCCESS:
     return [action.data];

    case ADD_COMPANIES:
      state = [...state, action.data]
        return state;
    default:
      return state;
  }
};