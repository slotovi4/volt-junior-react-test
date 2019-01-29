import { combineReducers } from "redux";
import customersReducer from "./customersReducer";
import productsReducer from "./productsReducer";
import invoicesReducer from "./invoicesReducer";

export default combineReducers({
  customer: customersReducer,
  product: productsReducer,
  invoice: invoicesReducer
});
