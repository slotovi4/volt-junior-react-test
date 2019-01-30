import {
  GET_ALL_INVOICES,
  CREATE_NEW_INVOICE,
  DELETE_INVOICE,
  CHANGE_INVOICE,
  SET_INVOICE_ITEM,
  GET_INVOICE_ITEMS,
  CHANGE_INVOICE_ITEMS
} from "../actions/types";

const initialState = {
  invoiceItems: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_INVOICES:
      return {
        ...state,
        invoices: action.payload
      };
    case CREATE_NEW_INVOICE:
      return {
        ...state,
        invoices: [...state.invoices, action.payload]
      };
    case DELETE_INVOICE:
      return {
        ...state,
        invoices: state.invoices.filter(
          invoice => invoice.id !== action.payload
        )
      };
    case CHANGE_INVOICE:
      return {
        ...state,
        invoices: state.invoices.map(invoice =>
          invoice.id === action.payload.id ? action.payload : invoice
        )
      };
    case SET_INVOICE_ITEM:
      return {
        ...state,
        invoiceItems: state.invoiceItems.map(item =>
          item.product_id === action.payload.product_id ? action.payload : item
        )
      };
    case GET_INVOICE_ITEMS:
      return {
        ...state,
        invoiceItems: action.payload
      };
    case CHANGE_INVOICE_ITEMS:
      return {
        ...state,
        invoiceItems: state.invoiceItems.map(item =>
          item.id === action.payload.id ? action.payload : item
        )
      };
    default:
      return state;
  }
};
