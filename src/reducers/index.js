import { combineReducers } from "redux";
import customersReducer from "./customersReducer";
import productsReducer from "./productsReducer";

export default combineReducers({
  customer: customersReducer,
  product: productsReducer
});
