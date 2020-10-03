import axios from "axios";
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADNING, API_URL } from "./types";
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getItems = () => dispatch => {
  dispatch(setItemLoadning());
  axios.get(`${API_URL}/api/items`).then(res =>
    dispatch({
      type: GET_ITEMS,
      payload: res.data
    })
  ).catch(err => {
    dispatch(
      returnErrors(err.response.data, err.response.status)
    );
  });
};

export const deleteItem = _id => (dispatch,getState) => {
    axios
    .delete(`${API_URL}/api/item/remove/${_id}`,tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_ITEM,
        payload: _id
      })
    ).catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status)
      );
    });
};

export const addItem = item => (dispatch,getState) => {
  dispatch(setItemLoadning);
  axios
  .post(`${API_URL}/api/item/add` , item,tokenConfig(getState))
  .then(res => 
    dispatch({
        type:ADD_ITEM,
        payload:res.data
    }))
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status)
      );
    });
};

export const setItemLoadning = () => {
  return {
    type: ITEMS_LOADNING
  };
};
