import {
  ERROR,
  SUCCESS,
  GET_LOGIN_DATA_SUCCESS,
  GET_SIGNUP_DATA_SUCCESS,
  GET_RESETPASSWORD_DATA_SUCCESS,
  ERROR_CANCEL,
  SUCCESS_CANCEL,
  
} from '../constants'
import {LOGOUT_SUCCESS} from '../../../app/container/constants'



const STATE = {
  message: '',
  type:''
}

export function errorReducer (state = STATE, action) {
  switch (action.type) {
    case ERROR_CANCEL:

      return STATE;
    case ERROR:
      let error = {}

      if (action.payload.status === 400) {
        localStorage.clear();
        error = {
          type: 'Bad Request',
          message:  action.payload.xhr.response.message  || "Not Authorized" ,
          loggedOut: true
        }
      }
      else if(action.payload.status === 500){
        error = {
          type: 'Internal Server Error',
          message:   "Internal Server Error" ,
          loggedOut: false
        }
      }else {
        error = {
          type: 'Other',
          message: action.payload.message ||  "Api Error",
          loggedOut: false
        }
      }
    return error

   default:

   return state
  }
}

const INITIAL = {
  message: '',
  type: ''
}

export function successReducer (state = INITIAL, action) {
  switch (action.type) {
   case SUCCESS_CANCEL:
      return INITIAL;

   case GET_LOGIN_DATA_SUCCESS:
      return {
        message: "User LoggedIn Successfully" ,
        type: 'login'
      }
   
    case GET_SIGNUP_DATA_SUCCESS:
      return {
        message: "User Created Successfully",
        type: 'signup'
      }

    case GET_RESETPASSWORD_DATA_SUCCESS :
      return {
        message: action.payload.message ||  "Password Reset Successfully" ,
        type: 'resetPassword'
      };
    case LOGOUT_SUCCESS :
      return {
        message: "User loggedOut Successfully" ,
        type: 'logout'
      };


    default:
      return state
  }
}