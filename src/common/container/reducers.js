import { getLoginDataReducer, getPasswordDataReducer, getSignUpDataReducer } from './Login/reducer'
import {errorReducer, successReducer} from './Toaster/reducer'

export const common = {
  login: getLoginDataReducer,
  passwordData: getPasswordDataReducer,
  signupData:getSignUpDataReducer,
  error: errorReducer,
  success: successReducer
}