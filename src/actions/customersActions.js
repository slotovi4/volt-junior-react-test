import { GET_ALL_CUSTOMERS } from "./types";
import axios from "axios";

export const getAllCustomers = () => async dispatch => {
  const customers = await axios.get("/api/customers");

  dispatch({
    type: GET_ALL_CUSTOMERS,
    payload: customers.data
  });
};
