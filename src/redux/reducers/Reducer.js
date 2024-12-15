import { GET_CATEGORIES_SAGA, GET_CATEGORIES_ACTION} from '../constants/Constants';

const initialState = 0;

export const reducer = (state = initialState, {type, data}) => {
  switch (type) {
    case "abc":
      return state;

    default:
      return state;
  }
};
