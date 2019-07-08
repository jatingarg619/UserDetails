import {
  GET_LOGIN_DATA,
  GET_LOGIN_DATA_SUCCESS,
  GET_LOGIN_DATA_FAILURE,
  GET_PASSWORD_DATA,
  GET_PASSWORD_DATA_SUCCESS,
  GET_PASSWORD_DATA_FAILURE,
  GET_SIGNUP_DATA,
  GET_SIGNUP_DATA_SUCCESS,
  GET_SIGNUP_DATA_FAILURE,
  GET_RESETPASSWORD_DATA,
  GET_RESETPASSWORD_DATA_SUCCESS,
  GET_RESETPASSWORD_DATA_FAILURE,
} from '../constants'

import { stringify } from 'query-string'



const INITIAL_STATE = {
  data: [],
  loading: false,
  error: false
}

export function getLoginDataReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_LOGIN_DATA:
      return {
        ...state,
        loading: true,
        data: [],
        error: false
      }
    case GET_LOGIN_DATA_SUCCESS:
       localStorage.setItem("authToken", JSON.stringify(action.payload.response.authentication_token));
       localStorage.setItem("key", JSON.stringify(action.payload.response.person['key']));
      return {
        ...state,
        data: action.payload.response,
        error: false,
        loading: false
      }
    case GET_LOGIN_DATA_FAILURE:
      return {
        ...state,
        error: true,
        data: [],
        loading: false
      }
    default:
      return state
  }
}




export function getSignUpDataReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_SIGNUP_DATA:
      return {
        ...state,
        loading: true,
        data: [],
        error: false
      }
    case GET_SIGNUP_DATA_SUCCESS:
       localStorage.setItem("authToken", JSON.stringify(action.payload.response.authentication_token));
       localStorage.setItem("key", JSON.stringify(action.payload.response.person['key']));
      return {
        ...state,
        data: action.payload.response,
        error: false,
        loading: false
      }
    case GET_SIGNUP_DATA_FAILURE:
      return {
        ...state,
        error: true,
        data: [],
        loading: false
      }
    default:
      return state
  }
}




export function getPasswordDataReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_PASSWORD_DATA:
      return {
        ...state,
        loading: true,
        data: [],
        error: false
      }
    case GET_PASSWORD_DATA_SUCCESS:
   
      return {
        ...state,
        data: action.payload,
        error: false,
        loading: false
      }
    case GET_PASSWORD_DATA_FAILURE:
      return {
        ...state,
        error: true,
        data: [],
        loading: false
      }
    default:
      return state
  }
}