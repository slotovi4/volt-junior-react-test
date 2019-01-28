import {
  GET_ALL_CUSTOMERS,
  CREATE_NEW_CUSTOMER,
  DELETE_CUSTOMER,
  CHANGE_CUSTOMER
} from "../actions/types";

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
    case DELETE_CUSTOMER:
      return {
        ...state,
        customers: state.customers.filter(
          customer => customer.id !== action.payload
        )
      };
    case CHANGE_CUSTOMER:
      return {
        ...state,
        customers: state.customers.map(customer =>
          customer.id === action.payload.id ? action.payload : customer
        )
      };
    default:
      return state;
  }
};
