import {
  GET_ALL_INVOICES,
  CREATE_NEW_INVOICE,
  DELETE_INVOICE,
  CHANGE_INVOICE,
  SET_INVOICE_ITEM,
  GET_INVOICE_ITEMS,
  CHANGE_INVOICE_ITEMS,
  DELETE_INVOICE_ITEM
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
  const invoice = await axios.post(`/api/invoices/`, newInvoice);

  dispatch({
    type: CREATE_NEW_INVOICE,
    payload: invoice.data
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
  const addedItem = await axios.post(`/api/invoices/${invoiceId}/items`, item);

  dispatch({
    type: SET_INVOICE_ITEM,
    payload: addedItem.data
  });
};

export const deleteInvoiceItem = (invoiceId, itemId) => async dispatch => {
  const deletedItem = await axios.delete(
    `/api/invoices/${invoiceId}/items/${itemId}`
  );

  dispatch({
    type: DELETE_INVOICE_ITEM,
    payload: deletedItem.data
  });
};

export const getInvoiceItems = invoiceId => async dispatch => {
  const invoiceItems = await axios.get(`/api/invoices/${invoiceId}/items`);

  dispatch({
    type: GET_INVOICE_ITEMS,
    payload: invoiceItems.data
  });
};

export const changeInvoiceItems = (invoiceId, item) => async dispatch => {
  const invoiceItem = await axios.put(
    `/api/invoices/${invoiceId}/items/${item.id}`,
    item
  );

  dispatch({
    type: CHANGE_INVOICE_ITEMS,
    payload: invoiceItem.data
  });
};
