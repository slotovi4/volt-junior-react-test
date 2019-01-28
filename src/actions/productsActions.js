import { GET_ALL_PRODUCTS, CREATE_NEW_PRODUCT, DELETE_PRODUCT } from "./types";
import axios from "axios";

export const getAllProducts = () => async dispatch => {
  const products = await axios.get("/api/products");

  dispatch({
    type: GET_ALL_PRODUCTS,
    payload: products.data
  });
};

export const createNewProduct = newProduct => async dispatch => {
  await axios.post(`/api/products/`, newProduct);

  dispatch({
    type: CREATE_NEW_PRODUCT,
    payload: newProduct
  });
};

export const deteleProduct = productId => async dispatch => {
  await axios.delete(`/api/products/${productId}`);

  dispatch({
    type: DELETE_PRODUCT,
    payload: productId
  });
};
