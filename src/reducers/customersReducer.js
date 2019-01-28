import { GET_ALL_CUSTOMERS, CREATE_NEW_CUSTOMER } from "../actions/types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CUSTOMERS:
      return {
        ...state,
        customers: action.payload
      };
    case CREATE_NEW_CUSTOMER:
      return {
        ...state,
        customers: [...state.customers, action.payload]
      };
    default:
      return state;
  }
};
