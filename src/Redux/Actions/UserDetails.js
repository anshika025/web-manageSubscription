import * as types from './ActionTypes';
import { post } from './../Helper/index';
import * as urls from './../../Untils/Urls';



export const addSignUpDetails = (data) => (dispatch) => {
  dispatch({ type: types.SIGNUP_DETAILS_REQUEST });
  post({
    url: urls.SIGNUP_API,
    success: types.SIGNUP_DETAILS_SUCCESS,
    failure: types.SIGNUP_DETAILS_FAIL,
    body: data,
    dispatch,
  });
};

export const addLoginDetails = (data) => (dispatch) => {
  dispatch({ type: types.LOGIN_DETAILS_REQUEST });
  post({
    url: urls.LOGIN_API,
    success: types.LOGIN_DETAILS_SUCCESS,
    failure: types.LOGIN_DETAILS_FAIL,
    body: data,
    dispatch,
  });
};
export const getClientSecret = (data) => (dispatch) => {
  dispatch({ type: types.CLIENT_SECRET_REQUEST });
  post({
    url: urls.SECRET_API,
    success: types.CLIENT_SECRET_SUCCESS,
    failure: types.CLIENT_SECRET_FAIL,
    body: data,
    dispatch,
  });
};
export const addPaymentDetails = (data) => (dispatch) => {
  dispatch({ type: types.PAYMENT_DETAILS_REQUEST });
  post({
    url: urls.PAYMENT_DETAILS_API,
    success: types.PAYMENT_DETAILS_SUCCESS,
    failure: types.PAYMENT_DETAILS_FAIL,
    body: data,
    dispatch,
  });
};
export const updateStatus = (data) => (dispatch) => {
  dispatch({ type: types.UPDATE_STATUS_REQUEST });
  post({
    url: urls.UPDATE_STATUS_API,
    success: types.UPDATE_STATUS_SUCCESS,
    failure: types.UPDATE_STATUS_FAIL,
    body: data,
    dispatch,
  });
};
export const handleInitialData = () => async (dispatch) => {
  dispatch(addSignUpDetails(), addLoginDetails(), getClientSecret(), addPaymentDetails(), updateStatus());
};