import * as types from '../Actions/ActionTypes';

import initialState from './InitialState';

const getUserDetails = (state = initialState.userDetails, action) => {
  switch (action.type) {
    case types.SIGNUP_DETAILS_REQUEST:
      return { ...state, loading: true };
    case types.SIGNUP_DETAILS_SUCCESS:
      return { ...state, data: action.data, success: true, loading: false };
    case types.SIGNUP_DETAILS_FAIL:
      return { ...state, error: true, success: false, loading: false };
    case types.LOGIN_DETAILS_REQUEST:
      return { ...state, loading: true };
    case types.LOGIN_DETAILS_SUCCESS:
      return { ...state, loginData: action.data, success: true, loading: false };
    case types.LOGIN_DETAILS_FAIL:
      return { ...state, error: true, success: false, loading: false };
    case types.CLIENT_SECRET_REQUEST:
      return { ...state, loading: true };
    case types.CLIENT_SECRET_SUCCESS:
      return { ...state, secret: action.data, success: true, loading: false };
    case types.CLIENT_SECRET_FAIL:
      return { ...state, error: true, success: false, loading: false };
    case types.PAYMENT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case types.PAYMENT_DETAILS_SUCCESS:
      return { ...state, paymentDetails: action.data, success: true, loading: false };
    case types.PAYMENT_DETAILS_FAIL:
      return { ...state, error: true, success: false, loading: false };
    case types.UPDATE_STATUS_REQUEST:
      return { ...state, loading: true };
    case types.UPDATE_STATUS_SUCCESS:
      return { ...state, updateStatus: action.data, success: true, loading: false };
    case types.UPDATE_STATUS_FAIL:
      return { ...state, error: true, success: false, loading: false };
    default:
      return state;
  }
};

export default getUserDetails;
