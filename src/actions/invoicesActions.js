import {
  GET_ALL_INVOICES,
  CREATE_NEW_INVOICE,
  DELETE_INVOICE,
  CHANGE_INVOICE,
  SET_INVOICE_ITEM,
  GET_INVOICE_ITEMS
} from "./types";
import axios from "axios";

export const getAllInvoices = () => async dispatch => {
  const invoices = await axios.get("/api/invoices");

  dispatch({
    type: GET_ALL_INVOICES,
    payload: invoices.data
  });
};

export const createNewInvoice = newInvoice => async dispatch => {
  await axios.post(`/api/invoices/`, newInvoice);

  dispatch({
    type: CREATE_NEW_INVOICE,
    payload: newInvoice
  });
};

export const deteleInvoice = invoiceId => async dispatch => {
  await axios.delete(`/api/invoices/${invoiceId}`);

  dispatch({
    type: DELETE_INVOICE,
    payload: invoiceId
  });
};

export const changeInvoice = invoice => async dispatch => {
  await axios.put(`/api/invoices/${invoice.id}`, invoice);

  dispatch({
    type: CHANGE_INVOICE,
    payload: invoice
  });
};

export const setInvoiceItem = (invoiceId, item) => async dispatch => {
  await axios.post(`/api/invoices/${invoiceId}/items`, item);

  dispatch({
    type: SET_INVOICE_ITEM
  });
};

export const getInvoiceItems = invoiceId => async dispatch => {
  const invoiceItems = await axios.get(`/api/invoices/${invoiceId}/items`);

  dispatch({
    type: GET_INVOICE_ITEMS,
    payload: invoiceItems.data
  });
};
