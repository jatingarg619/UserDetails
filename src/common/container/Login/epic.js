import { ofType } from 'redux-observable';
import { mergeMap,map, catchError } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax';
import {of} from 'rxjs'

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
  ERROR,
  URL
} from '../../../app/container/constants'



const getLoginDataSuccess = payload => ({ type: GET_LOGIN_DATA_SUCCESS, payload })



export const getLoginDataEpic = action$ => action$.pipe(
  ofType(GET_LOGIN_DATA),
  mergeMap(action => ajax.post(`${URL}/api/v2/people/authenticate`, action.payload).pipe(
    map(response => getLoginDataSuccess(response)),
    catchError(error => of({
      type: GET_LOGIN_DATA_FAILURE,
      payload: [],
      error: true
    },
     {type: ERROR, payload: error}))
  ))
);  



const getSignUpDataSuccess = payload => ({ type: GET_SIGNUP_DATA_SUCCESS, payload })



export const getSignUpDataEpic = action$ => action$.pipe(
  ofType(GET_SIGNUP_DATA),
  mergeMap(action => ajax.post(`${URL}/api/v2/people/create`, action.payload).pipe(
    map(response => getSignUpDataSuccess(response)),
    catchError(error => of({
      type: GET_SIGNUP_DATA_FAILURE,
      payload: [],
      error: true
    },
     {type: ERROR, payload: error}))
  ))
);  


const getResetPasswordDataSuccess = payload => ({ type: GET_RESETPASSWORD_DATA_SUCCESS, payload })



export const getResetPasswordDataEpic = action$ => action$.pipe(
  ofType(GET_RESETPASSWORD_DATA),
  mergeMap(action => ajax.post(`${URL}/api/v2/people/reset_password`, action.payload).pipe(
    map(response => getResetPasswordDataSuccess(response)),
    catchError(error => of({
      type: GET_RESETPASSWORD_DATA_FAILURE,
      payload: [],
      error: true
    },
     {type: ERROR, payload: error}))
  ))
);  



const getPasswordDataSuccess = payload => ({ type: GET_PASSWORD_DATA_SUCCESS, payload })



export const getPasswordDataEpic = action$ => action$.pipe(
  ofType(GET_PASSWORD_DATA),
  mergeMap(action => ajax.getJSON(`${URL}/api/v2/people/password_requirements`).pipe(
    map(response => getPasswordDataSuccess(response)),
    catchError(error => of({
      type: GET_PASSWORD_DATA_FAILURE,
      payload: [],
      error: true
    },
     {type: ERROR, payload: error}))
  ))
); 




