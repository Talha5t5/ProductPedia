import { PARAMS_DATA } from '../constants/Constants';

const initialState = {};

export const ParamsReducers = (
  state = initialState,
  {type, data},
) => {
  switch (type) {
    case PARAMS_DATA:
      return data;
    default:
      return state;
  }
};
