import {
  GET_ALL_INVOICES,
  CREATE_NEW_INVOICE,
  DELETE_INVOICE,
  CHANGE_INVOICE
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
