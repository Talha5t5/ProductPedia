import {TOGGLE_MODEL_VISIBLILITY} from '../constants/Constants';

const initialState = false;

export const ToggleModelVisibalityReducers = (
  state = initialState,
  {type, data},
) => {
  switch (type) {
    case TOGGLE_MODEL_VISIBLILITY:
      return data;
    default:
      return state;
  }
};
