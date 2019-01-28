import { GET_ALL_PRODUCTS } from "./types";
import axios from "axios";

export const getAllProducts = () => async dispatch => {
  const products = await axios.get("/api/products");

  dispatch({
    type: GET_ALL_PRODUCTS,
    payload: products.data
  });
};
