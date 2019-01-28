import { GET_ALL_CUSTOMERS } from "../actions/types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CUSTOMERS:
      return {
        ...state,
        customers: action.payload
      };
    default:
      return state;
  }
};
