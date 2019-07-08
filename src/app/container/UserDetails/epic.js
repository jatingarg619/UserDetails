import { ofType } from 'redux-observable';
import { mergeMap,map, catchError } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax';
import {of} from 'rxjs'
import { parse } from 'query-string'

import {
  GET_USER_DATA,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAILURE,
  ERROR,
  URL
} from '../constants'



const getUserDataSuccess = payload => ({ type: GET_USER_DATA_SUCCESS, payload })



export const getUserDataEpic = action$ => action$.pipe(
  ofType(GET_USER_DATA),
  mergeMap(action => ajax.getJSON(`https://in.bookmyshow.com/serv/getData?cmd=GETTRAILERS&mtype=cs`, {Authorization: `${JSON.parse(localStorage.getItem('authToken'))}` }).pipe(
    map(response => getUserDataSuccess(response)),
    catchError(error => of({
      type: GET_USER_DATA_FAILURE,
      payload: [],
      error: true
    },
     {type: ERROR, payload: error}))
  ))
);