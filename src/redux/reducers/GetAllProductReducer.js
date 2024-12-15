import {
  FETCH_DATA,
  FETCH_DATA_CLEAR,
  FETCH_DATA_FAILURE,
  FETCH_DATA_SUCCESS,
  FETCH_FILTER_DATA,
  UPDATE_FETCH_DATA,
} from '../constants/Constants';

const initialState = {
  data: [],
  loading: false,
  error: null,
  totalPages: 0,
  totalDataCount: 0,
};

export const getAllProductReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_FILTER_DATA:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        data: [...state.data, action.payload.data],
        totalPages: action.payload.totalPages,
        totalDataCount: action.payload.totalDataCount,
        dataLength: action.payload.dataLength,
        loading: false,
        error: null,
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case FETCH_DATA_CLEAR:
      return {
        ...state,
        data: [],
        totalPages: 1,
      };
    case UPDATE_FETCH_DATA:
      console.log(action.payload); // To verify the updated product data
      return {
        ...state,
        data: state.data.map(product =>
          product._id === action.payload._id ? action.payload : product,
        ),
      };
    default:
      return state;
  }
};
