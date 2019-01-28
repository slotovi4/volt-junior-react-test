import {
  GET_ALL_CUSTOMERS,
  CREATE_NEW_CUSTOMER,
  DETELE_CUSTOMER
} from "./types";
import axios from "axios";

export const getAllCustomers = () => async dispatch => {
  const customers = await axios.get("/api/customers");

  dispatch({
    type: GET_ALL_CUSTOMERS,
    payload: customers.data
  });
};

export const createNewCustomer = newCustomer => async dispatch => {
  await axios.post(`/api/customers/`, newCustomer);

  dispatch({
    type: CREATE_NEW_CUSTOMER,
    payload: newCustomer
  });
};

export const deteleCustomer = customerId => async dispatch => {
  await axios.delete(`/api/customers/${customerId}`);

  dispatch({
    type: DETELE_CUSTOMER,
    payload: customerId
  });
};
